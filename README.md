# code-shuffler
[Genetic programming](https://en.wikipedia.org/wiki/Genetic_programming) diluted. Takes an array of inputs and finds which combination of operations is needed to produce the desired outputs.

## Example

If all we know is a bunch of radiuses of circles:

`const inputs = [10, 15, 200, 17, 9, 301];`

and the areas of those circles:

`const targets = [314, 707, 125664, 908, 254, 284631];`

This program can find the formula for us.

Output:

```
[
  'input => Math.pow(input, 2)',
  'input => Math.PI * input',
  'input => Math.round(input)'
]
```

Typically you'll want the shortest successful chain, but it does output all successful chains just in case. These usually contain no-ops, or operations that cancel each other out. Example:

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

It just takes a list of basic operations, like `return input + 1`, `return PI * input`, etc, and creates thousands of random-length chains of those operations, chosen randomly.
Then, we simply run the chain on each input, and when we find a chain that produces the correct output for all inputs, we record it.
Finally, we output the successful chains from longest to shortest.

## When it's useful

If you have a situation where you know your function needs to return 5 when given 2, and 13 when given 6, but you don't know how to get there, this program can be used to suggest that the pattern might be `return input * 2 + 1`.

## Hints

If you're not getting any successes, try expanding the list of operations, e.g. adding `input => input * 3`, or 'best-guesses' relating to your domain, e.g. `input => input * Math.PI` if you think that operation might be involved in the answer somehow.

## Future Work

* I'd like it to be able to accept multiple arguments more easily, and update it to be able to learn the pythagorean theorem.
* I'd like to turn it into a real genetic programming example, instead of just brute force.
* There's a tonne of optimisations to the basic brute forcer, for instead de-duping successes, returning early when one of the inputs doesn't match the target.
* Would like it to take inputs and targets from the commandline. Maybe read ops from a file.
* I'd like it to be able to say "OK, I didn't find exactly what you wanted but here's the *closest* I got". Then I can update the example to remove PI completely and it should be able to find out that multiplying by 3 gets us close to the right formula.