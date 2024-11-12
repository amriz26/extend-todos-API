// Question 1: POST /todos - add a new to-do item with priority
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false,
        priority: req.body.priority || "medium" // set default priority to "medium"
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos - retrieve all to-do items with priority
app.get('/todos', (req, res) => {
    res.json(todos); // 'todos' array already contains the 'priority' field
});

//note: testing new functionality w/ commands 
    //command add new to do item with a high priorty: curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"task": "Complete Express assignment", "priority": "high"}'
    //command to retrieve all to do items: curl http://localhost:3000/todos
