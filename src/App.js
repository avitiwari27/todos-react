import React, { useState, useEffect } from "react";
import "./App.css";

// const Todo = ({ todo }) => <div className="todo">{todo.text}</div>;

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button
          style={{ background: "green", color: "white" }}
          onClick={() => completeTodo(index)}
        >
          Complete
        </button>
        <button
          style={{ background: "red", color: "white" }}
          onClick={() => removeTodo(index)}
        >
          X
        </button>
      </div>
    </div>
  );
}

// To add new todo in the list (with form)

function TodoForm({ addTodo }) {
  const [value, setValue] = useState(""); // value to store state, setValue to define how

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [tasksRemaining, setTasksRemaining] = useState(1);
  const [completedTask, setCompletedTask] = useState(0);
  const [todos, setTodos] = useState([
    //{ text: "Learn about React", isCompleted: false },
    //{ text: "Meet friend for lunch", isCompleted: false },
    //{ text: "Go out for snacks", isCompleted: false }
  ]);

  // The first parameter, todos, is what we are going to name our state.
  // The second parameter, setTodos, is what we are going to use to set the state.

  // update task remaining, i.e. todos with isComplete: false
  useEffect(() => {
    setTasksRemaining(todos.filter(todo => !todo.isCompleted).length);
    setCompletedTask(todos.filter(todos => todos.isCompleted).length);
  });
  useEffect(() => {});

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    //if (newTodos[index].isCompleted === true) {
    //  newTodos[index].isCompleted = false;
    //} else {
    //  newTodos[index].isCompleted = true;
    // }
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // we'll render our todos here ...
  // return <div></div>

  // prob1

  return (
    <div className="app">
      <div className="header">Pending task ({tasksRemaining})</div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <div className="create-task">
          <TodoForm addTodo={addTodo} />
        </div>
        <div className="todo-list">Completed task ({completedTask})</div>
      </div>
    </div>
  );
}

export default App;
