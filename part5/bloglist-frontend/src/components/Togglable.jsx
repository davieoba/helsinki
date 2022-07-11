import { useState, forwardRef, useImperativeHandle } from "react"

export const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const show = { display: visibility ? 'none' : '' }
  const hide = { display: visibility ? '' : 'none' }

  // @note I want to expose this function here so that the blogForm component can call it as well
  const toggleVisibility = () => {
    // setVisibility(!visibility)
    setVisibility(prev => !prev)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
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