import React, { useState } from 'react';

function TodoRow({ todo }) {
    return (
            <tr>
            <td key={todo.index}>{todo.index}</td><td>{todo.desc}</td><td>{todo.date}</td>
            </tr>
    );
}

const Todolist = () => {
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [todos, setTodos] = useState([
        {
            desc: "Do something",
            date: "2020-02-19"
        },
        {
            desc: "Do something new",
            date: "2020-02-19"
        },
        {
            desc: "Do more",
            date: "2020-02-19"
        }
    ]);

    const addTodo = (desc, date) => {
        const newTodos = [...todos, { desc, date }];
        setTodos(newTodos);
    };

    const handleSubmit = event => {
        console.log(desc, date);
        event.preventDefault();
        if (!desc) return;
        addTodo(desc, date);
    }

    const inputChanged = (event) => {
        setDesc(event.target.value);
    }

    const dateChanged = (event) => {
        setDate(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={inputChanged} value={desc}/>
                <input type="date" onChange={dateChanged} value={date}/>
                <input type="submit" value="Add"/>
            </form>
            <table>
            <tbody>
                {todos.map((todo, index) => (
                            <TodoRow todo={todo} index={index} key={index} />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Todolist;