// Define possible operations
const ops = [
  input => Math.round(input),
  input => Math.floor(input),
  input => Math.ceil(input),
  input => input + 1,
  input => input * 52,
  input => input / 4,
  input => input * 2,
  input => (input + 52) % 52,
  input => Math.round((input / (52 / 12)) * 2) + 1,
  input => Math.ceil((input / 52) * 24)
];

// What goes in
const inputs = [2, 4, 6, 8];
// What needs to come out
const targets = [5, 9, 13, 17];
// Max number of operations in the chain
const maxOps = 10;
// How many times to try to find a solution
let attempts = 100000;

// Returns a random op from the list
const randOp = () => {
  return ops[Math.floor(Math.random() * ops.length)]
};

const successes = [];

while (attempts--) {
  const outputs = [];
  // Create a random chain of operations
  let rounds = Math.floor(Math.random() * (maxOps - 1)) + 1;
  let chain = [];
  while (rounds--) {
    chain.push(randOp());
  }

  // Run those operations for each input
  inputs.forEach(input => {
    outputs.push(chain.reduce((previousResult, op) => op(previousResult), input));
  });

  // Save the chain of ops if it produces the right output
  if (targets.toString() === outputs.toString()) {
    successes.push(chain);
    //console.log(candidates.map(op => op.toString()));
  }
}

if (successes.length === 0) {
  console.log('No successful chains were found.');
} else {
  // Sort longest-to-shortest number of ops involved
  successes.sort((a, b) => {
    return a.length === b.length ? 0 : b.length - a.length;
  });

  // Output all successful op-chains, longest to shortest
  successes.forEach(chain => {
    console.log(chain.map(op => op.toString()));
  });
}