
export const Persons = ({ render, handleDelete }) => {

    const el = render?.map((el) => {

        return <div key={el.id} className='test'>
            <li> {el.name} {el.number}</li>
            <button className="btn_del" onClick={() => handleDelete(el.id)}>delete</button>
        </div>
    })

    return <>{el}</>
}

