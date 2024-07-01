import React, { useState } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { Modal } from './ModalComponent';
import { ConfirmationModal } from './ConfirmationModal';
import './../Modal.css';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
  
    const addTodo = (todo) => {
        if (todos.some(t => t.task.toLowerCase() === todo.toLowerCase())) {
            setModalMessage("Task already exists in the list!");
            setShowModal(true);
            return;
        }
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    };
  
    const toggleComplete = id => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
  
    const confirmDeleteTodo = (id) => {
        setTodoToDelete(id);
        setShowConfirmModal(true);
    };
  
    const deleteTodo = () => {
        setTodos(todos.filter(todo => todo.id !== todoToDelete));
        setShowConfirmModal(false);
        setTodoToDelete(null);
    };
  
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };
  
    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, task, isEditing: !todo.isEditing
        } : todo));
    };
  
    const showModalWithMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };
  
    return (
        <div className='TodoWrapper'>
            <h1>Todo List✅</h1>
            <TodoForm addTodo={addTodo} showModalWithMessage={showModalWithMessage} />
            {todos.reverse().map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={() => confirmDeleteTodo(todo.id)} editTodo={editTodo} />
                )
            ))}
            <Modal 
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)}
            />
            <ConfirmationModal 
                show={showConfirmModal}
                message="Are you sure you want to delete this task?"
                onConfirm={deleteTodo}
                onCancel={() => setShowConfirmModal(false)}
            />
        </div>
    );
};
