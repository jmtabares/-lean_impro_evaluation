It seems there’s an issue creating the download link through the system. I’ll guide you on how to create the file locally instead:
	1.	Copy the content below.
	2.	Open a text editor (like VSCode or Notepad++).
	3.	Paste the content into the editor.
	4.	Save the file as README.md.

# **Project Testing Guide**

This guide explains how to set up and run all the tests locally for the **frontend**, **backend**, **Cypress E2E**, and **Postman tests** without using the Azure pipeline.

---

## **📋 Prerequisites**
Make sure you have the following installed:

**[Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)**  
  Install nvm using:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

	Tip: Restart your terminal after installing nvm.

•	Node.js v22.x (via nvm):
  ```bash
        nvm install 22
        nvm use 22
```

•	npm (comes with Node.js)

📁 Project Structure

        .
        ├── backend                 # Node.js backend application (Express)
        ├── frontend                # React frontend application (Vite)
        ├── test
        │   ├── e2e
        │   │   └── e2e-lean        # Cypress E2E test files
        │   └── postman             # Postman test collections
        └── README.md               # This guide

🔧 Step 1: Install Dependencies

Run npm install in all the necessary directories:

1.1 Backend Setup
  ```bash
cd backend
npm install
```

1.2 Frontend Setup
  ```bash
cd frontend
npm install
```

1.3 Cypress and Postman Setup
  ```bash
cd test/e2e/e2e-lean
npm install

cd ../postman
npm install
```
🚀 Step 2: Run the Backend and Frontend Locally

2.1 Start the Backend
  ```bash
cd backend
npm run dev
```
The backend will be running at http://localhost:3001.

2.2 Build and Serve the Frontend
  ```bash
cd frontend
npm run build
npx serve -s dist --listen 5173
```
The frontend will be served at http://localhost:5173.

✅ Step 3: Run Tests

3.1 Unit Tests

Backend Unit Tests
  ```bash
cd backend
npm test
```
Frontend Unit Tests
  ```bash
cd frontend
npm test
```
3.2 Cypress E2E Tests
	1.	Make sure both backend and frontend are running on localhost.
	2.	Run Cypress in interactive mode:
  ```bash
cd test/e2e/e2e-lean
npx cypress open
```
This will open the Cypress UI where you can select and run tests interactively.

3.	Alternatively, run tests headlessly:
```bash
npx cypress run --env baseUrl=http://localhost:5173
```
3.3 Postman (Newman) Tests
	1.	Run npm install in the test/postman folder (done in Step 1.3).
	2.	Execute the following commands:

Run LeanImprovements Collection (API Test)
  ```bash
cd test/postman
npx newman run LeanImprovements.postman_collection.json \
  -e LeanImprovements.postman_environment.json \
  --iteration-count 1 \
  --reporters cli,htmlextra,junitfull \
  --env-var "base_url=http://localhost:3001"
```
Run LeanSimpleLoadTest Collection (Simple Load test)
  ```bash
cd test/postman
npx newman run LeanSimpleLoadTest.postman_collection.json \
  -e LeanImprovements.postman_environment.json \
  --iteration-count 100 \
  --reporters cli,htmlextra,junitfull \
  --env-var "base_url=http://localhost:3001"
```
📂 Step 4: View Test Results

Cypress Test Results

The Cypress test results (including screenshots and videos) will be available under:
  ```plaitext
test/e2e/e2e-lean/cypress/reports
```
Postman (Newman) Test Results

The Newman HTML reports will be available under:
  ```plaintext
test/postman/newman
```
You can open the reports in any web browser.

🧹 Step 5: Clean Up Generated Reports

To clean up generated test reports, use:
  ```bash
cd test/postman
rm -rf newman/*

cd ../e2e/e2e-lean
rm -rf cypress/reports/*
```
🚑 Troubleshooting
	•	Port Conflicts: Ensure ports 3001 (backend) and 5173 (frontend) are available.
	•	Environment Variables: Update any environment-specific variables in the test configurations or pass them through command-line options.

💡 Feel free to modify this document if your project structure changes. Happy Testing! 🎉

Let me know if you encounter any issues!