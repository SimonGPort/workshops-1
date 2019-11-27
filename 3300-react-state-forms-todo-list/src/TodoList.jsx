import React, { Component } from "react";
class TodoList extends Component {
  constructor() {
    super();
    console.log("Instantiating");
    this.state = {
      listName: undefined,
      allTodos: [],
      userInput: "",
      timeInput: "",
      searchInput: "",
      deleteIndex: -1
    };
  }
  componentDidMount() {
    console.log("After the first render");
    let nameEntered = window.prompt("What is the name of the list?");
    console.log("This is what the user entered", nameEntered);
    this.setState({ listName: nameEntered });
  }
  onUserInputChange = event => {
    console.log("New string in input box ", event.target.value);
    this.setState({ userInput: event.target.value });
  };
  onTimeInputChange = event => {
    this.setState({ timeInput: event.target.value });
  };
  handleSearchInputChange = event => {
    this.setState({ searchInput: event.target.value });
  };
  handleClear = () => {
    this.setState({ allTodos: [] });
  };
  handleTitleChange = () => {
    const nameEntered = window.prompt("What is the name of the list?");
    this.setState({ listName: nameEntered });
  };
  handleRemoveFirst = () => {
    this.setState({ allTodos: this.state.allTodos.slice(1) });
  };
  handleReverseTodos = () => {
    this.setState({ allTodos: this.state.allTodos.slice().reverse() });
  };
  handleDeleteTodo = () => {
    const todoIdx = window.prompt("What is the todo to delete?");
    const todosCopy = this.state.allTodos.slice();
    todosCopy.splice(todoIdx - 1, 1);
    this.setState({ allTodos: todosCopy });
  };
  handleDeleteSearchResults = () => {
    this.setState({
      allTodos: this.state.allTodos.filter(
        todo => !todo.content.includes(this.state.searchInput)
      )
    });
  };
  submitHandler = event => {
    console.log("Form submitted");
    event.preventDefault();
    this.setState({
      userInput: "",
      timeInput: "",
      allTodos: this.state.allTodos.concat({
        content: this.state.userInput,
        time: this.state.timeInput
      })
    });
  };
  render() {
    console.log("Rendering with state", this.state);
    if (!this.state.listName) {
      return <div> loading ... </div>;
    }
    return (
      <div>
        <h1 className="list-title">{this.state.listName}</h1>
        <ol>
          {this.state.allTodos
            .filter(todo => todo.content.includes(this.state.searchInput))
            .map(x => (
              <li>
                {x.time}: {x.content}
              </li>
            ))}
        </ol>
        <form onSubmit={this.submitHandler}>
          <div>
            <h3>Add todo</h3>
            <label>
              Todo element
              <input
                type="text"
                onChange={this.onUserInputChange}
                value={this.state.userInput}
              />
            </label>
            <label>
              Todo time
              <input
                type="time"
                onChange={this.onTimeInputChange}
                value={this.state.timeInput}
              />
            </label>
          </div>
          <div>
            <h3>Search todos</h3>
            <input
              type="text"
              onChange={this.handleSearchInputChange}
              value={this.state.searchInput}
            />
          </div>
          <div className="list-actions">
            <button type="button" onClick={this.handleClear}>
              Clear
            </button>
            <button type="button" onClick={this.handleTitleChange}>
              Change title
            </button>
            <button type="button" onClick={this.handleRemoveFirst}>
              Remove first
            </button>
            <button type="button" onClick={this.handleReverseTodos}>
              Reverse todos
            </button>
            <button type="button" onClick={this.handleDeleteTodo}>
              Delete todo
            </button>
            <button type="button" onClick={this.handleDeleteSearchResults}>
              Delete search results
            </button>
          </div>

          <input type="submit"></input>
        </form>
      </div>
    );
  }
}
export default TodoList;
