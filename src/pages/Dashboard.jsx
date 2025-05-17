      
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const Dashboard = () => {
  const courses = useSelector(state => state.courses);
  const dispatch = useDispatch();
  

  return (
    <>
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
export default Dashboard