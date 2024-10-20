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

//   const ast1 = create_rule(rule_string);

  
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
  
//   function evaluateNode(node,data) {
//     console.log("inside evaluate node"  , node);
//     console.log("inside evaluate data"  , data);
    
//     if (node instanceof BinaryOp) {
//         console.log("inside binary op : ",node)
//         const left = evaluateNode(node.left,data);
//         console.log("left value : ",left);
//         const right = evaluateNode(node.right,data);
//         if (node.operator === 'AND') {
//             return left && right;
//         } else if (node.operator === 'OR') {
//             return left || right;
//         }
//     } else if (node instanceof Comparison) {
//         console.log("inside comparison : ",node)
//         const leftValue = node.left instanceof Variable ? data[node.left.name] : node.left.value; // age
//         console.log("left value : ",leftValue)
//         const rightValue = node.right instanceof Variable ? data[node.right.name] : node.right.value; // 35

//         const rightData= data.rightValue; // 50
//         // const leftData  = data.leftValue; // 

//         if (node.operator === '>') {
//             return rightData > rightValue;
//         } else if (node.operator === '<') {
//             return rightData < rightValue;
//         } else if (node.operator === '=') {
//             return rightData == rightValue;
//         }
//     }
// }


function evaluateNode(node, data) {
    console.log("inside evaluate node:", node);
    console.log("inside evaluate data:", data);

    if(node.operator === 'AND' || node.operator === 'OR') {
        const left = evaluateNode(node.left, data);
        const right = evaluateNode(node.right, data);
        if (node.operator === 'AND') {
            return left && right;
        } else if (node.operator === 'OR') {
            return left || right;
        }
    }else if(node.operator === '>' || node.operator === '<' || node.operator === '='){
        const leftValue = node.left.name;
        const rightValue = node.right.value;

        if(node.operator === '>'){
            return data[leftValue] > rightValue;
        }else if(node.operator === '<'){
            return data[leftValue] < rightValue;           
        }else{
            return data[leftValue] == rightValue;
        }
    }

    

    // // Handle binary operators (AND, OR)
    // if (node instanceof BinaryOp) {
    //     console.log("inside binary op:", node);

    //     // Recursively evaluate the left and right child nodes
    //     const left = evaluateNode(node.left, data);
    //     console.log("left value:", left);
    //     const right = evaluateNode(node.right, data);
    //     console.log("right value:", right);

    //     // Perform logical operations based on the binary operator
    //     if (node.operator === 'AND') {
    //         return left && right;
    //     } else if (node.operator === 'OR') {
    //         return left || right;
    //     }
    // }
    // // Handle comparison operations (>, <, =)
    // else if (node instanceof Comparison) {
    //     console.log("inside comparison:", node);

    //     // Get the left value from the data object (e.g., data['age'])
    //     const leftValue = node.left instanceof Variable ? data[node.left.name] : node.left.value;
    //     console.log("left value (from data):", leftValue);

    //     // Get the right value from the comparison node
    //     const rightValue = node.right instanceof Variable ? data[node.right.name] : node.right.value;
    //     console.log("right value (from rule):", rightValue);

    //     // Perform the comparison based on the operator in the rule
    //     if (node.operator === '>') {
    //         return leftValue > rightValue;
    //     } else if (node.operator === '<') {
    //         return leftValue < rightValue;
    //     } else if (node.operator === '=') {
    //         return leftValue == rightValue;
    //     }
    // }

    // If the node is neither a BinaryOp nor a Comparison, return false as default
    return false;
}

  function evaluate_rule(ast1, data) {
    console.log("inside evaluate : ",data)
    console.log("inside evaluate : ",ast1) // undefined ?? 
    return evaluateNode(ast1,data);  // Start evaluation from the root of the AST
} 
  
  module.exports = {
    create_rule,
    combine_rules,
    evaluate_rule
  };
  
// ((age > 30 AND department = 'Sales') OR (age < 25 AND
// department = 'Marketing')) AND (salary > 50000 OR experience >
// 5)


// AST: BinaryOp {
//     left: BinaryOp {
//       left: Comparison { left: [Variable], operator: '<', right: [Value] },
//       operator: 'OR',
//       right: BinaryOp { left: [BinaryOp], operator: 'OR', right: [BinaryOp] }
//     },
//     operator: 'AND',
//     right: BinaryOp {
//       left: Comparison { left: [Variable], operator: '>', right: [Value] },
//       operator: 'OR',
//       right: Comparison { left: [Variable], operator: '>', right: [Value] }
//     }
//   }

