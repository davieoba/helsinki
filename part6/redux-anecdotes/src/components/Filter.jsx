// import { useDispatch } from 'react-redux'
import { filterData } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch()
  const styles = {
    marginBottom: '20px'
  }

  const handleChange = (e) => {
    // console.log(e.target.value.trim() === '')

    if (e.target.value === '') {
      return props.filterData()
    }
    props.filterData(e.target.value.trim())

    // console.log(filter)

  }

  return (
    <div style={styles}>
      <input type="text" name="filter" id="filter" onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterData: filterData
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter