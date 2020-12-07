import React , { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            titleOfTask: '',
            description: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:4000/subscribers/' + this.props.match.params.id)
            .then( res => {
                this.setState({
                    titleOfTask: res.data.titleOfTask,
                    description: res.data.description,
                    todo_priority: res.data.todo_priority,
                    todo_completed: res.data.todo_completed
                })
            })
            .catch( err => console.log(err));
    }

    onChangeTodoDescription = (e) => {
        this.setState({
            titleOfTask: e.target.value
        });
    }

    onChangeTodoResponsible = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTodoPriority = (e) => {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted = (e) => {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.todo_completed)
        const obj = {
            titleOfTask: this.state.titleOfTask,
            description: this.state.description,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        axios.patch('http://localhost:4000/subscribers/' + this.props.match.params.id, obj)
            .then( res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Tasks</h3>
                <form onSubmit={this.onSubmit}>
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
                    
                    <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeTodoCompleted}
                                    checked={this.state.todo_completed}
                                    value={this.state.todo_completed}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                </form>
            </div>
        )
    }
}