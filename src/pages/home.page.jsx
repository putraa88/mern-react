import { useState } from "react";
import LoginComponent from "../components/login.component";
import { loginImage } from "../constants/image-url.constant";
import RegisterComponent from "../components/register.component";

const HomePage = () => {
  // local state
  const [isLogin, setIsLogin] = useState(true);

  // function
  const toogleRegister = (state) => {
    setIsLogin(state)
  }
  return(
    <div className="container">
      <h1 className="text-center">Welcome to my Website</h1>
      <div className="row align-items-center" style={{height:'700px'}}>
        <div className="col">
          {
            isLogin ? <LoginComponent toogle={toogleRegister}/> : <RegisterComponent toogle={toogleRegister}/>
          }
        </div>
        <div className="col">
        <img src={loginImage} className="card-img-top img-responsive" alt="..." style={{height:'250px', width:'100%'}} />
        </div>
      </div>
    </div>
  )
};

export default HomePage;