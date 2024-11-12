import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="btn btn-light view">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="initially-hidden">
        {props.children}
        <button onClick={toggleVisibility} className="btn btn-secondary close">close</button>
      </div>
    </div>
  )

})

Togglable.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.any
}


Togglable.displayName = 'Togglable'
export default Togglable