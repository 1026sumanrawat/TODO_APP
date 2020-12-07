import React , { Component } from 'react';
import axios from 'axios';


export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titleOfTask: '',
            description: '',
            todo_priority: '',
            dueDate:'',
            todo_completed: false
        }
    }

    onChangeTodoDescription = e => {
        this.setState({ titleOfTask: e.target.value });
    }

    onChangeTodoResponsible = e => {
        this.setState({ description: e.target.value });
    }

    onChangeTodoPriority = e => {
        this.setState({ todo_priority: e.target.value });
    }
    onChangeTodoDatePicker = e => {
        this.setState({ dueDate: e.target.selected });
    }

    onSubmit = e => {
        e.preventDefault();

        // SUBMIT LOGIC NEED TO BE IMPLEMENTED HERE
        console.log('Form submitteed:');
        console.log(`Todo Description: ${this.state.titleOfTask}`);
        console.log(`Todo Responsible: ${this.state.description}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const newTodo = {
            titleOfTask: this.state.titleOfTask,
            description: this.state.description,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        axios.post('http://localhost:4000/subscribers', newTodo)
            .then( res => console.log(res.data));
        
        this.setState({
            titleOfTask: '',
            description: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Tasks</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.titleOfTask}
                                onChange={this.onChangeTodoDescription}
                                />

                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeTodoResponsible}
                                />
                                
                    </div>
                    
                    
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}