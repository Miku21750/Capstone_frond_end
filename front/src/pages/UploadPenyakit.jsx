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
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function UploadPenyakit() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const selectRef = useRef(null);
  const cameraRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(false);
  const [resAI, setData] = useState({});

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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file, 'penyakit.jpg');
    formData.append('image', file);

    try {
      Swal.fire({ title: 'Mengunggah...', didOpen: () => Swal.showLoading(), showConfirmButton: false });

      const resAI = await axios.post("http://localhost:8000/predict", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(resAI.data);
      
      if (resAI) {
        const { prediction, confidence, penjelasan, obat, cara_pakai } = resAI.data;
        formData.append('prediction', prediction);
        formData.append('confidence', confidence);
        formData.append('penjelasan', penjelasan);
        formData.append('obat', obat);
        formData.append('cara_pakai', cara_pakai);
        
        
        const resultPost = await ApiRequest.post('/api/detect-skin', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setData(resultPost.data);

        Swal.fire({ title: 'Berhasil!', text: 'Foto berhasil diproses.', icon: 'success', timer: 2000 });
        setDetail(true);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ title: 'Error', text: 'Gagal mengunggah.', icon: 'error' });
    }
    setLoading(false);
  };
const handleTakePicture = async () => {
  setLoading(true);
  const blob = await cameraRef.current.takePicture();
  if (blob) await uploadImage(blob);
};

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    setLoading(true);
    await uploadImage(file);
  }
};


//   const handleTakePicture = async () => {
//     setLoading(true);
//     const blob = await cameraRef.current.takePicture();

//     if (blob) {
//       const formData = new FormData();
//       formData.append('file', blob, 'penyakit.jpg');
//       formData.append('image', blob);

//       try {
//         Swal.fire({
//           title: 'Mengunggah Foto...',
//           text: 'Mohon tunggu, foto sedang diproses.',
//           didOpen: () => {
//             Swal.showLoading();
//           },
//           showConfirmButton: false,
//           allowOutsideClick: false,
//         })
        
//         const resAI = await axios.post("http://localhost:8000/predict", formData, {
//           headers:{
//             'Content-Type': 'multipart/form-data',
//           }
//         })
        
//         if (resAI) {
//           formData.append('prediction', resAI.data.prediction);
//           formData.append('confidence', resAI.data.confidence);
//           formData.append('penjelasan', resAI.data.penjelasan);
//           formData.append('obat', resAI.data.obat);
//           formData.append('cara_pakai', resAI.data.cara_pakai);
//           const res = await ApiRequest.post('/api/detect-skin', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//           Swal.fire({
//             title: 'Foto Berhasil',
//             text: 'Foto berhasil diunggah dan diproses.',
//             icon: 'success',
//             confirmButtonText: 'OK',
//             timer: 2000,
//             timerProgressBar: true,
//           });
//           setDetail(true);
//         } else {
//           Swal.fire({
//             title: 'Gagal Unggah',
//             text: 'Foto gagal diunggah. Silakan coba lagi.',
//             icon: 'error',
//             confirmButtonText: 'OK',
//           });
//         }
//       } catch (error) {
//         console.error('Upload error:', error);
//         Swal.fire({
//           title: 'Terjadi Kesalahan',
//           text: 'Terjadi kesalahan saat mengunggah.',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//       }
//     }
//     setLoading(false);
//   };


//   const handleFileUpload = async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   setLoading(true);

//   const formData = new FormData();
//   formData.append('file', file, file.name || 'penyakit.jpg');
//   formData.append('image', file);

//   try {
//     Swal.fire({
//       title: 'Mengunggah Foto...',
//       text: 'Mohon tunggu, foto sedang diunggah.',
//       didOpen: () => {
//         Swal.showLoading();
//       },
//       showConfirmButton: false,
//       allowOutsideClick: false,
//     });

//     /**
//      * TODO :
//      * Make a card for a response processed AI
//     */
//     const resAI = await axios.post("http://localhost:8000/predict", formData, {
//       headers:{
//         'Content-Type': 'multipart/form-data',
//       }
//     })
//     if (resAI) {
//       setData(resAI.data);
//       formData.append('prediction', resAI.data.prediction);
//       formData.append('confidence', resAI.data.confidence);
//       formData.append('penjelasan', resAI.data.penjelasan);
//       formData.append('obat', resAI.data.obat);
//       formData.append('cara_pakai', resAI.data.cara_pakai);
//       const res = await ApiRequest.post('/api/detect-skin', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//     Swal.fire({
//       title: 'Foto Berhasil',
//       text: 'Foto berhasil diunggah dan diproses.',
//       icon: 'success',
//       confirmButtonText: 'OK',
//       timer: 2000,
//       timerProgressBar: true,
//     });
//     setDetail(true);
//     } else {
//       Swal.fire({
//         title: 'Gagal Unggah',
//         text: 'Foto gagal diunggah. Silakan coba lagi.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }
//   } catch (error) {
//     console.error('Upload error:', error);
//     Swal.fire({
//       title: 'Terjadi Kesalahan',
//       text: 'Terjadi kesalahan saat mengunggah.',
//       icon: 'error',
//       confirmButtonText: 'OK',
//     });
//   }

//   setLoading(false);
// };

  return (
    <div className="min-h-screen flex  items-center  bg-gray-100 px-4 py-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Take The picture</h1>
          <p>Capture the image of the skin condition for analysis.</p>
          <img src="/Camera-Ilustration-1.png" alt="Camera" className="w-1/2 mx-auto aspect-auto object-cover" loading='lazy'/>
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

      <Dialog open={detail} >
        <DialogTrigger hidden asChild>
          <Button variant="outline">Lihat Hasil</Button>
        </DialogTrigger>
        <DialogContent className={'[&>button]:hidden'}>
          <DialogHeader>
            <DialogTitle>Hasil Analisis</DialogTitle>
            <DialogDescription>
              Berikut adalah hasil analisis dari foto yang Anda unggah.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mb-4">
            {console.log(resAI)}
            <img
              src={`http://localhost:4000${resAI.path}`}
              alt="Hasil Analisis"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <p>this is the thing {resAI.path}</p>
            <p><strong>Prediksi:</strong> {resAI.prediction}</p>
            <p><strong>Kepercayaan:</strong> {(resAI.confidence * 100).toFixed(2)}%</p>
            <p><strong>Penjelasan:</strong> {resAI.penjelasan}</p>
            <p><strong>Obat:</strong> {resAI.obat}</p>
            <p><strong>Cara Pakai:</strong> {resAI.cara_pakai}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setDetail(false);
              navigate('/dashboard');
            }}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
