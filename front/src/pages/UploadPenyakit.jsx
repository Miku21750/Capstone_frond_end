// src/pages/UploadPenyakit.jsx
import React, { useRef, useEffect } from 'react';
import Camera from '../components/Camera';
import ApiRequest from '@/api';
import { useNavigate } from 'react-router';

export function UploadPenyakit() {
  const navigate = useNavigate();

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

    return() =>{
      cameraRef.current?.stop()
    }
  }, []);

  const handleTakePicture = async () => {
    const blob = await cameraRef.current.takePicture();
    if (blob) {
      const formData = new FormData();
      formData.append('image', blob, 'penyakit.jpg')

      try {
        const res = await ApiRequest.post('/api/detect-skin',formData,  {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          })
        if(res){
          alert('foto berhasil diunggah')
          navigate('/')
        }else{
          alert('gagal mengunggah foto')
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Terjadi kesalahan saat mengunggah.');
      }
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
