
export const PersonForm = ({ handleSubmit, userNameValue, handleChange, userPhoneValue }) => {

    return (
        <>
            <form onSubmit={handleSubmit} className='form_add' autoComplete='off'>
                <div className="form_group">
                    <label htmlFor="name">name:</label>
                    <input id='name' value={userNameValue} onChange={handleChange} name='username' className="input_add" />
                </div>

                <div className="form_group">
                    <label htmlFor="number"> number:</label>
                    <input id='number' value={userPhoneValue} onChange={handleChange} name='phone' className="input_add" />
                </div>

                <div>
                    <button type="submit" className="btn_add">add</button>
                </div>
            </form>
        </>
    )
}

