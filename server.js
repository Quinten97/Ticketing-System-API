//express setup
const express = require("express");
const app = express();
const port = 3000;

//sqlite setup
const sqlite3 = require("sqlite3").verbose();

//body-parser
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.get("/tickets", (req, res) => {
  let db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });

  const sqlGetAll = "SELECT * FROM Tickets ORDER BY date DESC";
  db.all(sqlGetAll, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });

  db.close();
});

app.get("/tickets/wildcard", (req, res) => {
  const db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });

  const wildcard = req.query.wildcard;
  console.log(wildcard);

  const sqlGetSearch = `SELECT * FROM Tickets WHERE "${wildcard}" IN (first_name, last_name, email, phone_number, employee, id) ORDER BY date DESC`;
  console.log(sqlGetSearch);
  db.all(sqlGetSearch, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });

  db.close();
});

app.post("/tickets", urlencodedParser, (req, res) => {
  let db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });
  const input = [
    req.body.date,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.phoneNumber,
    req.body.brandModel,
    req.body.serial,
    req.body.issue,
    req.body.notes,
    req.body.employee,
  ];
  const sqlCreateTicket =
    "INSERT INTO tickets (date, first_name, last_name, email, phone_number, brand_model, serial, issue, notes, employee) VALUES(?,?,?,?,?,?,?,?,?,?)";
  db.run(sqlCreateTicket, input, (err) => {
    if (err) return console.error(err.message);
    console.log("ticket created.");
  });

  db.close();
});

app.patch("/tickets/:id", (req, res) => {
  let db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });

  const sqlUpdateTicket = "UPDATE tickets SET first_name WHERE id = ?";
  db.run(sqlUpdateTicket, ["zach", id], (err) => {
    if (err) return console.error(err.message);
    console.log("ticket updated");
  });

  db.close();
});

app.delete("/tickets/:id", (req, res) => {
  let db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });

  const sqlDelete = "DELETE FROM tickets WHERE id = ?";
  db.run(sqlDelete, req.params.id, (err) => {
    if (err) return console.error(err.message);
    console.log("ticket deleted");
  });

  db.close();
});

app.listen(port, () => {
  console.log(`server running and listening on port ${port}`);
});
