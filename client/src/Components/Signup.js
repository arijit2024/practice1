import React from 'react';

const Signup = () => {
    return(
      <div className='container mt-3'>
        <h1 className='text-center'>Sign Up</h1>
        <form method="post" id='my_form'>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Youre Email"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" placeholder="Youre Password"/>
          </div>
          <button className='btn btn-success'>Log in</button>
        </form>
      </div>
    )
}

export default Signup;