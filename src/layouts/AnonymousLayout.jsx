import React from "react";
import { Form, Input,message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AnonymousLayout = () => {
  const navigate = useNavigate();
  const onLogin = async (value) => {
    await axios
      .post("http://localhost:3001/api/auth/login", {
        email: value.email,
        password: value.password,
      })
      .then(function (response) {
        if (response.status === 201) {
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              role: response.data.role,
            })
          );
          message.success('เข้าสู่ระบบสำเร็จ');
          navigate("/");
        }else{
          message.error('ทำรายการไม่สำเร็จ');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            เข้าสู่ระบบ
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white shadow p-10 rounded-xl">
          <Form layout="vertical" onFinish={onLogin}>
            <Form.Item label="ฮีเมล์" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="รหัสผ่าน" name="password">
              <Input.Password />
            </Form.Item>
            <div className="mt-10">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2.9 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-400">
            มีสมาชิกหรือยัง?
            <a
              onClick={() => navigate("/register")}
              className="px-2 font-semibold leading-6 text-indigo-400 hover:text-indigo-300 cursor-pointerr"
            >
              สมัครมาชิก
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AnonymousLayout;
