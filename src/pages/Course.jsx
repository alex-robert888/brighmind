import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const Courses = () => {
  const courses = useSelector(state => state.courses);
  const dispatch = useDispatch();

  return (
    <>
      <h1 className='text-blue-600'>COURSES PAGE</h1>

      <ul>
        {courses.map(course => (
          <li key={course.id} style={{ marginBottom: '1rem' }}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Courses
