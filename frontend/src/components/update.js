import React, { useState,useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Update() {
    const {id} = useParams()
    const [name, setName]=useState()
    const [email, setEmail]=useState()
    const [age, setAge]=useState()
    const [city, setCity]=useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:8081/getuser/'+id)
        .then(result=>{
            console.log(result)
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)
            setCity(result.data.city)
        })
        .catch(err=>console.log(err))
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put('http://localhost:8081/update/'+ id,{name,email,age,city})
        .then(result=>{
            console.log(result)
            navigate('/home')
        })
        .catch(err=>console.log(err))
    }
  return (
    <div>
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='w-50 bg-white rounded p-4'>
                <form onSubmit={handleUpdate}>
                    <h2>Update</h2>
                    <div className='mt-2'>
                        <label for='name' className='mb-2'>Name</label>
                        <input type='text' placeholder='Enter your name' name='name' className='form-control rounded-0' onChange={(e)=>setName(e.target.value)} value={name}/>
                    </div>
                    <div className='mt-3'>
                        <label for='email' className='mb-2'>Email</label>
                        <input type='email' placeholder='Enter your email' name='email' className='form-control rounded-0'
                        onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className='mt-3'>
                        <label for='password' className='mb-2'>Age</label>
                        <input type='number' placeholder='Enter your age' name='password' className='form-control rounded-0'
                        onChange={(e)=>setAge(e.target.value)} value={age}/>
                    </div>
                    <div className='mt-3'>
                        <label for='password' className='mb-2'>City</label>
                        <input type='text' placeholder='Enter your city' name='password' className='form-control rounded-0'
                        onChange={(e)=>setCity(e.target.value)} value={city}/>
                    </div>
                    <button type='submit' className='btn btn-success mt-2 rounded-0 w-100'>Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}
