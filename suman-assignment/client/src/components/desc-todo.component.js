import React , { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditTodo extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            titleOfTask: '',
            description: '',
            createdDate: '',
            lastModifiedDate:'',
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
                    createdDate: res.data.createdDate,
                    todo_completed: res.data.todo_completed,
                    lastModifiedDate: res.data.lastModifiedDate
                })
            })
            .catch( err => console.log(err));
    }
    routechange=()=>{
       
    }
    render(){
        let data = this.state
        let edit = "/edit/"+ this.props.match.params.id
        return(
            <div>
                <h1>{data.titleOfTask}</h1>
                Create time: {data.createdDate}&nbsp; Update Time: {data.lastModifiedDate}
                <h4>Description:</h4>{data.description}
                <br/>
                <br/>
                <Link to={edit}>
                <input type="button" value="Edit" className="btn btn-primary" onClick = {this.routechange}  />
                </Link>
            </div>
            
        )
    }

}