import React from "react";
import { Form,message } from "antd";
import Button from "../../components/Button"
import {Link ,useNavigate} from 'react-router-dom'
import { RegisterUser } from "../../apicalls/users";

function Register() {
  const navigate = useNavigate();
  async function onfinish(values){
    try{
      // console.log(values)
      const res= await RegisterUser(values);
      if(res.success){
        message.success(res.message)
        // console.log(res.message);
        navigate('/login')
      }else{
        // console.log(res);
        message.error(res.response.data.message)
      }
    }catch(err){
      message.error(err) 

    }
  }
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">
          Welcome to Scaler Shows! Please Register{" "}
        </h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onfinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" />
          </Form.Item>
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
            <Button fullWidth title="REGISTER" type="submit" />
            <Link to="/login" className="text-primary ">
              {" "}
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
