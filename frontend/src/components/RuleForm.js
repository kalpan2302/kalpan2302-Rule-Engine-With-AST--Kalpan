import React, { useState } from 'react';
import ruleService from '../services/ruleService';

const RuleForm = () => {
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [output, setOutput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { age: Number(age), department, salary: Number(salary), experience: Number(experience) };
    
    // Create rule
    const rule = await ruleService.createRule(ruleString);

    // Evaluate rule
    const result = await ruleService.evaluateRule(rule.ast, data);
    setOutput(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
      <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <input type="number" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
      <input type="text" placeholder="Rule" value={ruleString} onChange={(e) => setRuleString(e.target.value)} />
      <button type="submit">Evaluate</button>
      {output !== null && <div>Output: {output ? 'True' : 'False'}</div>}
    </form>
  );
};

export default RuleForm;
