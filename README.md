# 🌟 Lumìnou§kin

**Luminouskin** adalah proyek capstone hasil kolaborasi lintas tim (Front-End, Back-End, dan Machine Learning) yang bertujuan menyediakan solusi digital untuk deteksi dini dan edukasi penyakit kulit menular yang umum di Indonesia. Proyek ini dikembangkan sebagai kontribusi nyata terhadap *Sustainable Development Goals* (SDGs) – Goal 3: Good Health & Well-Being, khususnya Target 3.3: *Mengakhiri epidemi dan melawan penyakit menular*.

---

## 📌 Latar Belakang Masalah

Penyakit kulit menular seperti **impetigo, scabies, kurap, panu**, dan **eksim** masih menjadi masalah kesehatan yang meluas, terutama di daerah **3T (Tertinggal, Terdepan, Terluar)**. Masalah ini dipicu oleh:

- Kurangnya kesadaran akan gejala awal dan pencegahan.
- Minimnya akses ke tenaga medis dan obat-obatan.
- Informasi digital kesehatan yang belum merata dan kredibel.
- Keterbatasan sanitasi, terutama saat musim hujan atau pasca-bencana.

Akibatnya, penyakit ini mudah menyebar, sulit dikendalikan, dan berdampak pada masyarakat berpenghasilan rendah maupun komunitas umum.

---

## 🎯 Tujuan Proyek

- Menyediakan **deteksi dini otomatis** penyakit kulit menular ringan menggunakan model *Computer Vision*.
- Memberikan **edukasi pengobatan dan pencegahan** berbasis AI untuk masyarakat umum.
- Menghadirkan antarmuka aplikasi yang **user-friendly dan informatif** agar dapat diakses di daerah dengan keterbatasan infrastruktur.

---

## 🛠️ Teknologi yang Digunakan

### 🔹 Front-End
- Vite + React + TailwindCSS
- Fitur utama:
  - Upload gambar kulit
  - Antarmuka diagnosis ringan dan edukatif
  - Peta apotek/klinik terdekat (opsional)

### 🔹 Back-End
- HAPI.js dan FastAPI
- MongoDB (Database)
- Fungsi:
  - Integrasi model ML untuk prediksi penyakit
  - API endpoint untuk komunikasi frontend ↔ backend
  - Penyimpanan dan manajemen riwayat konsultasi

### 🔹 Machine Learning
- Model CNN (Convolutional Neural Network) untuk klasifikasi gambar penyakit kulit
- Transfer learning dengan dataset augmented
- Evaluasi model: Accuracy, Precision, Recall, F1-Score, ROC AUC
- Pipeline terstruktur untuk training, evaluasi, dan deployment model

---

## 📦 Dataset

**⚠️ File dataset terlalu besar untuk diunggah langsung ke GitHub. Silakan unduh manual melalui link berikut dan simpan di dalam folder `ml/data/`.**

### Dataset 1:
- Judul: *Skin Disease Dataset* (by PacificRM)  
- Link: [https://www.kaggle.com/datasets/pacificrm/skindiseasedataset](https://www.kaggle.com/datasets/pacificrm/skindiseasedataset)

### Dataset 2:
- Judul: *Skin Disease Dataset* (by Subir Biswas)  
- Link: [https://www.kaggle.com/datasets/subirbiswas19/skin-disease-dataset](https://www.kaggle.com/datasets/subirbiswas19/skin-disease-dataset)

---

## 🔍 Fitur Unggulan

- 🎨 Upload gambar kulit untuk klasifikasi penyakit
- 💡 Antarmuka diagnosis ringan dan edukatif hasil prediksi AI
- 📍 (Opsional) Peta apotek/klinik terdekat atau marketplace penyedia obat gratis
- 📖 Edukasi kesehatan kulit, video informatif, dan dokumentasi mandiri
- 📃 Riwayat konsultasi yang tersimpan secara lokal atau di cloud
- 📣 Form aspirasi masyarakat daerah 3T untuk menjembatani suara ke pemerintah daerah (on going)

---

## 🤝 Kolaborasi Tim

| Peran          | Tanggung Jawab                                         |
|----------------|--------------------------------------------------------|
| Front-End      | Desain UI/UX, implementasi fitur input/output user    |
| Back-End       | API, integrasi model ML, pengelolaan database         |
| Machine Learning | Training model, evaluasi, optimasi pipeline prediksi |

---

## 💻 📥 Cara Instalasi dan Menjalankan Aplikasi

### 🔧 Persyaratan
- Node.js & npm
- Python 3.8+
- pip
- MongoDB (lokal atau cloud)

### 🗂 Struktur Folder

```

.
├── front/                 # Front-End (Vite)
├── backend/               # Back-End (HAPI.js / FastAPI)
├── AI-image-detection/    # ML Service (FastAPI + TensorFlow)

````

### 🔹 1. Clone Repositori

```bash
git clone <URL_REPO>
cd <nama-folder-repo>
````

### 🔹 2. Install Dependensi

#### Front-End

```bash
cd front
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

#### AI/ML Service

```bash
cd ../AI-image-detection
pip install -r requirements.txt
```

### 🔹 3. Setup File Environment

#### `front/.env`

```env
VITE_API_BASE_URL=http://localhost:9000
```

#### `backend/.env`

```env
MONGO_URI=mongodb://localhost:27017/luminouskin
JWT_SECRET=your_secret_key
```

### 🔹 4. Menjalankan Aplikasi

#### Front-End

```bash
cd front
npm run dev
```

#### Backend (HAPI.js)

```bash
cd backend
npm run dev
```

#### AI/ML FastAPI

```bash
cd AI-image-detection
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 🔹 5. Jalankan Web Scraper (Opsional)

```bash
cd backend
node controllers/download-images.mjs
```

---

## 🌍 Dampak yang Diharapkan

- Membantu masyarakat di daerah 3T mendapatkan akses deteksi penyakit kulit secara digital
- Meningkatkan kesadaran dan edukasi kesehatan kulit melalui AI
- Mendukung upaya pencegahan penyakit menular dan penguatan layanan kesehatan digital berbasis komunitas

---

📌 **Catatan:** Proyek ini merupakan bagian dari kegiatan pembelajaran dan pengembangan nyata sebagai kontribusi mahasiswa terhadap isu kesehatan di Indonesia. Seluruh konten bersifat edukatif dan tidak menggantikan diagnosis medis profesional.
