import React from 'react'
import { Form, Input,message } from "antd";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Resgister = () => {
const navigate = useNavigate()
    const onRegister = async(value) => {
        await axios
        .post("http://localhost:3001/api/user", {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
          phoneNumber: value.phoneNumber,
          roleId: 2,
        })
        .then(function (response) {
          if (response.status === 201) {
            message.success('สมัครสมาชิกสำเร็จ');
           navigate('/login')
          }else{
            message.error('ทำรายการไม่สำเร็จ');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            สมัครมาชิก
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl bg-white shadow p-10 rounded-xl">
          <Form layout="vertical" onFinish={onRegister}>
            <Form.Item label="ชื่อ" name="firstName">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="นามสกุล">
              <Input />
            </Form.Item>
            <Form.Item label="รหัสผ่าน" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item name="phoneNumber" label="เบอร์โทรศัพท์">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="อีเมล์">
              <Input />
            </Form.Item>
            <div className="mt-10">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2.9 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                สมัครสมาชิก
              </button>
            </div>
            <div className="mt-6">
              <button
              onClick={() => navigate('/login')}
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2.9 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </Form>

        </div>
      </div>
  )
}

export default Resgister