// backend/routes/ruleRoutes.js
const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController'); 

// Define routes
router.post('/create', (req, res) => {
    const ruleString = req.body.ruleString; 
    console.log(req.body);
    const ast = ruleController.create_rule(ruleString); 
    console.log("post route :",ast)
    return res.json(ast); //
});

router.post('/combine', (req, res) => {
    const rules = req.body.rules; 
    const combinedAST = ruleController.combine_rules(rules); 
    res.json(combinedAST); 
});

router.post('/evaluate', (req, res) => {
    // console.log(" req body : ",req.body);
    const ast = req.body.ast;
    console.log("body ast :",req.body.ast);   // undrfiend??
    const data = req.body.data; 
    // console.log(" body data:" ,req.body.data);
    const result = ruleController.evaluate_rule(ast,data); 
    res.json({ result }); 
});

module.exports = router;
