import React, { useEffect } from 'react'
import {Form ,message} from 'antd';
import Button  from '../../components/Button'
import { LoginUser } from '../../apicalls/users';
import {Link ,useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  async function onfinish(values){
    // console.log(values);
    try{
      const res=await LoginUser(values);
      // console.log(res);
      if(res.success){
        message.success(res.message);
        // console.log(res.message);
        localStorage.setItem('jwt_token', res.token);
        // console.log("login succesfull")
        navigate('/')
      }else{
        console.log(res);
        message.error(res.response.data.message)
      }
    }catch(err){
      message.error(err)

    }
  }
  useEffect(()=>{
    if(localStorage.getItem('jwt_token')){
      navigate('/')
    }
  },[]); 
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">
          Welcome  back to Scaler Shows! 
        </h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onfinish}>
        
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="Login" type="submit" />
            <Link to="/register" className="text-primary">
              {" "}
              New to Scaler Movies? Register!
            </Link>
          </div>

    
        </Form>
      </div>
    </div>
  );
}

export default Login