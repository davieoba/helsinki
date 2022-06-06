
export const PersonForm = ({ handleSubmit, userNameValue, handleChange, userPhoneValue }) => {

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="name">name:</label>
                    <input id='name' value={userNameValue} onChange={handleChange} name='username' />
                </div>

                <div>
                    <label htmlFor="number"> number:</label>
                    <input id='number' value={userPhoneValue} onChange={handleChange} name='phone' />
                </div>

                <div>
                    <button type="submit" >add</button>
                </div>
            </form>
        </>
    )
}

