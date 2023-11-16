import React, { useEffect } from "react";
import { useState } from "react";
import { Input, Form } from "antd";
import { useLocation } from "react-router-dom";
import { Tab } from "@headlessui/react";
import axios from "axios";
import Car from "../assets/image/car.png";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const token = localStorage.getItem("accessToken");
const DetailProduct = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dateFormat = "YYYY/MM/DD";
  const location = useLocation();
  const initailValue = location?.state;
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  useEffect(() => {
    if (initailValue.id) {
      getDataById(initailValue.id);
    }
  }, [initailValue.id]);
  const getDataById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setData(res.data);
        console.log("res ==> ", res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const product = {
    name: "Basic Tee 6-Pack",
    price: "$192",
    href: "/",
    breadcrumbs: [{ id: 1, name: "Car", href: "/" }],
    images: [
      {
        src: Car,
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: Car,
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: Car,
        alt: "Model wearing plain gray basic tee.",
      },
    ],
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  };
  return (
    <div>
      <div className="bg-neutral-200">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 mt-8 lg:px-8"
            >
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-xl font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-xl">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {data?.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid  lg:max-w-5xl  lg:gap-x-8 lg:px-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-full sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-3 gap-6">
                  {product.images.map((image, idx) => (
                    <Tab
                      key={idx}
                      className="relative flex h-52 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.src}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.images.map((image,idx) => (
                  <Tab.Panel key={idx}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className=" w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl  px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-5xl lg:grid-cols-3  lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-3 lg:border-r 4 lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold text-center tracking-tight text-gray-900 sm:text-3xl">
                {data?.name}
              </h1>
            </div>
            <div className="mt-10 lg:col-span-3">
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="">
                    <p className="text-base text-gray-900">{data?.detail}</p>
                  </div>
                </div>
              </div>
              <div className="mt-0">
                <h2 className="text-sm font-medium text-center text-gray-900">
                  รายละเอียด
                </h2>
                <div className="mt-10 grid grid-cols-12 gap-4">
                  <div className="text-black col-span-3 text-start">
                    Model : {data?.model}
                  </div>
                  <div className="text-black col-span-3 text-start">
                    จำนวนที่นัง : {data?.seat} ที่
                  </div>
                  <div className="text-black col-span-3 text-start">
                    ประเภทรถ : {data?.type}
                  </div>
                  <div className="text-black col-span-3 text-start">
                    ปี : {data?.year}
                  </div>
                  <div className="text-black col-span-3 text-start">
                    ประเภทเชื่อเพลิง : {data?.fuelType}
                  </div>
                  <div className="text-black col-span-3 text-start">
                    สี : {data?.color}
                  </div>
                </div>
              </div>
            </div>
            {/* Options */}
            <div className="lg:col-span-3 lg:mt-0">
              <div className="mt-10">
                <p className="text-black text-xl">กรอกแบบฟอร์มการจอง</p>
                <Form form={form} layout="vertical" autoComplete="off">
                  <Form.Item name="name" label="ชื่อ">
                    <Input />
                  </Form.Item>
                  <Form.Item name="age" label="นามสุกุล">
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone์Number" label="เบอร์โทรศัพท์">
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email">
                    <Input />
                  </Form.Item>
                  <Form.Item name="date" label="วันที่เริ่ม-สิ้นสุด">
                    <RangePicker
                    className="w-full p-2"
                      defaultValue={[
                        dayjs("2015/01/01", dateFormat),
                        dayjs("2015/01/01", dateFormat),
                      ]}
                      format={dateFormat}
                    />
                  </Form.Item>
                  <Form.Item name="detail" label="รายละเอียดเพิ่มเติม">
                    <TextArea
                      rows={4}
                      placeholder="maxLength is 6"
                      maxLength={6}
                    />
                  </Form.Item>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      จอง
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
