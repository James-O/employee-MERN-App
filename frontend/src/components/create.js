import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Create() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [city, setCity] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.post('http://localhost:8081/create', { name, email, password, age, city })
        axios.post('https://employee-mern-api.vercel.app/create', { name, email, password, age, city })
            .then(result => {
                console.log(result)
                navigate('/home')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
                <div className='w-50 bg-white rounded p-4'>
                    <form onSubmit={handleSubmit}>
                        <h2>Register</h2>
                        <div className='mt-2'>
                            <label for='name' className='mb-2'>Name</label>
                            <input type='text' placeholder='Enter your name' required name='name' className='form-control rounded-0' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mt-3'>
                            <label for='email' className='mb-2'>Email</label>
                            <input type='email' placeholder='Enter your email' required name='email' className='form-control rounded-0'
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mt-3'>
                            <label for='password' className='mb-2'>Password</label>
                            <input type='password' placeholder='Enter your password' required name='password' className='form-control rounded-0'
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='mt-3'>
                            <label for='password' className='mb-2'>Age</label>
                            <input type='number' placeholder='Enter your age' required name='password' className='form-control rounded-0'
                                onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className='mt-3'>
                            <label for='password' className='mb-2'>City</label>
                            <input type='text' placeholder='Enter your city' required name='password' className='form-control rounded-0'
                                onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <button type='submit' className='btn btn-success mt-2 rounded-0 w-100'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
