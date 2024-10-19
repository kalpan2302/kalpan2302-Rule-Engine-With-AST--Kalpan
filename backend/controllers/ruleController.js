// backend/controllers/ruleController.js

// Define the Node structure for the AST
// class Node {
//     constructor(type, left = null, right = null, value = null) {
//         this.type = type; // "operator" for AND/OR, "operand" for conditions
//         this.left = left; // Reference to left child
//         this.right = right; // Reference to right child (for operators)
//         this.value = value; // Optional value for operand nodes (e.g., number for comparisons)
//     }
//   }
  

class ASTNode {}

class BinaryOp extends ASTNode {
    constructor(left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

class Comparison extends ASTNode {
    constructor(left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

class Value extends ASTNode {
    constructor(value) {
        super();
        this.value = value;
    }
}

class Variable extends ASTNode {
    constructor(name) {
        super();
        this.name = name;
    }
}

// Token types
const TOKENS = {
    'AND': /\bAND\b/,
    'OR': /\bOR\b/,
    'GT': />/,
    'LT': /</,
    'EQ': /=/,
    'NUMBER': /\d+/,
    'STRING': /\'[^\']*\'/,
    'VARIABLE': /\b[a-zA-Z_][a-zA-Z0-9_]*\b/,
    'LPAREN': /\(/,
    'RPAREN': /\)/,
};

// Tokenize the input rule
function tokenize(rule) {
    const tokenPatterns = Object.entries(TOKENS).map(([name, pattern]) => ({
        name,
        pattern,
    }));
    
    let tokens = [];
    let pos = 0;

    while (pos < rule.length) {
        let matchFound = false;
        for (let { name, pattern } of tokenPatterns) {
            const match = rule.slice(pos).match(pattern);
            if (match && match.index === 0) {
                tokens.push([name, match[0]]);
                pos += match[0].length;
                matchFound = true;
                break;
            }
        }
        if (!matchFound) {
            pos++;
        }
    }
    console.log("Tokens:", tokens);
    return tokens;
}

// Parser to generate the AST
function parse(tokens) {
    function parseExpression(index) {
        let [left, newIndex] = parseTerm(index);
        while (newIndex < tokens.length && ['AND', 'OR'].includes(tokens[newIndex][0])) {
            const operator = tokens[newIndex][1];
            newIndex++;
            let [right, nextIndex] = parseTerm(newIndex);
            left = new BinaryOp(left, operator, right);
            newIndex = nextIndex;
        }
        return [left, newIndex];
    }

    function parseTerm(index) {
        if (tokens[index][0] === 'LPAREN') {
            index++; // consume '('
            let [expr, newIndex] = parseExpression(index);
            index = newIndex + 1; // consume ')'
            return [expr, index];
        } else {
            return parseComparison(index);
        }
    }

    function parseComparison(index) {
        const left = tokens[index][0] === 'VARIABLE' ? new Variable(tokens[index][1]) : new Value(tokens[index][1]);
        index++; // consume variable or value
        const operator = tokens[index][1];
        index++; // consume operator
        const right = tokens[index][0] === 'VARIABLE' ? new Variable(tokens[index][1]) : new Value(tokens[index][1]);
        index++; // consume variable or value
        return [new Comparison(left, operator, right), index];
    }

    const [ast] = parseExpression(0);
    return ast;
}

// Function to generate AST from a rule string
function generateAst(rule) {
    const tokens = tokenize(rule);
    return parse(tokens);
}


//   // Function to create a Node from a rule string
//   const createNode = (type, left, right, value) => {
//     return new Node(type, left, right, value);
//   };
  
  // Function to parse the rule string and generate the corresponding AST
  const create_rule = (rule_string) => {
    try {
        // Tokenize the rule string into manageable parts
        console.log("Creating rule for string:", rule_string);
        // const tokens = tokenize(rule_string);
        // const ast = parseTokens(tokens);
        const ast  = generateAst(rule_string);
        console.log("AST:", ast);
        return ast; // Return the root node of the AST
    } catch (error) {
        console.error('Error creating rule:', error);
        throw new Error('Failed to create rule. Please check the rule string format.');
    }
  };


//   function tokenize(ruleString) {
//     // Regular expression to match variables, numbers, operators, and keywords
//     const regex = /\s*(=>|<|>|=|AND|OR|\(|\)|[a-zA-Z]+|[0-9]+)\s*/g;
//     return ruleString.match(regex).filter(token => token.trim().length > 0);
// }

// function parseTokens(tokens) {
//     const outputQueue = [];  // For storing operands and operators
//     const operatorStack = []; // For storing operators

//     const precedence = {
//         '>': 1,
//         '<': 1,
//         '=': 1,
//         'AND': 2,
//         'OR': 2
//     };

//     tokens.forEach(token => {
//         if (!isNaN(token)) {
//             // If token is a number, push it as an operand node
//             outputQueue.push(new Node('operand', { value: token }));
//         } else if (isVariable(token)) {
//             // If token is a variable (like 'age' or 'salary')
//             outputQueue.push(new Node('operand', { attribute: token }));
//         } else if (token in precedence) {
//             // Token is an operator
//             while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
//                 const opNode = new Node('operator', operatorStack.pop());
//                 opNode.right = outputQueue.pop();
//                 opNode.left = outputQueue.pop();
//                 outputQueue.push(opNode);
//             }
//             operatorStack.push(token);
//         }
//     });

//     // Process remaining operators in the stack
//     while (operatorStack.length) {
//         const opNode = new Node('operator', operatorStack.pop());
//         opNode.right = outputQueue.pop();
//         opNode.left = outputQueue.pop();
//         outputQueue.push(opNode);
//     }

//     return outputQueue.length ? outputQueue[0] : null; // Return the root of the AST
// }

// function isVariable(token) {
//     // A simple check for variable names (letters only for this example)
//     return /^[a-zA-Z]+$/.test(token);
// }

// function parseRuleString(ruleString) {
//     console.log(`Tokenizing rule string: "${ruleString}"`);
//     const tokens = tokenize(ruleString);
//     console.log(`Tokens:`, tokens);
//     const ast = parseTokens(tokens);
//     console.log(`AST:`, JSON.stringify(ast, null, 2)); // Print the AST structure
//     return ast;
// }


  
//   // Tokenization function to split the rule string into tokens
//   const tokenize = (rule_string) => {
//     // Replace any whitespace and split by operators and operands
//     const regex = /\s*([()])\s*|(\s+|&{2}|(\|\|)|==|=|!=|>|<|>=|<=|\w+)/g;
//     console.log("Tokenizing string:", rule_string.match(regex).filter(token => token.trim()));
//     return rule_string.match(regex).filter(token => token.trim());
//   };
  
//   // Parsing function to convert tokens into an AST
//   const parseTokens = (tokens) => {
//     const stack = [];
//     let current = null;
  
//     while (tokens.length > 0) {
//         const token = tokens.shift();
        
//         if (token === '(') {
//             // Start a new sub-expression
//             stack.push(current);
//             current = null; // Reset current for new expression
//         } else if (token === ')') {
//             // End of a sub-expression
//             const node = current;
//             current = stack.pop(); // Return to previous expression
//             if (current) {
//                 current.right = node; // Attach the completed node
//             }
//         } else if (token === 'AND' || token === 'OR') {
//             // Handle operators
//             if (current) {
//                 const newNode = createNode("operator", current, null, token);
//                 current = newNode; // Set current to new operator node
//             }
//         } else {
//             // Handle operand (assume simple comparison for now)
//             const nextToken = tokens.shift(); // Get the next token (should be operator or value)
//             const value = nextToken === '=' || nextToken === '==' ? tokens.shift() : nextToken;
//             const newNode = createNode("operand", null, null, { attribute: token, value });
//             if (current) {
//                 current.right = newNode; // Attach new operand to current node
//             } else {
//                 current = newNode; // Set as current if nothing is present
//             }
//         }
//     }
//     console.log("Current:", current);
//     return current; // Return the root of the AST
//   };
  
  // Function to combine multiple rules into a single AST
  const combine_rules = (rules) => {
    try {
        let combinedNode = null;
  
        rules.forEach(rule => {
            const node = create_rule(rule);
            // Combine nodes using OR operator (can be refined)
            if (combinedNode === null) {
                combinedNode = node; // If no combined node, set it
            } else {
                combinedNode = createNode("operator", combinedNode, node, "OR"); // Combine with OR
            }
        });
  
        return combinedNode; // Return the combined AST root
    } catch (error) {
        console.error('Error combining rules:', error);
        throw new Error('Failed to combine rules. Please check the rules format.');
    }
  };
  

  function evaluate_rule(ast, data) {
    function evaluateNode(node) {
        if (node instanceof BinaryOp) {
            const left = evaluateNode(node.left);
            const right = evaluateNode(node.right);
            if (node.operator === 'AND') {
                return left && right;
            } else if (node.operator === 'OR') {
                return left || right;
            }
        } else if (node instanceof Comparison) {
            const leftValue = node.left instanceof Variable ? data[node.left.name] : node.left.value;
            const rightValue = node.right instanceof Variable ? data[node.right.name] : node.right.value;

            if (node.operator === '>') {
                return leftValue > rightValue;
            } else if (node.operator === '<') {
                return leftValue < rightValue;
            } else if (node.operator === '=') {
                return leftValue == rightValue;
            }
        }
    }

  // Function to evaluate the AST against the provided data
//   const evaluate_rule = (ast, data) => {
//     try {
//         if (ast.type === "operand") {
//             return evaluateOperand(ast.value, data);
//         } else if (ast.type === "operator") {
//             const leftEval = evaluate_rule(ast.left, data);
//             const rightEval = evaluate_rule(ast.right, data);
            
//             return ast.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
//         }
//         return false; // Default return false if evaluation fails
//     } catch (error) {
//         console.error('Error evaluating rule:', error);
//         throw new Error('Failed to evaluate rule. Please check the AST and data.');
//     }
//   };
  
//   // Function to evaluate an operand node
//   const evaluateOperand = ({ attribute, value }, data) => {
//     // Implement actual comparison logic
//     switch (attribute) {
//         case 'age':
//             return data.age > value; // Example condition for age
//         case 'department':
//             return data.department === value; // Example condition for department
//         case 'salary':
//             return data.salary > value; // Example condition for salary
//         case 'experience':
//             return data.experience > value; // Example condition for experience
//         default:
//             return false; // Default return false if no condition matched
//     }
  };
  
  module.exports = {
    create_rule,
    combine_rules,
    evaluate_rule
  };
  