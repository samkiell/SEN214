export interface KeyConfig {
  label: string;
  value: string;
  type: 'digit' | 'operator' | 'function' | 'constant' | 'action' | 'modal';
}

export const basicLayout: KeyConfig[][] = [
  [
    { label: 'AC', value: 'AC', type: 'action' },
    { label: 'DEL', value: 'DEL', type: 'action' },
    { label: '(', value: '(', type: 'operator' },
    { label: ')', value: ')', type: 'operator' },
  ],
  [
    { label: '7', value: '7', type: 'digit' },
    { label: '8', value: '8', type: 'digit' },
    { label: '9', value: '9', type: 'digit' },
    { label: '÷', value: '/', type: 'operator' },
  ],
  [
    { label: '4', value: '4', type: 'digit' },
    { label: '5', value: '5', type: 'digit' },
    { label: '6', value: '6', type: 'digit' },
    { label: '×', value: '*', type: 'operator' },
  ],
  [
    { label: '1', value: '1', type: 'digit' },
    { label: '2', value: '2', type: 'digit' },
    { label: '3', value: '3', type: 'digit' },
    { label: '-', value: '-', type: 'operator' },
  ],
  [
    { label: '0', value: '0', type: 'digit' },
    { label: '.', value: '.', type: 'digit' },
    { label: '=', value: '=', type: 'action' },
    { label: '+', value: '+', type: 'operator' },
  ],
];

export const scientificLayout: KeyConfig[][] = [
  // Scientific keys
  [
    { label: 'sin', value: 'sin(', type: 'function' },
    { label: 'cos', value: 'cos(', type: 'function' },
    { label: 'tan', value: 'tan(', type: 'function' },
    { label: 'sin⁻¹', value: 'asin(', type: 'function' },
    { label: 'cos⁻¹', value: 'acos(', type: 'function' },
  ],
  [
    { label: 'sinh', value: 'sinh(', type: 'function' },
    { label: 'cosh', value: 'cosh(', type: 'function' },
    { label: 'tanh', value: 'tanh(', type: 'function' },
    { label: 'tan⁻¹', value: 'atan(', type: 'function' },
    { label: 'x²', value: '^2', type: 'function' },
  ],
  [
    { label: '√', value: 'sqrt(', type: 'function' },
    { label: 'ln', value: 'ln(', type: 'function' },
    { label: 'log', value: 'log(', type: 'function' },
    { label: '^', value: '^', type: 'operator' },
    { label: '!', value: '!', type: 'operator' },
  ],
  [
    { label: 'π', value: 'π', type: 'constant' },
    { label: 'e', value: 'e', type: 'constant' },
    { label: 'nPr', value: 'nPr', type: 'modal' },
    { label: 'nCr', value: 'nCr', type: 'modal' },
    { label: 'STAT', value: 'STAT', type: 'modal' },
  ],
  // Basic keys integrated in 5 columns for a cohesive scientific view
  [
    { label: 'AC', value: 'AC', type: 'action' },
    { label: 'DEL', value: 'DEL', type: 'action' },
    { label: '(', value: '(', type: 'operator' },
    { label: ')', value: ')', type: 'operator' },
    { label: '÷', value: '/', type: 'operator' },
  ],
  [
    { label: '7', value: '7', type: 'digit' },
    { label: '8', value: '8', type: 'digit' },
    { label: '9', value: '9', type: 'digit' },
    { label: '×', value: '*', type: 'operator' },
    { label: '-', value: '-', type: 'operator' },
  ],
  [
    { label: '4', value: '4', type: 'digit' },
    { label: '5', value: '5', type: 'digit' },
    { label: '6', value: '6', type: 'digit' },
    { label: '+', value: '+', type: 'operator' },
    { label: '=', value: '=', type: 'action' },
  ],
  [
    { label: '1', value: '1', type: 'digit' },
    { label: '2', value: '2', type: 'digit' },
    { label: '3', value: '3', type: 'digit' },
    { label: '0', value: '0', type: 'digit' },
    { label: '.', value: '.', type: 'digit' },
  ],
];
