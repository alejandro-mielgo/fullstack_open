import PropTypes from 'prop-types'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  if (messageType==='error') {
    return (
      <div className="alert alert-danger">
        {message}
      </div>
    )
  }

  if (messageType==='success') {
    return (
      <div className="alert alert-success">
        {message}
      </div>
    )
  }

}

Notification.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string
}

export default Notification