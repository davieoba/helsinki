

export const Notification = ({ message, classProp }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={classProp}>
            {message}
        </div>
    )
}