import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
const masterKey = "gowtham";

let events;
let users;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// fetching all events
app.get("/events", (req, res) => {
  res.json(events);
});

// fetching by id
app.get("/events/:id", (req, res) => {
  const searchIndex = events.findIndex(
    (event) => event.id === parseInt(req.params.id)
  );
  if (searchIndex === -1)
    res.status(404).json({ error: `id: ${req.params.id} is not found` });
  else res.json(events[searchIndex]);
});

// posting new event
app.post("/create", (req, res) => {
  if (!events.length && req.body.content !== "" && req.body.author !== "") {
    const newEvent = {
      id: 1,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),
    };
    events.push(newEvent);
    res.json(newEvent).status(200);
  } else if (req.body.content !== "" && req.body.author !== "" && req.body) {
    const newEvent = {
      id: events[events.length - 1].id + 1,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),
    };
    events.push(newEvent);
    res.json(newEvent).status(200);
  } else {
    res.json({ message: " fill the form" }).status(400);
  }
});

// deleting all post
app.delete("/delete/all", (req, res) => {
  const userKey = req.query.apiKey;
  if (userKey === masterKey) {
    events = [];
    res.json({ message: "deletion successfull" });
  } else res.status(404).json({ error: "cannot delete, enter the valid key" });
});

// delete specific event
app.delete("/delete/:id", (req, res) => {
  const searchIndex = events.findIndex(
    (event) => event.id === parseInt(req.params.id)
  );
  if (searchIndex === -1)
    res.json({ error: `ID: ${req.params.id} is not found` }).status(404);
  else {
    events.splice(searchIndex, 1);
    res.json({ message: `Id: ${req.params.id} is successfully deleted` });
  }
});

// Listening to app
app.listen(port, (req, res) => {
  console.log("API is running on port: " + port);
});

// DataBase
events = [
  {
    id: 1,
    userName: "gowtham2k2",
    content: "I tossed egg on my neighbors head",
    author: "gowtham",
    date: "2024-06-11T09:48:27.980Z",
  },
];

users = [
  {
    userName: "gowtham2k2",
    firstName: "Gowtham",
    lastName: "Gandhi",
    password: "gowtham2k2",
  },
];
