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
    //command add new to do item with a high priorty: 
        //curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"task": "Complete Express assignment", "priority": "high"}'
    //command to retrieve all to do items: 
        //curl http://localhost:3000/todos

//Questio 2:
// PUT /todos/complete-all - Mark all to-do items as completed
app.put('/todos/complete-all', (req, res) => {
    todos.forEach(todo => {
        todo.completed = true; // Set each to-do's completed status to true
    });
    res.json({ message: "All to-do items have been marked as completed." });
});

//note: testing the "Complete All" functionality
    //comand to add some to-do items with completed: false:
        //curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"task": "Task 1", "completed": false}'
        //curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"task": "Task 2", "completed": false}'
    //commadnt to markk all to do items as complted:
        //curl -X PUT http://localhost:3000/todos/complete-all
    // command to retrieve all to-do items to verify:
        //curl http://localhost:3000/todos



