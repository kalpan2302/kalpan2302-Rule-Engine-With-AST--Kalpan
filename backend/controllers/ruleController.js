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


function evaluateNode(node, data) {
    console.log("inside evaluate node:", node);
    console.log("inside evaluate data:", data);

    // Check if the node is a logical operator (AND, OR)
    if (node.operator === 'AND' || node.operator === 'OR') {
        const left = evaluateNode(node.left, data);
        const right = evaluateNode(node.right, data);
        return node.operator === 'AND' ? left && right : left || right;
    }

    // Check if the node is a comparison operator (>, <, =)
    if (node.operator === '>' || node.operator === '<' || node.operator === '=') {
        const leftValue = data[node.left.name]; // Accessing the value from data using the left node's name // sales
        
        let rightValue = node.right.value; // Right value is assumed to be a literal 
        if(rightValue === undefined) {
            rightValue = node.right.name;
        }

        console.log("inside leftvalue" ,leftValue);
        console.log("inside rightvalue" , rightValue);
        switch (node.operator) {
            case '>':
                console.log("inside >",leftValue > rightValue);
                return leftValue > rightValue;
            case '<':
                console.log("inside >",leftValue < rightValue);
                return leftValue < rightValue;
            case '=':
                console.log("inside >",leftValue === rightValue);
                return leftValue === rightValue;
            default:
                return false; // Fallback for unrecognized operators
        }
    }

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
  }





  // -----------------------------------------------------------
  
// ((age > 30 AND2 department = 'Sales') OR2 (age < 25 AND3
// department = 'Marketing')) AND1 (salary > 50000 OR1 experience >
// 5)

// ((age > 30 AND department = 'Sales') OR (age < 25 OR department = 'Marketing')) AND (salary > 50000 OR experience < 5)


// body ast : {
//     left: {
//       left: { left: [Object], operator: 'AND', right: [Object] },
//       operator: 'OR',
//       right: { left: [Object], operator: 'OR', right: [Object] }
//     },
//     operator: 'AND',
//     right: {
//       left: { left: [Object], operator: '>', right: [Object] },
//       operator: 'OR',
//       right: { left: [Object], operator: '<', right: [Object] }
//     }
//   }