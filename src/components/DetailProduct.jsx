import React, { useEffect } from "react";
import { useState } from "react";
import { Input, Form } from "antd";
import { useLocation } from "react-router-dom";
import { Tab } from "@headlessui/react";
import axios from "axios";
const DetailProduct = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const location = useLocation();
  const initailValue = location?.state;
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  useEffect(() => {
    if (initailValue.id) {
      getDataById(initailValue.id);
    }
  }, [initailValue.id]);
  const getDataById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/car/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNCIsImlhdCI6MTY5OTk3Nzk4NSwiZXhwIjoxNzAwNTgyNzg1fQ.F1GXtAIe-eeo4DaAeRoHdcRWZM4BNTGiZWSwoD6Wm3s`,
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
    href: "home",
    breadcrumbs: [
      { id: 1, name: "Men", href: "home" },
      { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
        alt: "Model wearing plain white basic tee.",
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
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-full items-center space-x-2 px-4 sm:px-6  lg:px-8"
            >
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
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
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product?.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid  lg:max-w-7xl  lg:gap-x-8 lg:px-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-full sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images.map((image, idx) => (
                    <Tab
                      key={idx}
                      className="relative flex h-48 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
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
                {product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-[500px] w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl  px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r 4 lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data?.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {data?.price} /<span> วัน</span>
              </p>
              <div>
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
                  <Form.Item name="detail" label="รายละเอียดเพิ่มเติม">
                    <TextArea
                      rows={4}
                      placeholder="maxLength is 6"
                      maxLength={6}
                    />
                  </Form.Item>
                </Form>
              </div>

              {/* Reviews */}
              {/* <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div> */}

              <form className="mt-10">
                {/* Colors */}
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div> */}

                {/* Sizes */}
                {/* <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div> */}

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{data?.detail}</p>
                </div>
              </div>

              <div className="mt-10">
                {/* <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3> */}
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <div className="mt-4 grid grid-cols-12 gap-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
