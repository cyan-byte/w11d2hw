const express = require("express");
const app = express();
const port = 3000;

let numberOfBottles = 100;

app.get("/", (req, res) => {
  numberOfBottles = (numberOfBottles - 1) >= 0 ? (numberOfBottles - 1) : 0;
  const responseArray = [
    `<h1>${numberOfBottles} Bottles of beer on the wall,</h1>
    <h1>${numberOfBottles} Bottles of beer . . .</h1>`,
    `<a href="/${numberOfBottles}">Take one down, pass it around</a>`
  ];
  res.send(responseArray.join(''));
});

app.get("/:number_of_bottles", (req, res) => {
  const requestedBottles = parseInt(req.params.number_of_bottles);

  const responseArray = [
    `<h1>${requestedBottles - 1} Bottles of beer on the wall</h1>`,
    `<a href="/${Math.max(0, requestedBottles)}">Take one down, pass it around</a>`
  ];

  res.status(/^\d+$/.test(requestedBottles) && requestedBottles >= 0 ? 200 : 400).send(responseArray.join(''));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});