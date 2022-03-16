import React, { useEffect, useState } from 'react'
import api from '../../axiosConfig'

// import home components
import CoursesSlider from './components/coursesSlider/CoursesSlider'
import Header from './components/header/Header'


const Home = () => {

  const [courses, setcourses] = useState([])



  useEffect(async () => {
    const courses = await api.get("/cours/1");
    setcourses(courses.data);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <CoursesSlider course={courses} />
    </>

  )
}

export default Home