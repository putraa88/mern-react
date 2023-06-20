import { useState } from "react";
import { REGISTER } from "../apis/auth.api";

const RegisterComponent = ({ toogle }) => {
  // local state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');  

  // function
  const handleToogle = (state) => {
    toogle(state);
  }

  const handleRegiser = async (e) => {
    e.preventDefault();
    try {
      const response = await REGISTER({
        name,
        email,
        password
      });
      handleToogle(true);
      alert(response.data.message);
    } catch (error) {
      if (error.response.data.error) {
        alert(error.response.data.message);
      } else {
        alert('internal server error');
      }
    }
  }
  return(
    <form onSubmit={handleRegiser}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setName(e.target.value)}/>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={e => setEmail(e.target.value)} />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)}/>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      <div onClick={handleToogle} id="emailHelp" className="form-text">have an account ? login here</div>
    </form>
  )
}

export default RegisterComponent;