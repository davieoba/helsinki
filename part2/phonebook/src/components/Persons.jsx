
export const Persons = ({ render }) => {
    return (
        <>
            {render.map((el, i) => {
                return <li key={el.name}> {el.name} {el.number}</li>
            })}
        </>
    )
}

