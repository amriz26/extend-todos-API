const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

// initialize SQLite database
const db = new sqlite3.Database(':memory:'); // use inmemory database for simplicity

// Create todos table
db.serialize(() => {
    db.run(`CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0,
        priority TEXT NOT NULL DEFAULT 'medium'
    )`);
});

// POST /todos - ccreate a new to-do item with priority
app.post('/todos', (req, res) => {
    const { task, priority = "medium" } = req.body;
    db.run(`INSERT INTO todos (task, priority, completed) VALUES (?, ?, 0)`, [task, priority], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, task, completed: false, priority });
    });
});

// GET /todos - retrieve all to-do items, optionally filtered by completion status
app.get('/todos', (req, res) => {
    const { completed } = req.query;
    let query = 'SELECT * FROM todos';
    let params = [];

    if (completed === "true" || completed === "false") {
        query += ' WHERE completed = ?';
        params.push(completed === "true" ? 1 : 0); // SQLite uses 1 and 0 for boolean values
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// PUT /todos/complete-all - mark all to-do items as completed
app.put('/todos/complete-all', (req, res) => {
    db.run(`UPDATE todos SET completed = 1`, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "All to-do items have been marked as completed." });
    });
});

// DELETE /todos/:id - delete a to-do item by ID
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM todos WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "To-do item not found" });
        res.json({ message: `To-do item with ID ${id} deleted successfully.` });
    });
});

// sstart the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
