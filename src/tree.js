/* eslint-disable no-param-reassign */
const Node = require("./node");

// MOTTO: Recursion, who?

/**
 * Tree class as the body of a tree. (STEP 2)
 */
module.exports = class Tree {
	constructor(array) {
		this.root = this.buildTree(array);
	}

	/**
	 * buildTree() - method to make a balanced binary tree. (STEP 3)
	 * @param {Array} array Array of input to make a binary tree of
	 * @returns A binary tree
	 */
	// eslint-disable-next-line class-methods-use-this
	buildTree(array) {
		const treeify = arr => {
			if (arr.length <= 0) throw new Error("Invalid Array length.");

			const startMid = Math.floor(arr.length / 2);
			const rootNode = new Node(arr[startMid]);
			const queue = [[startMid, 0, arr.length - 1, rootNode]];

			while (queue.length > 0) {
				const [mid, lowerBound, upperBound, node] = queue.pop();
				const leftUpperBound = mid - 1;
				const rightLowerBound = mid + 1;

				const leftSize = leftUpperBound - lowerBound;
				const rightSize = upperBound - rightLowerBound;

				if (leftSize === 0) {
					node.left = new Node(arr[leftUpperBound]);
				} else if (leftSize > 0) {
					const newMid =
						(leftSize % 2) +
						Math.floor((leftUpperBound + lowerBound) / 2);
					node.left = new Node(arr[newMid]);
					queue.push([newMid, lowerBound, leftUpperBound, node.left]);
				}

				if (rightSize === 0) {
					node.right = new Node(arr[rightLowerBound]);
				} else if (rightSize > 0) {
					const newMid =
						(rightSize % 2) +
						Math.floor((rightLowerBound + upperBound) / 2);
					node.right = new Node(arr[newMid]);
					queue.push([
						newMid,
						rightLowerBound,
						upperBound,
						node.right,
					]);
				}
			}

			return rootNode;
		};

		return treeify([
			...new Set(
				array
					.map(ele => +ele)
					.filter(
						ele =>
							typeof ele === "number" ||
							ele !== Infinity ||
							!Number.isNaN(ele)
					)
					.sort((a, b) => a - b)
			),
		]);
	}

	/**
	 * insert() - method to insert a value into a binary tree. (STEP 4)
	 * @param {number} value A number for insert from a binary tree
	 */
	insert(value) {
		const newNode = new Node(value);
		if (this.root === null) {
			this.root = newNode;
		} else {
			let base = this.root;
			while (base !== null) {
				if (base.data > value) {
					if (base.left === null) {
						base.left = newNode;
						return;
					}
					base = base.left;
				} else {
					if (base.right === null) {
						base.right = newNode;
						return;
					}
					base = base.right;
				}
			}
		}
	}

	/**
	 * delete() - method to remove a value from a binary tree. (STEP 4)
	 * @param {number} value A number for removal from a binary tree
	 */
	delete(value) {
		if (this.root === null) throw new Error("This Binary tree is empty!");
		if (this.root.left === null && this.root.right === null) {
			if (!(this.root.data === value)) {
				throw new Error("No element with such a value was found!");
			}
			this.root = null;
			return;
		}

		let parent = null;
		let node = this.root;

		while (node !== null && node.data !== value) {
			parent = node;
			node = node.data > value ? node.left : node.right;
		}
		if (node === null)
			throw new Error("No element with such a value was found!");

		if (node.left === null && node.right === null) {
			if (node === parent.left) {
				parent.left = null;
			} else {
				parent.right = null;
			}
		}

		if (node.left === null || node.right === null) {
			if (parent === null) {
				this.root = this.root.left || this.root.right;
				return;
			}

			if (node === parent.left) {
				parent.left = node.left || node.right;
			} else {
				parent.right = node.left || node.right;
			}
		}

		if (node.left && node.right) {
			let parentOfSuc = node;
			let suc = node.right;

			while (suc.left !== null) {
				parentOfSuc = suc;
				suc = suc.left;
			}

			if (suc === parentOfSuc.left) {
				parentOfSuc.left = suc.right;
			} else {
				parentOfSuc.right = suc.right;
			}

			node.data = suc.data;
		}
	}

	/**
	 * find() - method to find the node of any value. (STEP 5)
	 * @param {number} value A value to be found in the tree, and it's node returned.
	 * @returns
	 */
	find(value) {
		if (this.root === null) throw new Error("This Binary tree is empty!");

		let base = this.root;
		while (base !== null && base.data !== value) {
			base = value < base.data ? base.left : base.right;
		}
		return base;
	}

	/**
	 * levelOrder() - method to traverse the Binary tree. BFS, iterative. (STEP 6)
	 * @param {function} operate Callback called upon all the elements
	 */
	levelOrder(operate) {
		if (this.root === null) throw new Error("This Binary tree is empty!");

		const queue = [this.root];
		while (queue.length > 0) {
			const node = queue.shift();
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
			operate(node);
		}
	}

	/**
	 * inOrder() - method for inOrder traversal. (STEP 7)
	 * @param {Function} operate Callback based on the elements.
	 * @returns {Array} array Array for the inOrder traversal result, when no function is given
	 */
	// eslint-disable-next-line consistent-return
	inorder(operate) {
		const result = [];
		if (this.root === null) throw new Error("This Binary tree is empty!");

		const queue = [];
		let base = this.root;

		while (base !== null || queue.length > 0) {
			if (base !== null) {
				queue.push(base);
				base = base.left;
			} else {
				base = queue.pop();

				if (operate) operate(base);
				result.push(base.data);

				base = base.right;
			}
		}

		if (!operate) return result;
	}

	/**
	 * preOrder() - method for preOrder traversal. (STEP 7)
	 * @param {Function} operate Callback based on the elements.
	 * @returns {Array} array Array for the preOrder traversal result, when no function is given
	 */
	// eslint-disable-next-line consistent-return
	preOrder(operate) {
		const result = [];
		if (this.root === null) throw new Error("This Binary tree is empty!");

		const queue = [this.root];
		while (queue.length > 0) {
			const base = queue.pop();

			if (operate) operate(base);
			result.push(base.data);

			if (base.left) {
				queue.push(base.left);
			}
			if (base.right) {
				queue.push(base.right);
			}
		}

		if (!operate) return result;
	}

	/**
	 * postOrder() - method for postOrder traversal. (STEP 7)
	 * @param {Function} operate Callback based on the elements.
	 * @returns {Array} array Array for the postOrder traversal result, when no function is given
	 */
	// eslint-disable-next-line consistent-return
	postOrder(operate) {
		const result = [];
		if (this.root === null) throw new Error("This Binary tree is empty!");

		const queue = [this.root];
		while (queue.length > 0) {
			const base = queue.pop();

			if (base.left) {
				queue.push(base.left);
			}
			if (base.right) {
				queue.push(base.right);
			}

			if (operate) operate(base);
			result.unshift(base.data);
		}

		if (!operate) return result;
	}

	/**
	 * height() - method to get the height of a node in a binary tree
	 * @param {Node} node Node whose height is to be searched
	 * @returns Height of a node in a tree
	 */
	height(node) {
		if (this.root === null) return -1;
		const findNode = this.find(node);
		return this.wholeHeight(findNode) - 1;
	}

	// Helper function to find the height of any tree.
	// eslint-disable-next-line class-methods-use-this
	wholeHeight(node) {
		if (node === null) return 0;
		const queue = [node];
		let h = 0;
		for (;;) {
			let level = queue.length;
			if (level === 0) return h;
			h++;

			while (level > 0) {
				const newNode = queue.shift();
				if (newNode.left !== null) queue.push(newNode.left);
				if (newNode.right !== null) queue.push(newNode.right);
				level--;
			}
		}
	}

	/**
	 * depth() - method for finding the depth of a node. (STEP 9)
	 * @param {Node} node The input node to whose depth is to be found
	 * @returns Returns the depth of the node if found, else returns -1
	 */
	depth(node) {
		if (this.root === null) return -1;

		let base = this.root;
		let depth = 0;
		while (base !== node || base === null) {
			base = node.data < base.data ? base.left : base.right;
			depth++;
		}
		return base === node ? depth : -1;
	}

	/**
	 * isBalanced() - Checks if the tree is Balanced or not. (STEP 10)
	 * @returns Whether or not the binary tree is balanced
	 */
	isBalanced() {
		if (this.root === null) return true;

		const array = new Array(this.inorder().length);
		let i = 0;
		this.levelOrder(node => {
			const lsub = this.wholeHeight(node.left);
			const rsub = this.wholeHeight(node.right);
			array[i] = Math.abs(lsub - rsub) <= 1;
			i++;
		});
		return array.reduce((p, n) => p && n);
	}

	/**
	 * reBalance() - Sets the binary tree to ba balanced again. (STEP 11)
	 * @returns Sets the unbalanced binary tree to be balanced again.
	 */
	reBalance() {
		if (this.root === null) return;
		const arr = [...new Set(this.inorder().sort((a, b) => a - b))];
		this.root = this.buildTree(arr);
	}
};
