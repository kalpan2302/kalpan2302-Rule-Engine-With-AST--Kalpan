// backend/routes/ruleRoutes.js
const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController'); // Ensure the path is correct

// Define routes
router.post('/create', (req, res) => {
    const ruleString = req.body.ruleString; // Get the rule string from the request body
    console.log(req.body);
    const ast = ruleController.create_rule(ruleString); 
    console.log("post route :",ast)// Call create_rule from ruleController
    return res.json(ast); // Return the AST as JSON response
});

router.post('/combine', (req, res) => {
    const rules = req.body.rules; // Get the array of rules from the request body
    const combinedAST = ruleController.combine_rules(rules); // Combine rules using combine_rules
    res.json(combinedAST); // Return the combined AST as JSON response
});

router.post('/evaluate', (req, res) => {
    // console.log(" req body : ",req.body);
    const ast = req.body.ast; // Get the AST from the request body
    console.log("body ast :",req.body.ast);   // undrfiend??
    const data = req.body.data; // Get the data for evaluation
    // console.log(" body data:" ,req.body.data);
    const result = ruleController.evaluate_rule(ast,data); // Evaluate the AST against the data
    res.json({ result }); // Return the evaluation result
});

module.exports = router;
