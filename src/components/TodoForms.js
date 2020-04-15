import React, { useState } from "react";

// To add new todo in the list (with form)

function TodoForm({ addTodo }) {
  const [value, setValue] = useState(""); // value to store state, setValue to define how

  const handleSubmit = (e) => {
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
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
