import { useState } from "react"
import { Link } from "react-router-dom"

import StyleTodoslist from "./styleTodosList.js"


export default function ShowTodoslist() {
  return (
    <StyleTodoslist className={"todosList"}>
      
        <h1 className='text-center mt-7 text-2xl font-semibold'>
          Your Listings
        </h1>
      <li>

      </li>
        {userTodoslist && userTodoslist.length > 0 && userTodoslist.map((todo) => (
          <Link to={`/todoslist/${todo._id}`} key={todo._id}>
            <li className='text-center mt-7 text-2xl font-semibold'>{todo.title}</li>
          </Link>
          ))
        }

      
    </StyleTodoslist>
  )
}
