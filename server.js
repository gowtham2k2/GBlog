import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// getting all event
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/events");
    if (!response.data.length)
      res.render("main/index.ejs", { alert: "No data has been added yet" });
    else res.render("main/index.ejs", { events: response.data });
  } catch (err) {
    res.status(500).render("main/index.ejs", { alert: "Error fetching Data" });
  }
});

// create new event
app.get("/create", (req, res) => {
  res.render("main/create.ejs");
});

app.post("/create", async (req, res) => {
  try{
    const response = await axios.post(`${API_URL}/create`, req.body);
    res.redirect("/");
  }catch(error){
    res.render("main/create.ejs", {alert: "error Creating the post"})
  }
});

// search event by id
app.post("/search", async (req, res) => {
  try {
    const response = await axios.get(API_URL + `/events/${req.body.id}`);
    const events = [response.data];
    res.render("main/index.ejs", { events: events });
  } catch (err) {
    res.render("main/index.ejs", {
      alert: `ID: ${req.body.id} not found :(`,
    });
  }
});

// login route
app.get("/login", (req, res) => {
  res.render("main/login.ejs");
});

app.post("/login", async (req, res) => {
  const response = await axios.post(API_URL + "/login", req.body);
});

app.listen(port, (req, res) => {
  console.log("Back-end server is running on port: " + port);
});
