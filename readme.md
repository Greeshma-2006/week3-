### Backend Development

1. Create backend project folder  
   Create a new folder for the backend project.

2. Initialize git repository  
   git init

3. Add `.gitignore` file  
   Used to ignore files like `node_modules`.

4. Generate `package.json`  
   npm init -y

5. Install required packages  
   npm install express  
   npm install mongoose

6. Create Express application  
   Create `server.js` and initialize Express server.

7. Connect backend to MongoDB  

a. Install mongoose and connect to MongoDB server  
   Use mongoose to establish a connection with MongoDB.

b. Create schema of resource  
   Define the structure of the resource using mongoose schema.

c. Create model of the schema  
   Create a mongoose model from the schema.

d. Perform database operations on the model  
   Use the model to perform CRUD operations like create, read, update, and delete.
