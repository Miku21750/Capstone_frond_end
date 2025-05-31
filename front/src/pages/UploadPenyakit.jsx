// src/pages/UploadPenyakit.jsx
import React, { useRef, useEffect, useState } from 'react';
import Camera from '../components/Camera';
import ApiRequest from '@/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Archive } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function UploadPenyakit() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const selectRef = useRef(null);
  const cameraRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cameraRef.current = new Camera({
      video: videoRef.current,
      canvas: canvasRef.current,
      cameraSelect: selectRef.current,
    });

    cameraRef.current.launch();

    return () => {
      cameraRef.current?.stop();
    };
  }, []);

  const toggleCamera = () => {
    if (isCameraOn) {
      cameraRef.current?.stop();
    } else {
      cameraRef.current?.launch();
    }
    setIsCameraOn(!isCameraOn);
  };

  const handleTakePicture = async () => {
    setLoading(true);
    const blob = await cameraRef.current.takePicture();

    if (blob) {
      const formData = new FormData();
      formData.append('image', blob, 'penyakit.jpg');

      try {
        Swal.fire({
          title: 'Mengunggah Foto...',
          text: 'Mohon tunggu, foto sedang diunggah.',
          didOpen: () => {
            Swal.showLoading();
          },
          showConfirmButton: false,
          allowOutsideClick: false,
        })
        const res = await ApiRequest.post('/api/detect-skin', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res) {
          Swal.fire({
            title: 'Foto Berhasil',
            text: 'Foto berhasil diunggah dan diproses.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          navigate('/');
        } else {
          Swal.fire({
            title: 'Gagal Unggah',
            text: 'Foto gagal diunggah. Silakan coba lagi.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
        Swal.fire({
          title: 'Terjadi Kesalahan',
          text: 'Terjadi kesalahan saat mengunggah.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
    setLoading(false);
  };


  const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setLoading(true);

  const formData = new FormData();
  formData.append('image', file, file.name || 'penyakit.jpg');

  try {
    Swal.fire({
      title: 'Mengunggah Foto...',
      text: 'Mohon tunggu, foto sedang diunggah.',
      didOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    const res = await ApiRequest.post('/api/detect-skin', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res) {
      Swal.fire({
        title: 'Foto Berhasil',
        text: 'Foto berhasil diunggah dan diproses.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/');
    } else {
      Swal.fire({
        title: 'Gagal Unggah',
        text: 'Foto gagal diunggah. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    Swal.fire({
      title: 'Terjadi Kesalahan',
      text: 'Terjadi kesalahan saat mengunggah.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex  items-center  bg-gray-100 px-4 py-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Take The picture</h1>
          <p>Capture the image of the skin condition for analysis.</p>
          <img src="/Camera-Ilustration-1.png" alt="" className="w-1/2 mx-auto" />
      </div>
      <Card className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 space-y-4">

        <div className="relative w-full aspect-video bg-black rounded overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
        </div>

        <div className="flex justify-between items-center gap-5">
          <select ref={selectRef} className="flex-1 border p-2 rounded text-sm" />
          <button
            onClick={toggleCamera}
            className={`text-white py-2 px-4 rounded transition ${
              isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isCameraOn ? 'Matikan Kamera' : 'Nyalakan Kamera'}
          </button>
        </div>

        <canvas ref={canvasRef} hidden />
        <div className="flex flex-col  space-y-2">
          <Label htmlFor="file-upload" className="w-fit cursor-pointer bg-purple-600 hover:bg-purple-700 text-white  py-2 px-4 rounded">
            Pilih Gambar dari Perangkat
            <Archive/>
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <button
          onClick={handleTakePicture}
          disabled={loading || !isCameraOn}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Mengunggah...' : 'Ambil Foto & Unggah'}
        </button>
      </Card>
    </div>
  );
}
