import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState({
      name:"",email:"",phone:"",work:"",password:"",cpassword:""
    })

    let name , value;
    const handelInputs = (e) => {
      name = e.target.name;
      value = e.target.value;
      
      setUser({...user, [name]:value})
    }
    
    const postData = async (e) => {
      console.log(user)
      e.preventDefault();
      const {name,email,phone,work,password,cpassword} = user;
      // used fetch
      const res = await fetch('/register', {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name,email,phone,work,password,cpassword
        })
      })

      const data = await res.json();

      if(data.status === 422 || !data){
          console.log("Invalid Registation")
      }
      else{
        console.log("Successfull Registation")
        navigate("/signup");
      }

    }

    return(
      <div className='container mt-3'>
        <h1 className='text-center'>Register</h1>
        <form method="post" id='my_form'>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={user.name} onChange={handelInputs} autoComplete='off' placeholder="Youre Name"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name='email' value={user.email} onChange={handelInputs} autoComplete='off' placeholder="Youre Email"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Number</label>
            <input type="number" className="form-control" name='phone' value={user.phone} onChange={handelInputs} autoComplete='off' placeholder="Youre Number"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Profession</label>
            <input type="text" className="form-control" name='work' value={user.work} onChange={handelInputs} autoComplete='off' placeholder="Youre Profession"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" name='password' value={user.password} onChange={handelInputs} autoComplete='off' placeholder="Youre Password"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="text" className="form-control" name='cpassword' value={user.cpassword} onChange={handelInputs} autoComplete='off' placeholder="Youre Confirm Password"/>
          </div>
          <button className='btn btn-success' onClick={postData}>Submit</button>
        </form>
      </div>
    )
}

export default Register;