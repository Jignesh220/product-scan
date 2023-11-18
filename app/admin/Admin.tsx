import { auth, db } from "@/Firebase";
import { getAuth, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { uid } from "uid/secure";
import firebase from "firebase/compat/app";

export default function Admin() {
  // const auth = getAuth();
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const [loading, setloading] = useState(false);
  const [uID, setuID] = useState(uid());
  const [errorMessage, seterrorMessage] = useState("");

  const [Form, setForm] = useState({
    ProductName: "",
    CompanyName: "",
    manufactureDate: "",
    expiryDate: "",
  });
  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue.startDate);
    setValue(newValue);
    setForm({
      ...Form,
      manufactureDate: newValue.startDate,
      expiryDate: newValue.endDate,
    });
  };
  const handleLogout = () => {
    signOut(auth);
  };

  const handleUploadData = async (e: React.FormEvent) => {

    e.preventDefault();
    setloading(true);
    try {
      const ref = `products/${uID}`;
      const HomePageInfo = doc(db, ref);
      await setDoc(HomePageInfo, {
        id: uID,
        ProductName: Form.ProductName,
        CompanyName: Form.CompanyName,
        manufactureDate: Form.manufactureDate,
        expiryDate: Form.expiryDate,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(() => {
        setuID(uid());
        alert("done")
      });
    } catch (error: any) {
      seterrorMessage(error.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[90vh] min-w-full">
      <button
        onClick={handleLogout}
        className="w-fit absolute top-2 right-4 p-2 px-8 rounded-full bg-blue-700 text-white font-bold font-nunito"
      >
        Logout
      </button>
      <form
        onSubmit={handleUploadData}
        className="mt-8 w-full lg:px-64 md:px-32 px-4"
      >
        <div className="text-5xl text-center font-nunito">
          Enter Product Detail
        </div>
        <div className="flex flex-col gap-1 lg:px-96 md:px-8 mt-16">
          <label htmlFor="pName" className="font-nunito text-sm tracking-wide">
            Product Name
          </label>
          <input
            type="text"
            name="pName"
            id="pName"
            onChange={(e) => {
              setForm({ ...Form, ProductName: e.target.value });
            }}
            className="w-full h-10 font-nunito outline-none border-b border-black/75 focus:border-black focus:border-b-2"
          />
        </div>
        <div className="flex flex-col gap-1 lg:px-96 md:px-8 mt-8">
          <label htmlFor="cName" className="font-nunito text-sm tracking-wide">
            Company Name
          </label>
          <input
            type="text"
            name="cName"
            id="cName"
            onChange={(e) => {
              setForm({ ...Form, CompanyName: e.target.value });
            }}
            className="w-full h-10 font-nunito outline-none border-b border-black/75 focus:border-black focus:border-b-2"
          />
        </div>
        <div className="flex flex-col gap-1 lg:px-96 md:px-8 mt-8">
          <label htmlFor="mDate" className="font-nunito text-sm tracking-wide">
            Manufactured Date - Expiry Date
          </label>
          <Datepicker
            useRange={false}
            primaryColor="blue"
            value={value}
            inputClassName="w-full h-10 font-nunito outline-none border-b border-black/75 focus:border-black focus:border-b-2"
            // containerClassName="font-nunito outline-none border-b border-black/75 focus:border-black focus:border-b-2"
            onChange={handleValueChange}
          />
        </div>
        <div className="mt-4 text-sm text-center font-nunito font-bold tracking-wide text-red-700">
          {errorMessage}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-800 text-white font-nunito w-fit mt-16 p-2 px-8 shadow-2xl shadow-slate-400 rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
