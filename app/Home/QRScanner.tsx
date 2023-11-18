"use client";
import React, { useRef, useEffect, useState } from "react";
import ZXing from "@zxing/library";
import { BrowserQRCodeReader } from "@zxing/browser";
import { useRouter } from "next/navigation";

const QRScanner: React.FC = () => {
  const route = useRouter();
  const [cameraPermission, setcameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [QRresult, setQRresult] = useState("");

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    const videoElement = videoRef.current;

    if (!videoElement) return;

    codeReader
      .decodeFromVideoDevice(undefined, videoElement, (result) => {
        if (result) {
          console.log("Scanned result:", result.getText());
          setQRresult(result.getText());
          route.push(`/?${result.getText().split("?")[1]}`);
          // Handle the scanned QR code result here (e.g., set state, trigger an action, etc.)
        }
      })
      .catch((err: any) => {
        console.error("Error while scanning:", err);
      });

    return () => {
      // codeReader.reset();
    };
  }, []);

  return (
    <div className="w-full h-auto flex justify-center items-center">
      {/* {cameraPermission ? (
        <video ref={videoRef} 
        autoPlay
        className="w-[80%] min-h-[35rem]"/>
      ) : (
        <div className="min-w-[80%] min-h-[35rem] bg-blue-900 flex justify-center items-center rounded-3xl">
          <button 
          onClick={()=>{
            setcameraPermission(true);
          }}
          className="text-xl font-nunito text-blue-900 w-fit p-2 px-8 font-bold tracking-wide rounded-xl bg-blue-200">Scan QR</button>
        </div>
      )} */}
      <video ref={videoRef} className="w-[80%] min-h-[35rem] rounded-3xl" />
    </div>
  );
};

export default QRScanner;
