const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/dist/")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// app.get( "/" , (req, res) => res.send("Is this working"))
app.get( "/" , (req, res) => {
res.sendFile(path.join(__dirname, "../client/dist/index.html"))
});
app.get("/graphql", res.json("data"));

app.listen(PORT, () =>  console.log(`Application is running on ${PORT}`) )