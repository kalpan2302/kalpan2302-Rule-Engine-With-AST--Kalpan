import axios from 'axios';

const createRule = async (ruleString) => {
  const response = await axios.post('http://localhost:5000/api/create', { ruleString });
  return response.data;
};

const evaluateRule = async (ast, data) => {
  const response = await axios.post('http://localhost:5000/api/evaluate', { ast, data });
  return response.data.result;
};

export default { createRule, evaluateRule };
