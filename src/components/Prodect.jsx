import React from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
import Car from "../assets/image/car.png";
import { useNavigate } from "react-router-dom";

const Prodect = (props) => {
  
  const navigate = useNavigate();
  console.log("props ==> ", props);
  //   function classNames(...classNamees) {
  //     return classNamees.filter(Boolean).join(" ");
  //   }

  return (
    <div className="">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-7xl items-center "
          >
            <li className="text-sm">
              <a
                href="/"
                aria-current="page"
                className="font-medium text-gray-500 text-xl hover:text-gray-600"
              >
                Car
              </a>
            </li>
          </ol>
        </nav>
        <div className="grid grid-cols-1 mt-10 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-6">
          {props.products.map((product) => (
            <div
              key={product.id}
              className="!z-5 relative flex flex-col rounded-[10px] max-w-[360px] bg-gray-100 bg-clip-border  w-full !p-4 3xl:p-![18px] undefined"
            >
              <div className="h-full w-full">
                <div className="relative w-full mt-2 flex justify-center">
                  <img
                    src={Car}
                    className="mb-3 h-48 w-48 items-center rounded-sm 3xl:h-full 3xl:w-full"
                    alt=""
                  />
                </div>
              </div>
              <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                <div className="mb-2">
                  <p className="text-2xl font-bold text-black text-start">
                    {product.name} ({product.type})
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 text-start">
                    Model : {product.model} จำนวนที่นัง : {product.seat} ที่
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 text-start">
                    ประเภทรถ : {product.fuelType} สี : {product.color}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between md:items-center lg:justify-between ">
                <div className="flex">
                  <p className="!mb-0 text-2xl font-bold text-black">
                    {product.price} /{" "}
                    <span className="text-lg text-gray-500">วัน</span>
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigate("/product", {
                      state: {
                        id: product.id,
                      },
                    })
                  }
                  className="linear rounded-[10px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
                >
                  จองตอนนี้
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="-mx-px grid grid-cols-2 border border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {props.products.map((product) => (
            <div key={product.id} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Prodect;
