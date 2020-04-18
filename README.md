# code-shuffler
[Genetic programming](https://en.wikipedia.org/wiki/Genetic_programming) diluted. Takes an array of inputs and finds which combination of operations is needed to produce the desired outputs.

## Example

If we give it a bunch of circle radius measurements as inputs:

`const inputs = [10, 15, 200, 17, 9, 301];`

and tell it the corresponding areas, rounded to the nearest integer:

`const targets = [314, 707, 125664, 908, 254, 284631];`

It will be able to tell us what the relation between input and output is, so long as we ensure the basic operations are somewhere in the list of possibles;

```
const ops = [
  input => input ^ 2,
  input => Math.pow(input, 2),
  input => input * 12,
  input => input / 2,
  input => Math.PI * input,
  input => input * 2,
  input => input + input,
  input => input * input,
  input => Math.PI + input,
  input => Math.round(input),
  input => Math.floor(input),
  input => Math.ceil(input),
  input => input / Math.PI,
];
```

Output:

```
[
  'input => Math.pow(input, 2)',
  'input => Math.PI * input',
  'input => Math.round(input)'
]
```

Typically you'll want the shortest successful chain, but it does outputs all successful chains just in case. These usually contain no-ops, or operations that cancel each other out, such as this:

```
[
  'input => Math.round(input)',
  'input => Math.pow(input, 2)',
  'input => Math.ceil(input)',
  'input => input * 2',
  'input => Math.PI * input',
  'input => input / 2',
  'input => Math.round(input)'
]
```

## How it works

It just takes a list of basic operations, like `return input + 1`, `return input * 2`, etc, and creates thousands of random-length chains of those operations, chosen randomly.
Then, we simply run the chain on each input, and when we find a chain that produces the correct output for all inputs, we record it.
Finally, we output the successful chains from longest to shortest.

## When it's useful

If you have a situation where you know your function needs to return 5 when given 2, and 13 when given 6, but you don't know how to get there, this program can be used to suggest that the pattern might be `return input * 2 + 1`.

## Hints

If you're not getting any successes, try expanding the list of operations, e.g. adding `input => input * 3`, or 'best-guesses' relating to your domain, e.g. `input => input * Math.PI` if you think that operation might be involved in the answer somehow.

## Future Work

* I'd like it to be able to accept multiple arguments more easily, and update it to be able to learn the pythagorean theorem.
* I'd like to turn it into a real genetic programming example, instead of just brute force.
* There's a tonne of optimisations to the basic brute forcer, for instead de-duping successes.