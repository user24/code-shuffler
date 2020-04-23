#!/usr/bin/env node

const findFormulas = require('./src/finder.js');
const ops = require('./src/operations.js');

// Get cmdline params
const program = require('commander');
program.storeOptionsAsProperties(false);
program.requiredOption('-i, --inputs <array>', 'Inputs as a JSON array. Try -i "[10, 15, 200, 17, 9, 301]"');
program.requiredOption('-o, --outputs <array>', 'Outputs as a JSON array. Try -o "[314, 707, 125664, 908, 254, 284631]"');
program.option('-m --maxOps <number>', 'Max number of operations in a chain', 10);
program.option('-a, --attempts <number>', 'Number of chains to attempt', 100000);
program.parse(process.argv);
const options = program.opts();

const inputs = JSON.parse(options.inputs);
const outputs = JSON.parse(options.outputs);

const formulas = findFormulas(inputs, outputs, ops, options.maxOps, options.attempts);

if (!formulas.length) {
  console.log('No formulas found, try running it again, or follow the hints in the readme');
} else {
  // Output all the formulas
  const plural = n => n > 1 ? 's' : '';
  console.log(`Found ${formulas.length} Formula${plural(formulas.length)}`);

  // using this rather than console.log(formulas) so it doesn't cut off due to size
  formulas.forEach(f => console.log(f));

  if (formulas.length > 1) {
    console.log("Shortest Formula:", formulas[formulas.length - 1]);
  }
}