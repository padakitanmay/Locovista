import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todo, setTodo] = useState([]);
    const { addTodo } = useTodo();

    const add = (eve) => {
        eve.preventDefault();
        if (!todo) return;
        addTodo({ todo, completed: false });
        setTodo("");
    };
    return (
        <form className='flex bg-white rounded-xl justify-center' onSubmit={add}>
            <input
                type='text'
                placeholder='Give your contribution'
                className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white py-1.5'
                value={todo}
                onChange={(eve) => setTodo(eve.target.value)}
            />
            <button
                type='submit'
                className='w-full rounded-r-lg px-3 py-1 bg-white text-black shrink-0 border'
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
