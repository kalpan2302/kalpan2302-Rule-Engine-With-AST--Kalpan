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
    const result = await ruleService.evaluateRule(rule, data);
    setOutput(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-md transition duration-300 ease-in-out transform hover:bg-gray-50 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Rule Evaluation Engine</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <input
              type="number"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <input
              type="number"
              placeholder="Enter experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rule String</label>
            <textarea
              placeholder="Enter rule"
              value={ruleString}
              onChange={(e) => setRuleString(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Evaluate
          </button>

          {output !== null && (
            <div className={`mt-4 text-lg font-semibold ${output ? 'text-green-600' : 'text-red-600'}`}>
              Output: {output ? 'True' : 'False'}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RuleForm;



/*

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
    const result = await ruleService.evaluateRule(rule, data);
    setOutput(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-md transition duration-300 ease-in-out transform hover:bg-gray-50 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Rule Evaluation Engine</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <input
              type="number"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <input
              type="number"
              placeholder="Enter experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rule String</label>
            <input
              type="text"
              placeholder="Enter rule"
              value={ruleString}
              onChange={(e) => setRuleString(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Evaluate
          </button>

          {output !== null && (
            <div className={`mt-4 text-lg font-semibold ${output ? 'text-green-600' : 'text-red-600'}`}>
              Output: {output ? 'True' : 'False'}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RuleForm;


*/