import { useDispatch } from 'react-redux'
import { filterData } from '../reducers/filterReducer'

export const Filter = () => {
  const dispatch = useDispatch()
  const styles = {
    marginBottom: '20px'
  }

  const handleChange = (e) => {
    // console.log(e.target.value.trim() === '')

    if (e.target.value === '') {
      return dispatch(filterData())
    }
    dispatch(filterData(e.target.value.trim()))

    // console.log(filter)

  }

  return (
    <div style={styles}>
      <input type="text" name="filter" id="filter" onChange={handleChange} />
    </div>
  )
}
