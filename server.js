//express setup
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

//sqlite setup
const sqlite3 = require("sqlite3").verbose();

//body-parser
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

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

app.get("/tickets/:id", (req, res) => {
  const db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });

  const wildcard = req.params.id;
  const sqlGetSearch = `SELECT * FROM Tickets WHERE "${wildcard}" IN (first_name, last_name, email, phone_number, employee, id) ORDER BY date DESC`;
  console.log(sqlGetSearch);
  db.all(sqlGetSearch, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });

  db.close();
});

app.get("/tickets/byID/:id", (req, res) => {
  const db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });

  const wildcard = req.params.id;
  const sqlGetSearch = `SELECT * FROM Tickets WHERE ${wildcard} IN (id)`;
  console.log(sqlGetSearch);
  db.all(sqlGetSearch, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });

  db.close();
});

app.post("/tickets", jsonParser, (req, res) => {
  let db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sql initialized");
  });
  console.log(req);
  const data = req.body;
  console.log(data);
  const input = [
    data.date,
    data.firstName,
    data.lastName,
    data.email,
    data.phoneNumber,
    data.brandModel,
    data.serial,
    data.issue,
    data.notes,
    data.employee,
    "open",
  ];

  const sqlCreateTicket =
    "INSERT INTO tickets (date, first_name, last_name, email, phone_number, brand_model, serial, issue, notes, employee, status) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  db.run(sqlCreateTicket, input, (err) => {
    if (err) return console.error(err.message);
    res.send(`Ticket created with the values ${input}`);
  });

  db.close();
});

app.patch("/tickets/:id", jsonParser, (req, res) => {
  let db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });
  const id = req.params.id;
  const column = req.body.column;
  const replacementValue = req.body.value;
  const sqlUpdateTicket = `UPDATE tickets SET ${column} = ? WHERE ${id} in (id)`;

  console.log(sqlUpdateTicket, replacementValue);
  db.run(sqlUpdateTicket, [replacementValue], (err) => {
    if (err) return console.error(err.message);
    res.send(
      JSON.stringify(
        `${column} succesfully updated with the value: ${replacementValue}`
      )
    );
  });
  db.close();
});

app.delete("/tickets/:id", (req, res) => {
  let db = new sqlite3.Database("tickets.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized");
  });

  const sqlDelete = `DELETE FROM Tickets WHERE ${req.params.id} in (id)`;
  db.run(sqlDelete, (err) => {
    if (err) return console.error(err.message);
    res.send(`ticket with the id ${req.params.id} deleted`);
  });
  console.log(`ticket with the id ${req.params.id} deleted`);
  db.close();
});

app.listen(port, () => {
  console.log(`server running and listening on port ${port}`);
});
