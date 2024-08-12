import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Todo({ item, handleDone, handleDelete, handleEdit }) {
    return (
        <div
            className="todo flex justify-between my-2 items-center shadow-insetNeu rounded-md p-3"
        >
            <div className="todo-text flex items-center">
                <input
                    type="checkbox"
                    id={item.data}
                    checked={item.isCompleted}
                    onChange={() => handleDone(item.data)}
                />
                <label htmlFor={item.data} className="ml-2 text-xs">
                    {item.data}
                </label>
            </div>
            <div className="editing flex h-full">
                <button className="px-2 rounded-md mx-2 bg-primary text-xs sm:text-sm py-1"
                onClick={()=> handleEdit(item.data)}>
                    <FaRegEdit />
                </button>
                <button
                    className="px-2 rounded-md mx-2 bg-primary text-xs sm:text-sm py-1"
                    onClick={() => handleDelete(item.data)}
                >
                    <MdDelete />
                </button>
            </div>
        </div>
    )
}

export default Todo
