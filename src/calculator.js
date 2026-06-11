#!/usr/bin/env node

/*
  Calculator CLI

  Supported operations:
  - Addition (add or +)
  - Subtraction (sub or -)
  - Multiplication (mul or *)
  - Division (div or /)
  - Modulo (mod or %)
  - Exponentiation (pow or ** or ^)
  - Square root (sqrt)

  Usage examples:
    node src/calculator.js add 2 3    # => 5
    node src/calculator.js div 8 2    # => 4
    node src/calculator.js + 4 5      # => 9
    node src/calculator.js mod 10 3   # => 1
    node src/calculator.js pow 2 8    # => 256
    node src/calculator.js sqrt 16    # => 4

  Behavior:
  - Accepts numeric operands and an operator keyword or symbol
  - Prints result to stdout and exits with code 0 on success
  - Prints error and exits with non-zero status on invalid input or invalid operations (e.g., division by zero)
*/

// Minimal, dependency-free implementation
function usage() {
  console.error('Usage: node src/calculator.js <op> <num1> <num2>');
  console.error('Operators: add | sub | mul | div | mod | pow | sqrt (also + - * / % ** ^)');
  console.error('Note: sqrt is unary: node src/calculator.js sqrt <num>');
  process.exit(1);
}

function toNumber(s) {
  const n = Number(s);
  if (Number.isNaN(n)) {
    console.error(`Invalid number: ${s}`);
    process.exit(2);
  }
  return n;
}

function modulo(a, b) {
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot compute square root of negative number');
  }
  return Math.sqrt(n);
}

function calculate(op, a, b) {
  switch (op) {
    case 'add': case '+': return a + b;
    case 'sub': case '-': return a - b;
    case 'mul': case '*': return a * b;
    case 'div': case '/':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    case 'mod': case '%':
      if (b === 0) {
        throw new Error('Modulo by zero');
      }
      return modulo(a, b);
    case 'pow': case '**': case '^':
      return power(a, b);
    case 'sqrt':
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.length < 2 || argv.length > 3) usage();

  const [opRaw, aRaw, bRaw] = argv;
  const op = opRaw.toLowerCase();

  try {
    if (op === 'sqrt') {
      if (argv.length !== 2) usage();
      const a = toNumber(aRaw);
      const result = calculate(op, a);
      console.log(result);
      process.exit(0);
    } else {
      if (argv.length !== 3) usage();
      const a = toNumber(aRaw);
      const b = toNumber(bRaw);
      const result = calculate(op, a, b);
      console.log(result);
      process.exit(0);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(3);
  }
}

// Export programmatic API
module.exports = { calculate, modulo, power, squareRoot };
