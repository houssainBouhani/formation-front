import React, { useEffect, useState } from 'react'
import api from '../../../axiosConfig'

//dashboard header
import Header from './components/header/Header'
import Users from './Users'



const Dashboard =  () => {

  const [users, setusers] = useState([])

  useEffect(async () => {
    const {data}  = await api.get("/users/");
    setusers(data);
  }, [])
  

  return (
      <div className='container-fluid p-4'>
           <Header/>
           <Users users={users} />
      </div>
 
  )
}

export default Dashboard