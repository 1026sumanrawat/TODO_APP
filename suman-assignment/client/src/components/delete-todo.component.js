import React , { Component } from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {
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
        axios.delete('http://localhost:4000/subscribers/' + this.props.match.params.id)
            .then( res => {
                console.log("Deleted")
            })
            .catch( err => console.log(err));
            this.props.history.push('/');
            
    }

    render(){
        
        return(
            <></>
        );
    }

}