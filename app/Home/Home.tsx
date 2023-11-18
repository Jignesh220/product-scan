"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import QRScanner from "./QRScanner";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/Firebase";

export default function Home() {
  const searchParams = useSearchParams();
  const [isQRId, setisQRId] = useState(false);
  const [QRId, setQRId] = useState("");
  const [ProductData, setProductData] = React.useState<DocumentData[]>([]);
  const ProductID = searchParams.get("id");

  useEffect(() => {
    if (ProductID) {
      setisQRId(true);
      GetProductData();
    }
  }, [ProductID]);

  const GetProductData = async () => {
    const ref = `/products/${ProductID}`;
    const docRef = doc(db, ref);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProductData((arr) => [...arr, docSnap.data()]);
      console.log(docSnap.data());
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

//   const getContactData = async () => {
//     if (!isQRId) {
//       return;
//     }
//     try {
//       while (ProductData.length > 0) {
//         ProductData.pop();
//       }
//       const ref = `/products`;
//       const contactInformation = collection(db, ref);
//       const Mysnapshort = await getDocs(contactInformation);
//       Mysnapshort.forEach(async (doc) => {
//         setProductData((arr) => [...arr, doc.data()]);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

  if (isQRId) {
    return (
      <div className="py-8 lg:px-96 px-2 font-nunito tracking-wider font-bold rounded-3xl">
        <div className="text-center text-black font-nunito lg:text-5xl md:text-2xl text-lg">
          Welcome to Product Scan
        </div>
        {ProductData.map((item) => (
          <table key={item.id} className="w-full mt-16 divide-y-2 divide-gray-200 bg-gray-200 rounded-3xl p-2 text-sm table-auto max-w-full">
            <thead className="ltr:text-left rtl:text-right bg-gray-400">
              <tr className="bg-slate-200text-xl">
                <th className="whitespace-normal text-xl px-4 py-2 font-bold text-black">
                  Title
                </th>
                <th className="whitespace-normal text-xl px-4 py-2 font-bold text-black">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              <tr>
                <td className="whitespace-normal px-4 py-2 font-medium text-gray-900 text-center">
                  Product Name
                </td>
                <td className="whitespace-normal px-4 py-2 text-gray-700 select-all">
                  {item.ProductName}
                </td>
              </tr>
              <tr>
                <td className="whitespace-normal px-4 py-2 font-medium text-gray-900 text-center">
                  Company Name
                </td>
                <td className="whitespace-normal px-4 py-2 text-gray-700 select-all">
                  {item.CompanyName}
                </td>
              </tr>

              <tr>
                <td className="whitespace-normal px-4 py-2 font-medium text-gray-900">
                  Manufacture Date
                </td>
                <td className="whitespace-normal px-4 py-2 text-gray-700">
                  {item.manufactureDate}
                </td>
              </tr>

              <tr>
                <td className="whitespace-normal px-4 py-2 font-medium text-gray-900 text-center">
                  Expiry Date
                </td>
                <td className="px-4 py-2 text-gray-700 whitespace-normal">
                  {item.expiryDate}
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  }
  return (
    <div className="min-h-[90vh] min-w-full py-8">
      <div className="text-center text-black font-nunito lg:text-5xl md:text-2xl text-lg">
        Welcome to Product Scan
      </div>
      <div className="py-8 lg:px-20 px-2">
        <div className="grid grid-cols-12 gap-2">
          <div className="lg:col-span-6 col-span-12 flex flex-col gap-2 bg-blue-200 py-4">
            <div className="text-center text-xl font-bold font-nunito text-blue-900 tracking-wide">
              Scan Product QR Code
            </div>
            <QRScanner />
          </div>
          <div className="lg:col-span-1 col-span-12 flex justify-center items-center">
            <div className="text-blue-950 font-nunito font-bold tracking-wider">
              OR
            </div>
          </div>
          <div className="lg:col-span-5 col-span-12 flex flex-col gap-2 py-4">
            <div className="text-center text-xl font-bold font-nunito text-blue-900 tracking-wide">
              Enter a QR ID
            </div>
            <form
              action="/?id"
              method="get"
              className="w-full lg:px-16 md:px-8 px-2"
            >
              <div className="w-full flex flex-col gap-1">
                <label
                  htmlFor="id"
                  className="font-nunito text-sm tracking-wide"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Enter QR Id"
                  onChange={(e) => {
                    setQRId(e.target.value);
                  }}
                  className="w-full h-10 bg-slate-100 font-nunito outline-none border-b border-black/75 focus:border-black focus:border-b-2"
                />
              </div>
              <button className="w-full bg-blue-950 text-white font-nunito font-bold tracking-wide p-2 mt-8 rounded-full hover:scale-105 transition-all duration-500 focus:scale-95">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
