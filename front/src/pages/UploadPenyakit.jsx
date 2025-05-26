// src/pages/UploadPenyakit.jsx
import React, { useRef, useEffect } from 'react';
import Camera from '../components/camera';

export function UploadPenyakit() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const selectRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    cameraRef.current = new Camera({
      video: videoRef.current,
      canvas: canvasRef.current,
      cameraSelect: selectRef.current,
    });
    cameraRef.current.launch();
  }, []);

  const handleTakePicture = async () => {
    const blob = await cameraRef.current.takePicture();
    if (blob) {
      const url = URL.createObjectURL(blob);
      alert('Foto berhasil diambil!');
      console.log('URL blob:', url);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Ambil Foto Penyakit</h1>
      <video ref={videoRef} className="w-full max-w-md border" autoPlay playsInline />
      <select ref={selectRef} className="border p-1 rounded" />
      <canvas ref={canvasRef} hidden />
      <button onClick={handleTakePicture} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Ambil Foto
      </button>
    </div>
  );
}
