import Blob "mo:base/Blob";
import { Buffer; toArray } "mo:base/Buffer";
import Error "mo:base/Error";
import Float "mo:base/Float";
import Iter "mo:base/Iter";
import Map "mo:hashmap/Map";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Option "mo:base/Option";
import Order "mo:base/Order";
import Prim "mo:prim";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Timer "mo:base/Timer";

import { ofBlob } "./CRC32";

import Types "./types";

import Utils "./utils";

actor class ImageStorage(is_prod : Bool) = this {
	type Image = Types.Image;
	type Image_ID = Types.Image_ID;
	type ImageChunk = Types.ImageChunk;
	type ImageProperties = Types.ImageProperties;
	type Chunk_ID = Types.Chunk_ID;
	type ChunkInfo = Types.ChunkInfo;
	type ErrCommitBatch = Types.ErrCommitBatch;
	type ErrDeleteImage = Types.ErrDeleteImage;
	type Health = Types.Health;
	type ImageLayout = Types.ImageLayout;

	let ACTOR_NAME : Text = "ImageStorage";
	let VERSION : Nat = 4;
	stable var timer_id : Nat = 0;

	let { nhash; thash } = Map;

	private var images = Map.new<Image_ID, Image>(thash);
	private var chunks = Map.new<Chunk_ID, ImageChunk>(nhash);
    private var layouts = Map.new<Text, Layout>(Text.hash);

	stable var images_stable_storage : [(Image_ID, Image)] = [];
	stable var chunks_stable_storage : [(Chunk_ID, ImageChunk)] = [];

	private var chunk_id_count : Chunk_ID = 0;

	private func clear_expired_chunks() : async () {
		let currentTime = Time.now();
		let fiveMinutes = 5 * 60 * 1000000000; // Convert 5 minutes to nanoseconds

		let filteredChunks = Map.mapFilter<Chunk_ID, ImageChunk, ImageChunk>(
			chunks,
			nhash,
			func(key : Chunk_ID, imageChunk : ImageChunk) : ?ImageChunk {
				let age = currentTime - imageChunk.created;
				if (age <= fiveMinutes) {
					return ?imageChunk;
				} else {
					return null;
				};
			},
		);

		chunks := filteredChunks;
	};

	public shared ({ caller }) func create_chunk(content : Blob, order : Nat) : async Nat {
		chunk_id_count := chunk_id_count + 1;

		let checksum = Nat32.toNat(ofBlob(content));

		let image_chunk : ImageChunk = {
			checksum = checksum;
			content = content;
			created = Time.now();
			filename = "";
			id = chunk_id_count;
			order = order;
			owner = caller;
		};

		ignore Map.put(chunks, nhash, chunk_id_count, image_chunk);

		return chunk_id_count;
	};

    public shared ({ caller }) func commit_batch(
        chunk_ids : [Nat],
        image_properties : AssetProperties,
        image_references : [ImageReference]
    ) : async Result.Result<Text, ErrCommitBatch> {
        let layout_id = Utils.generate_uuid();
        let canister_id = Principal.toText(Principal.fromActor(this));

        // Process each image reference
        for (ref in image_references.vals()) {
            let image_id = ref.image_id;
            var image_content = Buffer<Blob>(0);
            var image_checksum : Nat = 0;
            var content_size = 0;

            // Collect and verify chunks for this image
            for (id in chunk_ids.vals()) {
                switch (Map.get(chunks, nhash, id)) {
                    case (?chunk) {
                        if (chunk.owner != caller) {
                            return #err(#ChunkOwnerInvalid(true));
                        } else {
                            image_content.add(chunk.content);
                            image_checksum := (image_checksum + chunk.checksum) % 400_000_000;
                            content_size := content_size + chunk.content.size();
                        };
                    };
                    case (_) {
                        return #err(#ChunkNotFound(true));
                    };
                };
            };

            // Verify checksum
            if (Nat.notEqual(image_checksum, image_properties.checksum)) {
                return #err(#ChecksumInvalid(true));
            };

            // Create and store the image asset if not already created
            if (Option.isNone(Map.get(images, thash, image_id))) {
                let image : Asset = {
                    canister_id = canister_id;
                    chunks_size = image_content.size();
                    content = Option.make(toArray(image_content));
                    content_encoding = image_properties.content_encoding;
                    content_size = content_size;
                    content_type = image_properties.content_type;
                    created = Time.now();
                    filename = image_properties.filename;
                    id = image_id;
                    owner = Principal.toText(caller);
                    url = Utils.generate_asset_url({
                        asset_id = image_id;
                        canister_id = canister_id;
                        is_prod = is_prod;
                    });
                };

                ignore Map.put(images, thash, image_id, image);
            }
        };

        // Create and store the layout
        let new_layout : Layout = {
            layout_id = layout_id;
            images = image_references;
        };

        ignore Map.put(layouts, Text.hash, layout_id, new_layout);

        return #ok(layout_id);
    };

	public shared ({ caller }) func delete_image(id : Image_ID) : async Result.Result<Text, ErrDeleteImage> {
		switch (Map.get(images, thash, id)) {
			case (?image) {
				if (image.owner == Principal.toText(caller)) {
					Map.delete(images, thash, id);

					return #ok("Deleted Image");
				} else {
					return #err(#NotAuthorized(true));
				};
			};
			case (_) {
				return #err(#ImageNotFound(true));
			};
		};
	};

	public query func get_all_images() : async [Image] {
		var images_list = Buffer<Image>(0);

		for (image in Map.vals(images)) {
			let image_without_content : Image = {
				image with content = null;
			};

			images_list.add(image_without_content);
		};

		return toArray(images_list);
	};

	public query func get(id : Image_ID) : async Result.Result<Image, Text> {
		switch (Map.get(images, thash, id)) {
			case (?image) {
				let image_without_content : Image = {
					image with content = null;
				};

				return #ok(image_without_content);
			};
			case (_) {
				return #err("Image Not Found");
			};
		};
	};

	public query func get_health() : async Health {
		let health : Health = {
			cycles = Utils.get_cycles_balance();
			memory_mb = Utils.get_memory_in_mb();
			heap_mb = Utils.get_heap_in_mb();
			images_size = Map.size(images);
		};

		return health;
	};

	public query func chunks_size() : async Nat {
		return Map.size(chunks);
	};

	public query func is_full() : async Bool {
		let MAX_SIZE_THRESHOLD_MB : Float = 1500;

		let rts_memory_size : Nat = Prim.rts_memory_size();
		let mem_size : Float = Float.fromInt(rts_memory_size);
		let memory_in_megabytes = Float.abs(mem_size * 0.000001);

		if (memory_in_megabytes > MAX_SIZE_THRESHOLD_MB) {
			return true;
		} else {
			return false;
		};
	};

	// ------------------------- System Methods -------------------------
	system func preupgrade() {
		images_stable_storage := Iter.toArray(Map.entries(images));
		chunks_stable_storage := Iter.toArray(Map.entries(chunks));
	};

	system func postupgrade() {
		images := Map.fromIter<Image_ID, Image>(images_stable_storage.vals(), thash);

		ignore Timer.recurringTimer(#seconds(300), clear_expired_chunks);

		images_stable_storage := [];
	};
};

