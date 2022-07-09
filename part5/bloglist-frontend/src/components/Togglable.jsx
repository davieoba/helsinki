import { useState, forwardRef, useImperativeHandle } from "react"

export const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const show = { display: visibility ? 'none' : '' }
  const hide = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={show}>
        <button onClick={toggleVisibility}> {props.buttonLabel}</button>
      </div>

      <div style={hide}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})