import React, { useState } from 'react';

function TodoRow({ todo }) {
    return (
            <>
            <td key={todo.index}>{todo.index}</td><td>{todo.desc}</td><td>{todo.date}</td>
            </>
    );
}

const Todolist = () => {
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [todos, setTodos] = useState([
        {
            index: 0,
            desc: "Do something",
            date: "2020-02-19"
        },
        {
            index: 1,
            desc: "Do something new",
            date: "2020-02-19"
        },
        {
            index: 2,
            desc: "Do more",
            date: "2020-02-19"
        }
    ]);

    const addTodo = (desc, date) => {
        var max_id = Math.max.apply(Math, todos.map(function(o) { return o.index; }));
        //var max_id = todos.reduce((prev, current) => (prev.index > current.index) ? prev : current, 1)
        max_id = max_id + 1;
        console.log("new todo: "+max_id, desc, date );
        const newTodos = [...todos, { max_id, desc, date }];
        setTodos(newTodos);
    };

    const handleSubmit = event => {
        console.log(desc, date);
        event.preventDefault();
        if (!desc) return;
        addTodo(desc, date);
    };

    const handleDelete = index => {
        console.log("delete:" + index);
        const newTodos = todos.filter((todo, i) => i !== index);
        console.log(newTodos);
        setTodos(newTodos);
    }

    const inputChanged = (event) => {
        setDesc(event.target.value);
    }

    const dateChanged = (event) => {
        setDate(event.target.value);
    }

    return (
        <div >
            <form className="pure-form " onSubmit={handleSubmit}><fieldset>
                <legend>Add a todo item:</legend>
                Description: 
                <input type="text" placeholder="Description" onChange={inputChanged} value={desc}/>
                Date: 
                <input type="date" onChange={dateChanged} value={date}/>
                <button type="submit" className="pure-button pure-button-primary">Add</button>
            </fieldset></form>
            <table className="pure-table pure-table-horizontal">
                <thead>
                    <tr><th>Id</th><th>Description</th><th>Date</th><th>Actions</th></tr> 
                </thead>
                <tbody>                  
                    {todos.map((todo, index) => (
                        <tr>
                            <TodoRow todo={todo} index={index} key={index} />
                            <td><button onClick={() => handleDelete(todo.index)} className="pure-button pure-button-primary">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Todolist;