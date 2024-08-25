import React, { useState,useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

export default function Detail() {
    const {id} = useParams()
    const [name, setName]=useState()
    const [email, setEmail]=useState()
    const [age, setAge]=useState()
    const [city, setCity]=useState()
    //const [password, setPassword]=useState()

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('https://employee-mern-api.vercel.app/getuser/'+id)
        .then(result=>{
            console.log(result)
            setName(result.data.name)
            setEmail(result.data.email)
            //setPassword(result.data.password)
            setAge(result.data.age)
            setCity(result.data.city)
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <div>
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='w-50 bg-white rounded p-4'>
                <form>
                    <h2>Employee detail</h2>
                    <div className='mt-2'>
                        <label for='name' className='mb-2'>Name</label>
                        <input type='text' placeholder='Enter your name' name='name' className='form-control rounded-0' disabled
                        value={name}/>
                    </div>
                    <div className='mt-3'>
                        <label for='email' className='mb-2'>Email</label>
                        <input type='email' placeholder='Enter your email' name='email' className='form-control rounded-0' disabled
                        value={email}/>
                    </div>
                    <div className='mt-3'>
                        <label for='password' className='mb-2'>Age</label>
                        <input type='number' placeholder='Enter your age' name='password' className='form-control rounded-0' disabled
                        value={age}/>
                    </div>
                    <div className='mt-3'>
                        <label for='password' className='mb-2'>City</label>
                        <input type='text' placeholder='Enter your city' name='password' className='form-control rounded-0' disabled
                        value={city}/>
                    </div>
                    <Link to={`/update/${id}`} className='btn btn-primary mt-2 rounded-0 w-100'>Update</Link>
                    <Link to={'/home'} className='btn btn-success mt-2 rounded-0 w-100'>Home</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
