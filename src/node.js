/**
 * Node class as an unit of a binary tree. (STEP 1)
 */
module.exports = class Node {
	constructor(data = null, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
};
