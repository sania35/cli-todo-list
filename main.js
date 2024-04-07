#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let todoQuestions = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add", "Read", "Update", "Delete", "Exit"]
        }
    ]);
    switch (todoQuestions.action) {
        case "Add":
            await addTask();
            break;
        case "Read":
            readTasks();
            break;
        case "Update":
            await updateTask();
            break;
        case "Delete":
            await deleteTask();
            break;
        case "Exit":
            condition = false;
            break;
    }
}
async function addTask() {
    let task = await inquirer.prompt({
        name: "task",
        type: "input",
        message: "What would you like to add to your todos?"
    });
    todos.push(task.task);
    console.log("Task added to todo list.");
}
function readTasks() {
    console.log("Todo list:");
    todos.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}
async function updateTask() {
    readTasks();
    let indexToUpdate = await inquirer.prompt({
        name: "index",
        type: "number",
        message: "Enter the index of the task you want to update:"
    });
    let updatedTask = await inquirer.prompt({
        name: "task",
        type: "input",
        message: "Enter the updated task:"
    });
    todos[indexToUpdate.index - 1] = updatedTask.task;
    console.log("Task updated.");
}
async function deleteTask() {
    readTasks();
    let indexToDelete = await inquirer.prompt({
        name: "index",
        type: "number",
        message: "Enter the index of the task you want to delete:"
    });
    todos.splice(indexToDelete.index - 1, 1);
    console.log("Task deleted from todo list.");
}
