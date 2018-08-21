import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

class TodoListItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    index: PropTypes.number,
    isDone: PropTypes.bool,
    deleteTodo: PropTypes.func,
    changeTodoState: PropTypes.func,
    onSave: PropTypes.func
  }

  state = {
    editing: false,
    editText: this.props.text
  }

  handleChange = e => {
    const { changeTodoState, isDone, index } = this.props
    changeTodoState(index, isDone)
  }
  onDestroy = e => {
    const { deleteTodo, index } = this.props
    deleteTodo(index)
  }
  handleSubmit = e => {
    const { onSave, deleteTodo, id } = this.props
    // console.log('id:' + id)
    const { editText } = this.state
    if (editText) {
      onSave(editText, id)
      this.setState({ text: editText, editing: false })
    } else {
      deleteTodo()
    }
  }
  handleEdit = e => {
    const { editText } = this.state
    this.setState({
      editText: editText,
      editing: true
    })
  }
  handleEditChange = e => {
    const { editing } = this.state
    if (editing) {
      this.setState({
        editText: e.target.value
      })
    }
  }
  handleKeyDown = e => {
    const { editText } = this.state
    // ESCAPE_KEY=27 ENTER_KEY=13
    if (e.keyCode === 27) {
      this.setState({ editText: editText })
    } else if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }
  componentDidUpdate = e => {
    this.editField.focus()
  }
  render () {
    const { text, isDone } = this.props
    const { editing, editText } = this.state
    let classNames = `${isDone ? 'completed' : ''} ${editing ? 'editing' : ''}`
    return (
      <li className={classNames}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={isDone}
            onChange={this.handleChange}
          />
          <label onDoubleClick={this.handleEdit}>{text}</label>
          <button className='destroy' onClick={this.onDestroy} />
        </div>
        <input
          ref={node => {
            this.editField = node
          }}
          className='edit'
          value={editText}
          onBlur={this.handleSubmit}
          onChange={this.handleEditChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    )
  }
}

export default TodoListItem
