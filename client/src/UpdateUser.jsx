import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateUser() {

    const {id} = useParams();
    const [details, setDetails] = useState({name:'', email:'', age:''})
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result=>{
            // console.log(result)
            setDetails({name:result.data.name, email:result.data.email, age:result.data.age})
        })
        .catch(err=>console.log(err))
    },[])

    const onChange = (e) => {
        setDetails({...details, [e.target.name]:e.target.value})
    }

    const Update = (e) => {
        e.preventDefault();
        let name = details.name;
        let email = details.email;
        let age = details.age;
        axios.put('http://localhost:3001/updateUser/'+id, {name, email, age})
        .then(result=>{
            console.log(result);
            navigate('/')
        })
        .catch(err=>console.log(err))
    }

  return ( 
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form action="" onSubmit={Update}>
                <h2>Update User</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control' required name='name' value={details.name} onChange={onChange}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' className='form-control' required name='email' value={details.email} onChange={onChange}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Age</label>
                    <input type="number" placeholder='Enter Age' className='form-control' required name='age' value={details.age} onChange={onChange}/>
                </div>
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div> 
  )
}
