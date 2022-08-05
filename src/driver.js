const Tree = require("./tree");

/**
 * Randomiser function for testing.
 *  - For the sake of sanity, only integers between
 *      -50 to +50 are taken, and arrays of 5-20 are generated.
 *  - For unbalancing, the rest are pushed above 100.
 * @returns number[]
 */
const randomiser = (num = -50) => {
	const length = Math.floor(Math.random() * 16) + 5;
	return new Array(length).fill(num).map(e => +e + Math.floor(Math.random() * 101));
};

// (1)
const random = randomiser();
console.log("1️⃣ | The initial array is: ", random);
const tree = new Tree(random);

// (2)
console.log("2️⃣ | Is the tree balanced? ", tree.isBalanced());

// (3)
console.log("3️⃣.1️⃣ | In Order Print: ", tree.inorder());
console.log("3️⃣.2️⃣ | Pre Order Print: ", tree.preOrder());
console.log("3️⃣.3️⃣ | Post Order Print: ", tree.postOrder());

// (4)
const unbalancing = randomiser(100);
unbalancing.forEach(e => tree.insert(e));
console.dir(tree, { depth: null });

// (5)
console.log("5️⃣ | Checking for disbalance: ", tree.isBalanced());

// (6)
tree.reBalance();

// (7)
console.log("7️⃣ | Is the tree balanced again? ", tree.isBalanced());

// (8)
console.log("8️⃣.1️⃣ | In Order Print: ", tree.inorder());
console.log("8️⃣.2️⃣ | Pre Order Print: ", tree.preOrder());
console.log("8️⃣.3️⃣ | Post Order Print: ", tree.postOrder());