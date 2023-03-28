const express = require('express');
const path = require('path');
const usersRoute = require('./routes/users.js');
const app = express();

app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/users', usersRoute)
/*

app.post("user/" createUser);
app.get("user/:id", getUser);
app.delete("user/:id", deleteUser);*/

app.post("/event", lagreEvent);
app.get("event/:id", finnEvent);
app.delete("event/:id",deleteEvent);
app.put("event/:id", updateEvent);

function updateEvent(req,res,next){
  const eventID = req.params.id;
  const eventData = req.body;
}

function deleteEvent(req,res,next){
  const eventID = req.params.id;
  // slete event med id eventid;
}

function lagreEvent(req,res,next){
  // data ligger i req.body
  console.log(req.body);
}

function finnEvent(req,res,next){
  const eventID = req.params.id;
  // returner event med id === eventID
}


// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});