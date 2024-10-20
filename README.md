
# Rule Engine with AST(Abstract Syntax Tree) 

This project isp a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine user eligibility based on attributes like age, department, income, spend etc.The system can use Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic creation,combination, and modification of these rules.


## Web Site link (Render)

- Deployed  [Web Site](https://rule-engine-ast-b27b.onrender.com)




## Technologies
- **Node.js**
- **Express.js** (RESTful API)
- **Javascript**
- **ReactJs**
- **Tailwind CSS**
- **Postman** (API Testing)


### Sample Rules:

● rule1 = ((age > 30 AND department = Sales) OR (age < 25 AND
department = Marketing)) AND (salary > 50000 OR experience >
5)

● rule2 = ((age > 30 AND department = Marketing)) AND (salary >
20000 OR experience > 5)

## NOTE:

- In Input rule enter department =Sales rather then department ='Sales'.
- In rule write age, department, salary, experience in lowercase.
- Write Binary operator like AND, OR in uppercase only.


### Setup Instructions

### 1. Prerequisites
Before setting up the project, ensure you have the following installed:

- **Node.js (v14.x or above)
- **npm (v6.x or above)
- **Git

### 2. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/kalpan2302/kalpan2302-Rule-Engine-With-AST--Kalpan
```

### Backend Setup

Navigate to the backend directory:
```bash
cd backend
```
Install the required packages:
```bash
npm install
```

Start the backend server:
```bash
node app.js
```
This will start the backend on http://localhost:5000

### Frontend Setup
Next, navigate to the frontend directory:
```bash
cd ../frontend
```
Install the required packages:
```bash
npm install
```


### Update API URL for Local Environment
If the Render server is not running, you will need to point the frontend to the locally running backend.
Open the file 
```bash 
cd src/services/ruleService.js.
```
Change the API URL to the following:
```bash
const url = 'http://localhost:5000';
```
This will make the frontend use the locally hosted backend.


## Start the Frontend
To start the frontend, use the following command:
```bash
npm start
```
This will start the frontend on http://localhost:3000.


### Additional Information:

-- To run this project on a local machine if the Render server is not running properly, change the url (const variable) in  ‘ frontend/src/services/ruleService.js’ file  to 'http://localhost:5000'. Then run this app.


-- On render web site link if the server is not responding quickly it may be due to free tier resource use to host this static site. So please wait for 40-50 sec and then press the evaluate button again. It will surely run.


