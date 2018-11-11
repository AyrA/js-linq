# js-linq

This provides Linq like expressions for JavaScript

## Usage Example

	var Test = Array
		.Range(1, 9, 1)
		.Concat(Array.Range(20, 20, -1))
		.Where(m => m % 2 === 0)
		.OrderBy(m => m)
		.Distinct()
		.SequenceEquals(Array.Range(2, 10, 2));

After that, `Test` should be `true`.

Steps:

1. Generate an array with ascending numbers 1-9
2. Concatenate to array with descending numbers 20-1
3. Keep only even numbers
4. Order by the numbers in ascending order
5. Remove duplicates
6. Check if equal to an ascending sequence of 10 even numbers, starting at 2

## Implemented Linq Functions

Below is the list and explanation of all functions.
Some functions merely map to existing JS functions but are present for consistency.

### `Array.Range(start, count, step)`

Generate a sequence of numbers.

### `Array.toArray(seq)`

Converts the given sequence to a native JavaScript Array

### `Array.prototype.Max(exp)`

Returns the biggest entry.
Expression defaults to `m => m`.

### `Array.prototype.Min(exp)`

Returns the smallest entry.
Expression defaults to `m => m`.

### `Array.prototype.Last(exp)`

Returns the last element that matches an expression.
Throws if no matches.
Expression defaults to `m => true`.

### `Array.prototype.LastOrDefault(exp, def)`

Returns the last element that matches an expression.
Returns `def` if no matches.
Default defaults to `undefined`.
Expression defaults to `m => true`.

### `Array.prototype.Single(exp)`

Returns the single element that matches an expression.
Throws if no match or more than one match.
Expression defaults to `m => true`.

### `Array.prototype.SingleOrDefault(exp, def)`

Returns the single element that matches an expression.
Returns `def` if no matches.
Default defaults to `undefined`.
Throws if more than one match.
Expression defaults to `m => true`.

### `Array.prototype.First(exp)`

Returns the first element that matches an expression.
Throws if no match.
Expression defaults to `m => true`.

### `Array.prototype.FirstOrDefault(exp, def)`

Returns the first element that matches an expression.
Returns `def` if no matches.
Default defaults to `undefined`.
Expression defaults to `m => true`.

### `Array.prototype.OrderByDescending(exp)`

Sorts the given array in descending order.
Expression must return a numerical value.
Expression defaults to `m => true`.

### `Array.prototype.OrderBy(exp)`

Sorts the given array in ascending order.
Expression must return a numerical value.
Expression defaults to `m => true`.

### `Array.prototype.SequenceEquals(seq)`

Checks if the sequence is identical to the given sequence parameter.

### `Array.prototype.Reverse()`

Reverses the sequence.
Maps to js `Array.prototype.reverse` function.

### `Array.prototype.Skip(count)`

Skips the given number of elements in the sequence.
If count is too large, returns an empty sequence.

### `Array.prototype.Take(count)`

Takes the given number of elements from the beginning of the sequence.
If count is too large, returns all elements.

### `Array.prototype.Where(exp)`

Returns all elements that match a given expression.
Maps to js `Array.prototype.filter` function.

### `Array.prototype.Select(exp)`

Returns the result of the expression for all elements.
Maps to js `Array.prototype.map` function.

### `Array.prototype.Concat(seq)`

Concatenates sequences together.
Maps to js `Array.prototype.concat` function.

### `Array.prototype.Distinct(exp)`

Returns all unique elements.
Expression defaults to `m => m`.
