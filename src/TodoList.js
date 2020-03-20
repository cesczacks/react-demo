import React, { Component } from 'react'

class TodoListDisplayer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const todoList = this.props.todoList.map((todo, index) => {
            return (
                <span key={index}>
                    <li>{todo}</li>
                    <input type='button' onClick={() => {
                        alert('nb!');
                        this.props.handleDelete(index);
                    }} value="Remove"/>
                </span>
            );
        })

        return (
            <ul>
                {todoList}
            </ul>
        );
    }

}

class TodoForm extends Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            todo: ''
        };
    }

    handleClick() {
        this.props.handleAdd(this.state.todo);
        this.setState({
            todo: ''
        })
    }

    handleInputChange(event) {
        this.setState({
            todo: event.target.value
        });
    }

    handleKeyPress(event){
        if(event.which === 13){
            this.handleClick();
        }
    }
    
    render() {
        return (
            <div>
                <input type='text' onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} value={this.state.todo}></input>
                <input type='button' value='Add' onClick={this.handleClick}></input>
            </div>
        );
    }
}

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                'Washing hands',
                'Walking dogs',
                'Drinking milk'
            ]
        }
        this.AddItem = this.AddItem.bind(this);
        this.RemoveItem = this.RemoveItem.bind(this);
    }

    RemoveItem(index) {
        const todoList = this.state.todoList;

        this.setState({
            todoList: todoList.filter((item, i) => {
                return i !== index;
            })
        })
    }

    AddItem(item) {
        this.setState({
            todoList: [...this.state.todoList, item]
        });
    }

    render() {
        const newTodo = this.state.todoList;
        return (
            <div>
                <TodoListDisplayer todoList={newTodo} handleDelete={this.RemoveItem}/>
                <TodoForm handleAdd={this.AddItem}/>
            </div>
        );
    }

}

export default TodoList
