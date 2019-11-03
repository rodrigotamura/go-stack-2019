function sum(a, b) {
  return a + b;
}

test('if I call sum() function with 4 and 5 it should return 9', () => {
  const result = sum(4, 5);

  expect(result).toBe(9); // testing if expected result will be 9
});
