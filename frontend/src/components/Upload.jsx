import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../features/product/productDataSlice";

export default function Upload() {
  const [formData, setformData] = useState({ file: "", name: "" });
  const dispatch = useDispatch();
  // const [file, setfile] = useState("");
  // const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("file", formData.file);

    const res = await dispatch(addData(formData)).unwrap();
    console.log(res);
    // console.log(file);
    // console.log(name);
  };
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    // const filedname = e.target.name;
    // const value = e.target.value;
    // const file = e.target.files[0];
    // const type = e.target.type;
    console.log(e);
    setformData((currData) => {
      return {
        ...currData,
        [name]: type === "file" ? files[0] : value,
      };
    });
  };
  return (
    <div className="mt-10">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="m-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="bg-slate-200"
            placeholder="enter name"
            value={formData.name}
            onChange={handleInputChange}
            id="name"
          />
        </div>
        <div className="m-4">
          <label htmlFor="upload"></label>
          <input
            type="file"
            name="file"
            // value={formData.file}
            onChange={handleInputChange}
            id="upload"
          />
        </div>
        <div className="m-4">
          <button className="bg-green-400 p-2  rounded-lg">Submit</button>
        </div>
      </form>
    </div>
  );
}
