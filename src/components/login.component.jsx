import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../apis/auth.api";

const LoginComponent = (props) => {
  const navigate = useNavigate();

  // local state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // function
  const handleToogle = () => {
    props.toogle(false);
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await LOGIN({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', response.data.isAdmin);
      navigate('/products');
    } catch (error) {
      if(error.response.data.error) {
        alert(error.response.data.message);
      } else {
        alert('internal server error')
      }
    }
  }
  return(
    <form onSubmit={handleLogin}>
      <h4>Login</h4>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <div onClick={handleToogle} id="emailHelp" className="form-text link dark">don't have an account ? register here</div>
    </form>
  )
}

export default LoginComponent;