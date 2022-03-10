//express setup
const express = require('express');
const app = express();
const port = 3000;

//sqlite setup
const sqlite3 = require('sqlite3').verbose();

app.use(express.static('public'));


app.get('/tickets', (req, res) => {
    let db = new sqlite3.Database('tickets.db', (err) => {
        if (err) return console.error(err.message);
        console.log("sqlite3 initialized");
    });

    const sqlGetAll = "SELECT * FROM Tickets";
    db.all(sqlGetAll, [], (err, rows) => {
        if (err) return console.error(err.message);
        res.send(rows);
    });

    db.close();
});

app.get('/tickets/:id', (req, res) => {
    const db = new sqlite3.Database('tickets.db', (err) => {
        if (err) return console.error(err.message);
        console.log("sqlite3 initialized");
    });

    const sqlGetById = "SELECT * FROM Tickets WHERE last_name = ? ORDER BY date DESC";
    db.all(sqlGetById, [req.params.id], (err, rows) => {
        if (err) return console.error(err.message);
        res.send(rows)
    });

    db.close();
});

app.post("/tickets", (req, res) => {
    let db = new sqlite3.Database('tickets.db', (err) => {
        if (err) return console.error(err.message);
        console.log("sqlite3 initialized");
    });

    const sqlCreateTicket = "INSERT INTO tickets (date, first_name, last_name, email, phone_number, brand_model, serial, issue, notes, employee) VALUES(?,?,?,?,?,?,?,?,?,?)";
    db.run(sqlCreateTicket, ['3/8/2022','harrison', 'favorite', 'hf@fake.com', '234432554', 'lenovo 300e', 'lro4324r', 'missing OS', 'N/A', 'Zach'], (err) => {
        if (err) return console.error(err.message);
        console.log('ticket created.')
    });

    db.close();
});

app.patch("/tickets/:id", (req, res) => {
    let db = new sqlite3.Database('tickets.db', (err) => {
        if (err) return console.error(err.message);
        console.log("sqlite3 initialized");
    });

    const sqlUpdateTicket = "UPDATE tickets SET first_name WHERE id = ?";
    db.run(sqlUpdateTicket, ['zach', id], (err) => {
        if (err) return console.error(err.message);
        console.log('ticket updated');
    });
    
    db.close();
});

app.delete("/tickets/:id", (req, res) => {
    let db = new sqlite3.Database('tickets.db', (err) => {
        if (err) return console.error(err.message);
        console.log("sqlite3 initialized");
    });

    const sqlDelete = 'DELETE FROM tickets WHERE id = ?';
    db.run(sqlDelete, req.params.id, (err) => {
        if (err) return console.error(err.message);
        console.log('ticket deleted');
    });

    db.close();
});

app.listen(port, () => {
    console.log(`server running and listening on port ${port}`);
});
