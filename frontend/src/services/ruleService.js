import axios from 'axios';

const createRule = async (ruleString) => {
  const response = await axios.post('http://localhost:5000/api/create', { ruleString });
  console.log("rule erc=vice responce",response);
  return response.data;
};

const evaluateRule = async (ast, data) => {
  console.log("service ast :",ast);
  const response = await axios.post('http://localhost:5000/api/evaluate', { ast, data });
  return response.data.result;
};

export default { createRule, evaluateRule };
