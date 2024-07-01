import React, { useState } from 'react';

export const TodoForm = ({ addTodo, showModalWithMessage }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === "") {
      showModalWithMessage("Task cannot be empty or contain only spaces");
      return;
    }
    if (value.length > 100) {
      showModalWithMessage("Task cannot exceed 100 characters");
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type="text"
        className='todo-input'
        value={value}
        placeholder='What is the task for today?'
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='todo-btn'>Add Task</button>
    </form>
  );
};