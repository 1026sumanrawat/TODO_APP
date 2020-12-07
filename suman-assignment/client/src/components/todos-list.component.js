import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = props => (
    
    <tr>
        <td className = { props.todo.todo_completed ? 'completed' : ''}><Link  to={"/desc/" + props.todo._id}>{props.todo.titleOfTask}</Link></td>
        {/* <td className = { props.todo.todo_completed ? 'completed' : ''}>{props.todo.description}</td> */}
        {/* <td className = { props.todo.todo_completed ? 'completed' : ''}>{props.todo.createdDate}</td> */}
        {/* <td className = { props.todo.todo_completed ? 'completed' : ''}>{props.todo.lastModifiedDate}</td> */}
        <td>
            <Link to={"/edit/" + props.todo._id}><input type="button" value="Edit" className="btn btn-warning" /></Link>
        </td>   
        <td><Link to={"/delete/" + props.todo._id}><input type="button" value="Delete" className="btn btn-danger" /></Link></td>
    </tr>
)


export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/subscribers')
            .then( res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch( err => console.log(err));
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/subscribers')
            .then( res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch( err => console.log(err));
    }

    todoList = () => this.state.todos.map(
        (todo, index) => <Todo todo={todo} key={index} />
    )
    

    render() {

        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            {/* <th>Description</th> */}
                            {/* <th>Create Date</th> */}
                            {/* <th>Last updated</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}