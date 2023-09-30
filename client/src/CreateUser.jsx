import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function CreateUser() {

    const [details, setDetails] = useState({Name:'', Email:'', Age:''})
    const navigate = useNavigate()

    const onChange = (e) => {
        setDetails({...details, [e.target.name]:e.target.value});
        // console.log(e.target.value);
    }

    const Submit = (e) =>{
        e.preventDefault()
        let name = details.Name;
        let email = details.Email;
        let age = details.Age;
        axios.post('http://localhost:3001/createUser',  {name, email, age})
        .then(result =>{
            console.log(result);
            navigate('/');
        })
        .catch(err => console.log(err));
        // console.log(name, email, age); 
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form action="" onSubmit={Submit}>
                <h2>Add User</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' required className='form-control' name='Name'  value={details.Name} onChange={onChange}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' required className='form-control' name='Email' value={details.Email} onChange={onChange}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Age</label>
                    <input type="number" placeholder='Enter Age' required className='form-control' name='Age' value={details.Age} onChange={onChange}/>
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}
