import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Image() {
    const [file,setFile]=useState()
    const [image, setImage] = useState()

    const handleUpload =(e)=>{
        const formdata = new FormData()
        formdata.append('file',file)
        axios.post('http://localhost:8081/upload', formdata)
       .then(res=>console.log(res))
       .catch(err=>console.log(err))
    }
     useEffect(()=>{
        axios.get('http://localhost:8081/getimage')
       .then(res=>setImage(res.data[1].image))
       .catch(err=>console.log(err))
     },[])
  return (
    <div>
        <input type='file' onChange={e=>setFile(e.target.files[0])} />
        <button onClick={handleUpload}>upload</button>
        <br/>
        <div className='m-5'>
            <img src={'http://localhost:8081/images/'+image} alt='image'/>
        </div>
    </div>
  )
}
