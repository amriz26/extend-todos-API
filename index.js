// Question 1:  add a "Priority" field to the To-Do API
//POST /todos - add a new to-do item with priority
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


//Questio 2: Implement a "Complete All" Endpoint
// PUT /todos/complete-all - mark all to-do items as completed
app.put('/todos/complete-all', (req, res) => {
    todos.forEach(todo => {
        todo.completed = true; // set each to-do's completed status to true
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


//Question 3: filter To-Do items by completion status
// GET /todos - Retrieve to-do items, optionally filtered by completion status
app.get('/todos', (req, res) => {
    const { completed } = req.query;
    
    if (completed === "true" || completed === "false") {
        const isCompleted = completed === "true"; // Convert to boolean
        const filteredTodos = todos.filter(todo => todo.completed === isCompleted);
        res.json(filteredTodos);
    } else {
        res.json(todos); // Return all items if completed parameter is not provided
    }
});

//note: testing the "Complete All" functionality
    //command to add some completed / uncompleted To-Do items:
        //curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"task": "Task 1", "completed": false}'
        //curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"task": "Task 2", "completed": true}'
    //retreive only completed To-Do items:
        //curl http://localhost:3000/todos?completed=true
    //retrieve only uncompleted To-Do items:
        //curl http://localhost:3000/todos?completed=false






