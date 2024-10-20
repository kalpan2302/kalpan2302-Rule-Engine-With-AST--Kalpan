import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL;

const createRule = async (ruleString) => {
  const response = await axios.post(`${url}/api/create`, { ruleString });
  console.log("rule erc=vice responce",response);
  return response.data;
};

const evaluateRule = async (ast, data) => {
  console.log("service ast :",ast);
  const response = await axios.post(`${url}/api/evaluate`, { ast, data });
  return response.data.result;
};

export default { createRule, evaluateRule };
