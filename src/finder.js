
const findFormulas = (inputs, outputs, ops, maxOps, attempts) => {

  // Returns a random op from the list
  randOp = () => {
    return ops[Math.floor(Math.random() * ops.length)]
  };

  const successes = [];

  while (attempts--) {
    const candidates = [];
    // Create a random chain of operations
    let rounds = Math.floor(Math.random() * (maxOps - 1)) + 1;
    let chain = [];
    while (rounds--) {
      chain.push(randOp());
    }

    // Run those operations for each input
    inputs.forEach(input => {
      candidates.push(chain.reduce((previousResult, op) => op(previousResult), input));
    });

    // Save the chain of ops if it produces the right output
    if (outputs.toString() === candidates.toString()) {
      successes.push(chain);
      //console.log(candidates.map(op => op.toString()));
    }
  }

  // Sort longest-to-shortest number of ops involved
  successes.sort((a, b) => {
    return a.length === b.length ? 0 : b.length - a.length;
  });

  // Convert functions to strings
  return successes.map(chain => chain.map(op => op.toString()));;
};

module.exports = findFormulas;