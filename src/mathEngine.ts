/**
 * Custom Math Engine for Scientific Calculator.
 * Implements Tokenizer, Shunting-Yard parser, and RPN Evaluator.
 * All computations are in TypeScript using JS Math.
 * Trig functions work in DEGREES.
 */

// Define operator metadata
interface OpInfo {
  precedence: number;
  associativity: 'left' | 'right';
}

const OPERATORS: Record<string, OpInfo> = {
  '+': { precedence: 1, associativity: 'left' },
  '-': { precedence: 1, associativity: 'left' },
  '*': { precedence: 2, associativity: 'left' },
  '/': { precedence: 2, associativity: 'left' },
  '^': { precedence: 3, associativity: 'right' },
  'NEG': { precedence: 4, associativity: 'right' }, // Unary minus
  '!': { precedence: 5, associativity: 'left' },  // Factorial (postfix)
};

const FUNCTIONS = new Set([
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'sqrt', 'ln', 'log'
]);

/**
 * Tokenizes the expression string.
 */
export function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;

  // Normalize expression formatting
  const normalized = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/√/g, 'sqrt')
    .replace(/sin⁻¹/g, 'asin')
    .replace(/cos⁻¹/g, 'acos')
    .replace(/tan⁻¹/g, 'atan')
    .replace(/π/g, 'π')
    .replace(/pi/g, 'π');

  while (i < normalized.length) {
    const char = normalized[i];

    if (char === ' ' || char === '\t') {
      i++;
      continue;
    }

    // Numbers (digits and decimal point)
    if (/[0-9.]/.test(char)) {
      let numStr = '';
      let dotCount = 0;
      while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
        if (normalized[i] === '.') {
          dotCount++;
          if (dotCount > 1) {
            // Push invalid dot to trigger error in evaluator
            numStr += '.';
            i++;
            break;
          }
        }
        numStr += normalized[i];
        i++;
      }
      tokens.push(numStr);
      continue;
    }

    // Alphabetic words (functions and constants)
    if (/[a-zA-Z]/.test(char)) {
      let word = '';
      while (i < normalized.length && /[a-zA-Z]/.test(normalized[i])) {
        word += normalized[i];
        i++;
      }

      if (FUNCTIONS.has(word)) {
        tokens.push(word);
      } else if (word === 'e') {
        tokens.push('e');
      } else if (word === 'pi') {
        tokens.push('π');
      } else {
        // Unknown word (e.g. nPr, nCr if they bleed into expression, or typos)
        tokens.push(word);
      }
      continue;
    }

    // Special constants
    if (char === 'π') {
      tokens.push('π');
      i++;
      continue;
    }

    // Single character operators/brackets
    if (['+', '-', '*', '/', '^', '!', '(', ')'].includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }

    // Fallback for unrecognized characters (e.g. emoji or bad input)
    tokens.push(char);
    i++;
  }

  // Identify unary minus (negation)
  const processedTokens: string[] = [];
  for (let j = 0; j < tokens.length; j++) {
    const current = tokens[j];
    if (current === '-') {
      const prev = j > 0 ? tokens[j - 1] : null;
      // It's unary if it's the start, or preceded by an operator, function, or left parenthesis
      const isUnary = !prev || ['+', '-', '*', '/', '^', '(', 'NEG'].includes(prev) || FUNCTIONS.has(prev);
      if (isUnary) {
        processedTokens.push('NEG');
      } else {
        processedTokens.push('-');
      }
    } else {
      processedTokens.push(current);
    }
  }

  // Insert implicit multiplications (e.g. 5π -> 5 * π, 5(2) -> 5 * (2))
  const finalTokens: string[] = [];
  for (let k = 0; k < processedTokens.length; k++) {
    const curr = processedTokens[k];
    if (k > 0) {
      const prev = processedTokens[k - 1];
      const prevIsNumber = !isNaN(Number(prev)) || prev === 'π' || prev === 'e' || prev === ')' || prev === '!';
      const currIsNumberOrFunc = !isNaN(Number(curr)) || curr === 'π' || curr === 'e' || curr === '(' || FUNCTIONS.has(curr);
      
      if (prevIsNumber && currIsNumberOrFunc) {
        finalTokens.push('*');
      }
    }
    finalTokens.push(curr);
  }

  return finalTokens;
}

/**
 * Shunting-Yard Algorithm to convert Infix tokens to Postfix (RPN).
 */
export function shuntingYard(tokens: string[]): string[] {
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];

  for (const token of tokens) {
    // Number or constant
    if (!isNaN(Number(token)) || token === 'π' || token === 'e') {
      outputQueue.push(token);
    } 
    // Function
    else if (FUNCTIONS.has(token)) {
      operatorStack.push(token);
    } 
    // Operator
    else if (OPERATORS[token] !== undefined) {
      const op1 = token;
      const op1Info = OPERATORS[op1];

      while (operatorStack.length > 0) {
        const op2 = operatorStack[operatorStack.length - 1];
        if (op2 === '(') {
          break;
        }

        const op2Info = OPERATORS[op2];
        if (op2Info !== undefined) {
          if (
            (op1Info.associativity === 'left' && op1Info.precedence <= op2Info.precedence) ||
            (op1Info.associativity === 'right' && op1Info.precedence < op2Info.precedence)
          ) {
            outputQueue.push(operatorStack.pop()!);
          } else {
            break;
          }
        } else if (FUNCTIONS.has(op2)) {
          // Functions have high precedence, pop them
          outputQueue.push(operatorStack.pop()!);
        } else {
          break;
        }
      }
      operatorStack.push(op1);
    } 
    // Left bracket
    else if (token === '(') {
      operatorStack.push(token);
    } 
    // Right bracket
    else if (token === ')') {
      let foundLeft = false;
      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (top === '(') {
          foundLeft = true;
          operatorStack.pop();
          break;
        } else {
          outputQueue.push(operatorStack.pop()!);
        }
      }
      if (!foundLeft) {
        throw new Error('Mismatched brackets');
      }
      // If top of stack is a function, pop it to output
      if (operatorStack.length > 0 && FUNCTIONS.has(operatorStack[operatorStack.length - 1])) {
        outputQueue.push(operatorStack.pop()!);
      }
    } 
    // Unknown token
    else {
      throw new Error(`Invalid token: ${token}`);
    }
  }

  // Pop remaining operators
  while (operatorStack.length > 0) {
    const op = operatorStack.pop()!;
    if (op === '(' || op === ')') {
      throw new Error('Mismatched brackets');
    }
    outputQueue.push(op);
  }

  return outputQueue;
}

/**
 * Calculates factorial of a number recursively.
 */
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Factorial of negative or non-integer');
  }
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

/**
 * Rounds a number to exactly 10 significant figures to prevent floating-point noise.
 */
function roundTo10SigFigs(num: number): number {
  if (num === 0) return 0;
  if (!isFinite(num)) return num;
  return parseFloat(num.toPrecision(10));
}

/**
 * Evaluates the RPN/Postfix tokens stack.
 */
export function evaluateRPN(rpn: string[]): number {
  const stack: number[] = [];

  for (const token of rpn) {
    // Check if number
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } 
    // Constants
    else if (token === 'π') {
      stack.push(Math.PI);
    } else if (token === 'e') {
      stack.push(Math.E);
    } 
    // Operators
    else if (OPERATORS[token] !== undefined) {
      if (token === 'NEG') {
        if (stack.length < 1) throw new Error('Malformed expression');
        const val = stack.pop()!;
        stack.push(-val);
      } else if (token === '!') {
        if (stack.length < 1) throw new Error('Malformed expression');
        const val = stack.pop()!;
        stack.push(factorial(val));
      } else {
        // Binary operators
        if (stack.length < 2) throw new Error('Malformed expression');
        const b = stack.pop()!;
        const a = stack.pop()!;

        switch (token) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            if (b === 0) throw new Error('Division by zero');
            stack.push(a / b);
            break;
          case '^':
            stack.push(Math.pow(a, b));
            break;
          default:
            throw new Error(`Unknown operator: ${token}`);
        }
      }
    } 
    // Functions
    else if (FUNCTIONS.has(token)) {
      if (stack.length < 1) throw new Error('Malformed expression');
      const val = stack.pop()!;

      switch (token) {
        // Trig in DEGREES
        case 'sin':
          stack.push(Math.sin((val * Math.PI) / 180));
          break;
        case 'cos':
          // Avoid tiny values near 0 for cos(90)
          const radCos = (val * Math.PI) / 180;
          if (Math.abs(val % 180) === 90) {
            stack.push(0);
          } else {
            stack.push(Math.cos(radCos));
          }
          break;
        case 'tan':
          // tan(90) has division by zero/undefined behaviour
          if (Math.abs(val % 180) === 90) {
            throw new Error('Tan of 90 degrees is undefined');
          }
          stack.push(Math.tan((val * Math.PI) / 180));
          break;
        case 'asin':
          if (val < -1 || val > 1) throw new Error('asin out of range');
          stack.push((Math.asin(val) * 180) / Math.PI);
          break;
        case 'acos':
          if (val < -1 || val > 1) throw new Error('acos out of range');
          stack.push((Math.acos(val) * 180) / Math.PI);
          break;
        case 'atan':
          stack.push((Math.atan(val) * 180) / Math.PI);
          break;

        // Hyperbolic functions
        case 'sinh':
          stack.push(Math.sinh(val));
          break;
        case 'cosh':
          stack.push(Math.cosh(val));
          break;
        case 'tanh':
          stack.push(Math.tanh(val));
          break;

        // Roots and logs
        case 'sqrt':
          if (val < 0) throw new Error('Square root of negative');
          stack.push(Math.sqrt(val));
          break;
        case 'ln':
          if (val <= 0) throw new Error('Log of non-positive');
          stack.push(Math.log(val));
          break;
        case 'log':
          if (val <= 0) throw new Error('Log of non-positive');
          stack.push(Math.log10(val));
          break;

        default:
          throw new Error(`Unknown function: ${token}`);
      }
    } else {
      throw new Error(`Unexpected token: ${token}`);
    }
  }

  if (stack.length !== 1) {
    throw new Error('Malformed expression');
  }

  return stack[0];
}

/**
 * Main evaluation entry point.
 * Tokenizes, parses, and evaluates.
 * Returns rounded result string, or "Error".
 */
export function calculate(expressionStr: string): string {
  if (!expressionStr || expressionStr.trim() === '') {
    return '0';
  }

  try {
    const tokens = tokenize(expressionStr);
    const rpn = shuntingYard(tokens);
    const rawResult = evaluateRPN(rpn);
    
    if (isNaN(rawResult) || !isFinite(rawResult)) {
      return 'Error';
    }

    const rounded = roundTo10SigFigs(rawResult);
    return rounded.toString();
  } catch (error) {
    return 'Error';
  }
}
