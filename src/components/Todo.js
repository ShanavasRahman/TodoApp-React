import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task,toggleComplete,deleteTodo,editTodo}) => {
  return (
      <div className='Todo'>
          {console.log(task)}
          <p onClick={() => toggleComplete(task.id)}
              className={`${task.completed?'completed':""}`}
          >{task.task}</p>
          <div>
              <FontAwesomeIcon icon={faPenToSquare} onClick={()=>editTodo(task.id)} />
              <FontAwesomeIcon icon={faTrash} onClick={()=>deleteTodo(task.id)} />
          </div>
    </div>
  )
}
