#!/usr/bin/env node

/*
  Calculator CLI

  Supported operations:
  - Addition (add or +)
  - Subtraction (sub or -)
  - Multiplication (mul or *)
  - Division (div or /)

  Usage examples:
    node src/calculator.js add 2 3    # => 5
    node src/calculator.js div 8 2    # => 4
    node src/calculator.js + 4 5      # => 9

  Behavior:
  - Accepts two numeric operands and an operator keyword or symbol
  - Prints result to stdout and exits with code 0 on success
  - Prints error and exits with non-zero status on invalid input or division by zero
*/

// Minimal, dependency-free implementation
function usage() {
  console.error('Usage: node src/calculator.js <op> <num1> <num2>');
  console.error('Operators: add | sub | mul | div  (also + - * /)');
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
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.length !== 3) usage();

  const [opRaw, aRaw, bRaw] = argv;
  const op = opRaw.toLowerCase();
  const a = toNumber(aRaw);
  const b = toNumber(bRaw);

  try {
    const result = calculate(op, a, b);
    // Print result to stdout
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(3);
  }
}

// Export programmatic API
module.exports = { calculate };
