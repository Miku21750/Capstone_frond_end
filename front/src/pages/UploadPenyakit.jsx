// src/pages/UploadPenyakit.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Camera from '../components/Camera'; // Assuming Camera component handles the core camera logic
import ApiRequest from '@/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Archive, Camera as CameraIcon } from 'lucide-react'; // Import Camera icon
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

  const [isCameraOn, setIsCameraOn] = useState(false); // Initially camera is off
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(false);
  const [resAI, setData] = useState({});
  const [permissionDenied, setPermissionDenied] = useState(false); // New state for permission status

  // Function to initialize and launch the camera
  const launchCamera = useCallback(async () => {
    setPermissionDenied(false); // Reset permission denied status
    try {
      if (!cameraRef.current) {
        cameraRef.current = new Camera({
          video: videoRef.current,
          canvas: canvasRef.current,
          cameraSelect: selectRef.current,
        });
      }
      await cameraRef.current.launch();
      setIsCameraOn(true);
      Swal.close(); // Close any loading/permission popups
    } catch (error) {
      console.error('Error launching camera:', error);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
        Swal.fire({
          title: 'Akses Kamera Ditolak',
          text: 'Anda telah menolak akses kamera. Silakan izinkan akses kamera untuk menggunakan fitur ini.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Izinkan Sekarang',
          cancelButtonText: 'Tutup',
          customClass: {
            confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white',
            cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Attempt to re-request permission. This will likely trigger the browser's permission prompt again.
            launchCamera();
          }
        });
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        Swal.fire({
          title: 'Kamera Tidak Ditemukan',
          text: 'Tidak ada perangkat kamera yang terdeteksi. Pastikan kamera terhubung dan berfungsi.',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Terjadi Kesalahan',
          text: 'Gagal mengakses kamera. Silakan coba lagi.',
          icon: 'error',
        });
      }
      setIsCameraOn(false);
    }
  }, []);

  // Effect to stop camera when component unmounts
  useEffect(() => {
    return () => {
      cameraRef.current?.stop();
    };
  }, []);

  // Function to toggle camera on/off
  const toggleCamera = () => {
    if (isCameraOn) {
      cameraRef.current?.stop();
      setIsCameraOn(false);
    } else {
      launchCamera(); // Only launch camera if it's off
    }
  };

  const uploadImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file, 'penyakit.jpg');
    formData.append('image', file); // Keep this for potential backend needs

    try {
      Swal.fire({
        title: 'Mengunggah...',
        didOpen: () => Swal.showLoading(),
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      const resAI = await axios.post("http://localhost:8000/predict", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (resAI?.data) {
        const { prediction, confidence, penjelasan, obat, cara_pakai } = resAI.data;
        // Append AI response data to formData for the second API call
        formData.append('prediction', prediction);
        formData.append('confidence', confidence);
        formData.append('penjelasan', penjelasan);
        formData.append('obat', obat);
        formData.append('cara_pakai', cara_pakai);

        const resultPost = await ApiRequest.post('/api/detect-skin', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setData(resultPost.data); // Set data for the dialog
        Swal.fire({ title: 'Berhasil!', text: 'Foto berhasil diproses.', icon: 'success', timer: 2000 });
        setDetail(true); // Open the dialog
      } else {
        throw new Error('AI prediction failed or returned no data.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      Swal.fire({ title: 'Error', text: 'Gagal mengunggah atau memproses gambar.', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleTakePicture = async () => {
    if (!isCameraOn) {
      Swal.fire({
        title: 'Kamera Belum Aktif',
        text: 'Silakan nyalakan kamera terlebih dahulu untuk mengambil foto.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }
    setLoading(true);
    try {
      const blob = await cameraRef.current.takePicture();
      if (blob) {
        await uploadImage(blob);
      } else {
        Swal.fire({ title: 'Gagal Mengambil Foto', text: 'Tidak dapat mengambil gambar dari kamera.', icon: 'error' });
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Swal.fire({ title: 'Error', text: 'Terjadi kesalahan saat mengambil foto.', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 px-4 py-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-8 lg:mb-0 lg:mr-8 max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Ambil Gambar Kondisi Kulit</h1>
        <p className="text-base md:text-lg text-gray-600">Jepret atau unggah gambar kondisi kulit Anda untuk dianalisis.</p>
        <img src="/Camera-Ilustration-1.png" alt="Camera" className="w-full max-w-xs md:max-w-sm mx-auto aspect-auto object-contain" loading='lazy'/>
      </div>
      
      <Card className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 space-y-6 border-t-5 border-purple-600">
        <div className="relative w-full aspect-video bg-black rounded overflow-hidden">
          {!isCameraOn && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-center">
              {permissionDenied ? (
                <div className="flex flex-col items-center">
                  <p className="mb-4">Akses kamera ditolak.</p>
                  <Button onClick={launchCamera} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Izinkan Kamera
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <CameraIcon size={48} className="mb-4" />
                  <p>Kamera belum aktif. Klik "Nyalakan Kamera" untuk memulai.</p>
                </div>
              )}
            </div>
          )}
          <video
            ref={videoRef}
            className={`w-full h-full object-cover ${!isCameraOn ? 'hidden' : ''}`}
            autoPlay
            playsInline
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <select ref={selectRef} className="flex-1 border p-2 rounded text-sm w-full sm:w-auto" disabled={!isCameraOn}>
            {/* Options will be populated by the Camera component */}
          </select>
          <Button
            onClick={toggleCamera}
            className={`w-full sm:w-auto py-2 px-4 rounded transition ${
              isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isCameraOn ? 'Matikan Kamera' : 'Nyalakan Kamera'}
          </Button>
        </div>

        <canvas ref={canvasRef} hidden />

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleTakePicture}
            disabled={loading || !isCameraOn}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
              loading || !isCameraOn ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Mengunggah...' : 'Ambil Foto & Unggah'}
          </Button>

          <Label htmlFor="file-upload" className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
            Pilih Gambar dari Perangkat
            <Archive size={20} />
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </Card>

      <Dialog open={detail} onOpenChange={setDetail}> {/* Use onOpenChange for better control */}
        <DialogContent className={'[&>button]:hidden max-w-md md:max-w-lg lg:max-w-2xl max-h-md overflow-y-auto md:max-h-[calc(100svh-2rem)]'}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Hasil Analisis</DialogTitle>
            <DialogDescription className="text-gray-600">
              Berikut adalah hasil analisis dari foto yang Anda unggah.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mb-4">
            {resAI.path && (
              <img
                src={`http://localhost:4000${resAI.path}`}
                alt="Hasil Analisis"
                className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg object-contain"
              />
            )}
          </div>
          <div className="space-y-3 text-sm md:text-base">
            <p><strong>Prediksi:</strong> {resAI.prediction || 'N/A'}</p>
            <p><strong>Kepercayaan:</strong> {resAI.confidence ? `${(resAI.confidence * 100).toFixed(2)}%` : 'N/A'}</p>
            <p><strong>Penjelasan:</strong> {resAI.penjelasan || 'Tidak ada penjelasan.'}</p>
            <p><strong>Obat:</strong> {resAI.obat || 'Tidak ada rekomendasi obat.'}</p>
            <p><strong>Cara Pakai:</strong> {resAI.cara_pakai || 'Tidak ada cara pakai.'}</p>
          </div>
          <DialogFooter className="flex justify-end mt-6">
            <Button variant="outline" onClick={() => {
              setDetail(false);
              navigate('/dashboard'); // Navigate after closing dialog
            }}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}