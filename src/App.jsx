import React, { Component } from 'react'
import TodoList from './component/TodoList'
import Footer from './component/Footer'
import TodoHeader from './component/TodoHeader'
// import Router from 'react-router'
class App extends Component {
  state = {
    todos: [],
    isAllChecked: false,
    nowShowing: 'All',
    showTodos: [],
    type: 'all'
  }
  get todos () {
    const { type, todos } = this.state
    if (type === 'active') {
      return todos.filter(todo => !todo.isDone)
    }
    if (type === 'completed') {
      return todos.filter(todo => todo.isDone)
    }
    return todos.filter(todo => true)
  }

  addTodo = item => {
    const { todos } = this.state
    this.setState({
      todos: [...todos, item]
    }) // 设置状态
  }
  deleteTodo = index => {
    const { todos } = this.state
    todos.splice(index, 1)
    this.setState({
      todos: [...todos]
    })
  }
  changeTodoState = (index, isDone, isChangeAll = false) => {
    const { todos } = this.state
    if (isChangeAll) {
      this.setState({
        todos: [...todos].map(todo => {
          todo.isDone = isDone
          return todo
        }),
        isAllChecked: isDone
      })
    } else {
      todos[index].isDone = !isDone
      this.allChecked()
    }
  }
  allChecked = e => {
    const { todos } = this.state
    let isAllChecked = false
    if (todos.every(todo => todo.isDone)) {
      isAllChecked = true
    }
    this.setState({
      todos: [...todos],
      isAllChecked: isAllChecked
    })
  }
  changeAll = e => {
    this.changeTodoState(null, e.target.checked, true)
  }
  clearDone = e => {
    const { todos } = this.state
    let cleartodos = todos.filter(todo => !todo.isDone)
    this.setState({
      todos: cleartodos
    })
  }

  onSave = (text, id) => {
    const { todos } = this.state
    this.setState({
      todos: [...todos].map(todo => {
        if (todo.id === id) {
          todo.text = text
        }
        return todo
      })
    })
  }

  render () {
    const { todos, isAllChecked, type } = this.state
    let info = {
      isAllChecked,
      todoCount: todos.length || 0,
      todoDoneCount: (todos && todos.filter(todo => todo.isDone)).length
    }
    return (
      <React.Fragment>
        <section className='todoapp'>
          <TodoHeader addTodo={this.addTodo} />
          <section className='main'>
            <input
              id='toggle-all'
              className='toggle-all'
              type='checkbox'
              checked={this.isAllChecked}
              onChange={this.changeAll}
            />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <TodoList
              todos={todos}
              showTodos={this.todos}
              deleteTodo={this.deleteTodo}
              changeTodoState={this.changeTodoState}
              onSave={this.onSave}
            />
          </section>
          <Footer
            info={info}
            clearDone={this.clearDone}
            type={type}
            onChange={type => this.setState({ type })}
          />
        </section>
        <footer className='info'>
          <p>Double-click to edit a todo</p>
          <p>
            Template by
            <a href='http://sindresorhus.com'>Sindre Sorhus</a>
          </p>
          <p>
            Created by
            <a href='http://todomvc.com'>you</a>
          </p>
          <p>
            Part of
            <a href='http://todomvc.com'>TodoMVC</a>
          </p>
        </footer>
      </React.Fragment>
    )
  }
}

export default App
