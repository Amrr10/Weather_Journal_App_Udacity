const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

// Setup empty JS object to act as endpoint for all routes
projectData = {};
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, () => {console.log(`Server Running On: http://localhost:${port}`);});

//Get function 
app.get('/getAll', (request, response) => {response.send(projectData).status(200).end();});

//Post function
app.post('/postData', (request, response) => {
    projectData={
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
    response.send(projectData).status(200).end();
});