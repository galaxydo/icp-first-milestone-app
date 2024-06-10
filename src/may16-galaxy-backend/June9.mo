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
	type ImageProperties = Types.ImageProperties;
	type ErrDeleteImage = Types.ErrDeleteImage;
	type Health = Types.Health;

	let ACTOR_NAME : Text = "ImageStorage";
	let VERSION : Nat = 4;

	let { thash } = Map;

	private var images = Map.new<Image_ID, Image>(thash);

	stable var images_stable_storage : [(Image_ID, Image)] = [];

	public shared ({ caller }) func upload_image(content : Blob, image_properties : ImageProperties) : async Image_ID {
		let checksum = Nat32.toNat(ofBlob(content));
		let image_id = Utils.generate_uuid();
		let canister_id = Principal.toText(Principal.fromActor(this));

		let image : Image = {
			checksum = checksum;
			content = content;
			created = Time.now();
			filename = image_properties.filename;
			id = image_id;
			owner = caller;
			canister_id = canister_id;
		};

		ignore Map.put(images, thash, image_id, image);

		return image_id;
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

	// ------------------------- System Methods -------------------------
	system func preupgrade() {
		images_stable_storage := Iter.toArray(Map.entries(images));
	};

	system func postupgrade() {
		images := Map.fromIter<Image_ID, Image>(images_stable_storage.vals(), thash);
		images_stable_storage := [];
	};
};

