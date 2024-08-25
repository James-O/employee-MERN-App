import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const [name, setName]=useState()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const navigate = useNavigate()

    let config={
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
            }
    }
    axios.defaults.withCredentials = true;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('https://vercel.com/james-os-projects/employee-mern-api/register',{name,email,password},config)
        .then(result=>{
            console.log(result)
            navigate('/login')
        })
        .catch(err=>console.log(err))
    }
  return (
    <div>
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='w-50 bg-white rounded p-4'>
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className='mt-2'>
                        <label for='name' className='mb-2'>Name</label>
                        <input type='text' placeholder='Enter your name' name='name' className='form-control rounded-0' onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='mt-3'>
                        <label for='email' className='mb-2'>Email</label>
                        <input type='email' placeholder='Enter your email' name='email' className='form-control rounded-0'
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='mt-3'>
                        <label for='password' className='mb-2'>Password</label>
                        <input type='password' placeholder='Enter your password' name='password' className='form-control rounded-0'
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type='submit' className='btn btn-success mt-2 rounded-0 w-100'>Register</button>
                    <p>Have an account?</p>
                    <Link to={'/login'} type='submit' className='btn btn-default border w-100 bg-light text-decoration-none mt-2 rounded-0 w-100'>Login</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
