import React, { useEffect, useState } from "react";
import { Button, QRCode, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarOutlined } from "@ant-design/icons";
const token = localStorage.getItem("accessToken");
const Slip = () => {
  const location = useLocation();
  const initailValue = location?.state;
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    console.log("id==> ", initailValue.id);
    if (initailValue.id) {
      getDataById(initailValue.id);
    }
  }, [initailValue.id]);

  const getDataById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSlip = () => {
    if(fileList.length > 0){
      onConfirm()
    }else{
      message.error('กรุณาอัพโหลดสลิป')
    }
    console.log('file ==> ',fileList);
  }

  const onConfirm = async() => {
    const formData = new FormData();    
    formData.append("slip", fileList[0].originFileObj);
    await axios
    .patch(
      `http://localhost:3001/api/book/${data.id}/paid/${data.slip[0].id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      if (response.status === 200) {
        message.success('ทำรายสำเร็จ')
        console.log('res ===> ',response);
        navigate("/")
      } else {
        console.log('ทำรายการไม่สำเร็จ โปรดลองใหม่อีกครั้ง');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const props = {
    maxCount: 1,
    customRequest: () => {},
    onChange({ file, fileList }) {
      console.log("file ==> ", file);
      if (file.status === "uploading") {
        file.status = "done";
      }
      if (file.status !== "uploading") {
        setFileList(fileList);
        console.log(file, fileList);
      }
    },
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "Download",
      showRemoveIcon: true,
      removeIcon: (
        <StarOutlined
          onClick={(e) => console.log(e, "custom removeIcon event")}
        />
      ),
    },
  };

  // const downloadQRCode = () => {
  //   console.log(11111);
  // }
  console.log("data ==> ", data);

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl bg-white shadow p-10 rounded-xl">
      <p className="text-2xl text-black font-bold">กรุณาชำระเงิน</p>
      <div id="myqrcode" className="flex justify-center mt-4">
        <QRCode
          value={`http://localhost:3001/${data?.slip[0]?.qrCodeUrl}`}
          bgColor="#fff"
          style={{ marginBottom: 16 }}
        />
      </div>
      <p className="text-black text-lg">จำนวน {data?.slip[0]?.price} บาท</p>
      {/* <Button className="bg-lime-700 text-white w-[160px] mt-4" onClick={downloadQRCode}>
      Download
    </Button> */}
      <Upload {...props}>
        <Button className="w-[160px] mt-4" icon={<UploadOutlined />}>
          อัพโหลดสลิป
        </Button>
      </Upload>
      <div className="mt-6 flex justify-center">
      <Button className="bg-lime-700 text-white w-[160px]" onClick={onSlip}>
        ยืนยัน
      </Button>
      </div>
    </div>
  );
};

export default Slip;
