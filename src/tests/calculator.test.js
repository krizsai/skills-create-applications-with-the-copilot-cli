const { calculate, modulo, power, squareRoot } = require('../calculator');

describe('Calculator - basic operations', () => {
  test('addition with keyword', () => {
    expect(calculate('add', 2, 3)).toBe(5);
  });

  test('addition with symbol', () => {
    expect(calculate('+', 10, 5)).toBe(15);
  });

  test('subtraction with keyword', () => {
    expect(calculate('sub', 10, 4)).toBe(6);
  });

  test('subtraction with symbol', () => {
    expect(calculate('-', 5, 3)).toBe(2);
  });

  test('multiplication with keyword', () => {
    expect(calculate('mul', 45, 2)).toBe(90);
  });

  test('multiplication with symbol', () => {
    expect(calculate('*', 7, 6)).toBe(42);
  });

  test('division with keyword', () => {
    expect(calculate('div', 20, 5)).toBe(4);
  });

  test('division with symbol', () => {
    expect(calculate('/', 9, 3)).toBe(3);
  });

  test('division by zero throws', () => {
    expect(() => calculate('div', 1, 0)).toThrow(/Division by zero/);
    expect(() => calculate('/', 1, 0)).toThrow(/Division by zero/);
  });

  test('works with negative numbers and floats', () => {
    expect(calculate('add', -1, 1)).toBe(0);
    expect(calculate('mul', 2.5, 4)).toBeCloseTo(10);
  });
});

describe('Calculator - extended operations', () => {
  test('modulo with keyword and symbol', () => {
    expect(modulo(10, 3)).toBe(1);
    expect(calculate('mod', 5, 2)).toBe(1);
    expect(calculate('%', 5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => calculate('mod', 1, 0)).toThrow(/Modulo by zero/);
    expect(() => calculate('%', 1, 0)).toThrow(/Modulo by zero/);
  });

  test('power function and operators', () => {
    expect(power(2, 8)).toBe(256);
    expect(calculate('pow', 2, 8)).toBe(256);
    expect(calculate('^', 2, 8)).toBe(256);
    expect(calculate('**', 2, 8)).toBe(256);
  });

  test('square root and error for negative', () => {
    expect(squareRoot(16)).toBe(4);
    expect(calculate('sqrt', 16)).toBe(4);
    expect(() => squareRoot(-4)).toThrow(/Cannot compute square root of negative number/);
    expect(() => calculate('sqrt', -4)).toThrow(/Cannot compute square root of negative number/);
  });
});
