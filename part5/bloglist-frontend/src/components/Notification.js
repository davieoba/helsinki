import { PropTypes } from 'prop-types'

const Notification = ({ message, classProp }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classProp}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  classProp: PropTypes.string.isRequired
}

export default Notification

