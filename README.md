
# Rule Engine with AST(Abstract Syntax Tree) 

This project isp a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine user eligibility based on attributes like age, department, income, spend etc.The system can use Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic creation,combination, and modification of these rules.


## Web Site link (Render)

- Deployed  [Web Site](https://rule-engine-ast-b27b.onrender.com)


## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Testing](#testing)

## Technologies
- **Node.js**
- **Express.js** (RESTful API)
- **MongoDB** (Database)
- **Postman** (API Testing)

## Features
- REST API that accepts user profiles and returns job recommendations.
- Matching logic based on skills, experience, and user preferences.
- MongoDB integration for job postings and user profiles.
- Proper error handling for API requests and database operations.



## Setup Instructions

### 1. Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

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
