# formula-finder
[Genetic programming](https://en.wikipedia.org/wiki/Genetic_programming) diluted. Takes an array of inputs and finds which combination of operations is needed to produce the desired outputs.

## Example

If all we know is a bunch of radiuses of circles:

`inputs = [10, 15, 200, 17, 9, 301];`

and the areas of those circles:

`targets = [314, 707, 125664, 908, 254, 284631];`

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

## Usage

This is a node module with a commandline interface.

```
yarn install
chmod +x index.js
./index.js -h
```

## How it works

It just takes a list of basic operations, like `return input + 1`, `return PI * input`, etc, and creates thousands of random-length chains of those operations, chosen randomly.

Then, we simply run the chain on each input, and when we find a chain that produces the correct output for all inputs, we record it.

Finally, we output the successful chains from longest to shortest.

## When it's useful

If you have a situation where you know your function needs to return 5 when given 2, and 13 when given 6, but you don't know how to get there, this program can be used to suggest that the pattern might be `return input * 2 + 1`.

## More examples to play with

See if you can spot the pattern as quickly as this code can (I couldn't).

`./index.js -i "[1, 2, 3, 4, 5]" -o "[6, 10, 14, 18, 22]"`

`./index.js -i "[1, 2, 3, 4, 5]" -o "[2, 16, 54, 128, 250]"`

`./index.js -i "[1, 2, 3, 4, 5]" -o "[4, 32, 108, 256, 500]"`

## Hints

Before running, make sure the list of operations includes your best guesses as to what might be involved in the answer, e.g. adding `input => input * 3`, or `input => input * Math.PI`. If you have absolutely no idea, throw as many basic operations as you can think of into the mix and cross your fingers.

If it doesn't find anything at first, try just running it again (or increasing `attempts`; same effect). It is based on randomness and if it's a tricky problem it might require a few runs through to hit upon an answer.

Tweaking the `maxOps` variable might also help, but if the formula needs to contain more than 10 operations, you might need some actual genetic programming to reach the answer, as the likelihood of finding it by chance becomes slimmer the more ops you add - this is mitigated by increasing `attempts`, at the cost of speed.

## Caveats

It's really mechanical and has no idea if what it's telling you is reasonable or not. If you try it with inputs `[1,2,3,4,5]` and outputs `[10,20,30,40,50]` it will happily tell you that the formula is `Math.ceil(Math.PI * Math.PI * input)`... which does actually work up to 8! If you supply more sample inputs and outputs that will mitigate against this sort of false positive.

In the above 'times ten' example, it's actually impossible to find the formula as shipped, because there is no `input *= 10` rule shipped by default. It can't invent new operations (yet). If you're not having any success, try expanding the list of operations, though you'll probably need to similarly increase `attempts`.


## Future Work

* I'd like there to be an option to run through all possible combinations of `operations` instead of picking random chains.
* I'd like it to be able to accept inputs with multiple arguments more easily, and update it to be able to learn the pythagorean theorem.
* I'd like to turn it into a real genetic programming example, instead of just brute force.
* There's a tonne of optimisations to the basic brute forcer, for instance de-duping successes, or returning early when one of the inputs doesn't match the target.
* I'd like it to be able to say "OK, I didn't find exactly what you wanted but here's the *closest* I got". Then I can update the example to remove PI completely and it should be able to find out that multiplying by 3 gets us close to the right formula.
* Condense output code so that it can output a one-liner instead of the array of ops.
