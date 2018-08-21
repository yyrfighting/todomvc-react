import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Footer extends PureComponent {
  static propTypes = {
    info: PropTypes.object,
    clearDone: PropTypes.func,
    type: PropTypes.string,
    onChange: PropTypes.func
  }

  deleteAll = e => {
    const { clearDone } = this.props
    clearDone()
  }

  handleOnchange = type => {
    const { onChange = () => {} } = this.props
    onChange(type)
  }
  render () {
    const { info, type } = this.props
    let count = info.todoCount - info.todoDoneCount
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{count}</strong> item left
        </span>
        <ul className='filters'>
          <li>
            <a
              href='#/'
              className={classNames({ selected: type === 'all' })}
              onClick={() => this.handleOnchange('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              href='#/active'
              className={classNames({ selected: type === 'active' })}
              onClick={() => this.handleOnchange('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href='#/completed'
              className={classNames({ selected: type === 'completed' })}
              onClick={() => this.handleOnchange('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        <button className='clear-completed' onClick={this.deleteAll}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer
