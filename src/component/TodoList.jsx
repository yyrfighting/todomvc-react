import React, { PureComponent } from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from 'prop-types'

class TodoList extends PureComponent {
  static propTypes = {
    todos: PropTypes.array,
    showTodos: PropTypes.array
  }

  render () {
    const { showTodos } = this.props
    // console.log(showTodos)
    return (
      <ul className='todo-list'>
        {showTodos.map((todos, index) => (
          <TodoListItem
            id={todos.id}
            text={todos.text}
            isDone={todos.isDone}
            index={index}
            {...this.props}
            key={todos.id}
          />
        ))}
      </ul>
    )
  }
}

export default TodoList
