
// header component
const Header = (props) => {
    return <h1>{props.text}</h1>
}

// part component
const Part = ({ name, excercise }) => {
    return (
        <>
            <li>{name} {excercise}</li>
        </>
    )
}

// content of the course component
const Content = ({ props }) => {
    return (
        <ul>
            {props.map((el) => {
                return <Part key={el.id} name={el.name} excercise={el.exercises} />
            })}
        </ul>
    )
}

// total component
const Total = ({ props }) => {
    const arrTotal = props.map(el => {
        return el.exercises
    })

    const total = arrTotal.reduce((prev, curr) => {
        return prev + curr
    }, 0)



    return <h4>Total of {total} exercises</h4>
}

// course component
const Course = ({ course }) => {
    return course.map((el) => {
        return (
            <div key={el.id}>
                <Header text={el.name} />
                <Content props={el.parts} />
                <Total props={el.parts} />
            </div>
        )
    })

}

export default Course