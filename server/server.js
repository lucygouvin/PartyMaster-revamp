const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/dist/")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// app.get( "/" , (req, res) => res.send("Is this working"))
app.get( "/app" , (req, res) => {
res.sendFile(path.join(__dirname, "../client/dist/index.html"))
// res.sendFile("../client/dist/index.html")
});


app.listen(PORT, () =>  console.log("Help") )