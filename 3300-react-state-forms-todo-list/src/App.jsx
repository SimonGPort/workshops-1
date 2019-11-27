import React, { Component } from "react";
import TodoList from "./TodoList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [<TodoList />]
    };
  }
  handleAddTodoList = () => {
    // const listName = window.prompt("What is the name of the list?");
    this.setState({ todoLists: this.state.todoLists.concat(<TodoList />) });
  };
  render() {
    return (
      <>
        {this.state.todoLists}
        <button onClick={this.handleAddTodoList}>Add list</button>
      </>
    );
  }
}
export default App;
