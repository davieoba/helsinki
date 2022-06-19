
export const Filter = ({ handleFilter }) => {
    return (
        <>
            <p>filter shown with</p>
            <input type='text' onChange={handleFilter} className='input_filter' />
        </>
    )
}

