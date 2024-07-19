import FS from "@isomorphic-git/lightning-fs";

const { promises: fs } = new FS("__galaxy__");

export default fs;


