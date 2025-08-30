let todoArray = [];
let nextId = 1;

function addOne(task, completed, dueDate){
    if (!task || !dueDate) {
        return false;
    }
    
    const newTodo = {
        id: nextId++, // Assigns a unique id and increments it
        task,
        completed,
        dueDate,
    };
    
    todoArray.push(newTodo); // Adds the new todo to the array
    return newTodo; // Returns the added todo object
    }

function getAll() {
    return todoArray;
}

function findById(id) {
    const numericId = Number(id); // Converts the ID to a number
    const todo = todoArray.find(item => item.id === numericId); // Finds the todo with the matching ID
    return todo || false; // Returns the todo or false if not found
}

function updateOneById(id, updatedData) {
    const todo = findById(id);
    if (todo) {
        // Update properties only if they are provided in updatedData
        if (updatedData.task) todo.task = updatedData.task;
        if (updatedData.completed !== undefined) todo.completed = updatedData.completed;
        if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
        return todo; // Returns the updated todo object
    }
    return false; // Returns false if the todo with the provided ID is not found
}

function deleteOneById(id) {
    const todo = findById(id);
    if (todo) {
        const initialLength = todoArray.length;
        todoArray = todoArray.filter(todo => todo.id !== Number(id)); // Filters out the todo with the matching ID
        return todoArray.length < initialLength; // Returns true if the array length decreased, indicating successful deletion
    }
    return false; // Returns false if the todo was not found
}

if (require.main === module) {
    // Add todos
    console.log(addOne("Buy groceries", false, "2023-10-01"));
    console.log(addOne("Walk the dog", false, "2023-10-02"));

    console.log("getAll called:", getAll());

    // Find by ID
    console.log("findById(1) called:", findById(1));

    // Update by ID
    console.log("updateOneById(1) called:", updateOneById(1, { completed: true }));

    // Delete by ID
    console.log("deleteOneById(2) called:", deleteOneById(2));

    console.log("Final todo list:", getAll());
}