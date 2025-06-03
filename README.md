# 🌟 Lumìnou§kin

**Luminouskin** adalah proyek capstone hasil kolaborasi lintas tim (Front-End, Back-End, dan Machine Learning) yang bertujuan menyediakan solusi digital untuk deteksi dini dan edukasi penyakit kulit menular yang umum di Indonesia. Proyek ini dikembangkan sebagai kontribusi nyata terhadap *Sustainable Development Goals* (SDGs) – Goal 3: Good Health & Well-Being, khususnya Target 3.3: *Mengakhiri epidemi dan melawan penyakit menular*.

## 📌 Latar Belakang Masalah

Penyakit kulit menular seperti **impetigo, scabies, kurap, panu**, dan **eksim** masih menjadi masalah kesehatan yang meluas, terutama di daerah **3T (Tertinggal, Terdepan, Terluar)**. Masalah ini dipicu oleh:

- Kurangnya kesadaran akan gejala awal dan pencegahan.
- Minimnya akses ke tenaga medis dan obat-obatan.
- Informasi digital kesehatan yang belum merata dan kredibel.
- Keterbatasan sanitasi, terutama saat musim hujan atau pasca-bencana.

Akibatnya, penyakit ini mudah menyebar, sulit dikendalikan, dan berdampak pada masyarakat berpenghasilan rendah maupun komunitas umum.

## 🎯 Tujuan Proyek

- Menyediakan **deteksi dini otomatis** penyakit kulit menular ringan menggunakan model *Computer Vision*.
- Memberikan **edukasi pengobatan dan pencegahan** berbasis AI untuk masyarakat umum.
- Menghadirkan antarmuka aplikasi yang **user-friendly dan informatif** agar dapat diakses di daerah dengan keterbatasan infrastruktur.

## 📦 Dataset

**⚠️ File dataset terlalu besar untuk diunggah langsung ke GitHub. Silakan unduh manual melalui link berikut dan simpan di dalam folder `ml/data/`.**

### Dataset 1:
- Judul: *Skin Disease Dataset* (by PacificRM)  
- Link: [https://www.kaggle.com/datasets/pacificrm/skindiseasedataset](https://www.kaggle.com/datasets/pacificrm/skindiseasedataset)

### Dataset 2:
- Judul: *Skin Disease Dataset* (by Subir Biswas)  
- Link: [https://www.kaggle.com/datasets/subirbiswas19/skin-disease-dataset](https://www.kaggle.com/datasets/subirbiswas19/skin-disease-dataset)

## 🛠️ Teknologi yang Digunakan

### 🔹 Front-End
- Framework: TailwindCss
- Fitur utama:
  - Upload gambar kulit
  - Antarmuka diagnosis ringan dan edukatif
  - Peta apotek/klinik terdekat
  - 

### 🔹 Back-End
- API Server: FastAPI / Flask
- Database: Mongo DB
- Integrasi:
  - Model ML untuk prediksi penyakit
  - Sistem rekomendasi berbasis hasil prediksi
  - Endpoints untuk komunikasi antara client dan server

### 🔹 Machine Learning
- Model CNN (Convolutional Neural Network) untuk klasifikasi gambar penyakit kulit
- Transfer learning dengan dataset augmented
- Evaluasi model: Accuracy, Precision, Recall, F1-Score, ROC AUC
- Pipeline terstruktur untuk training, evaluasi, dan deployment model

## 🔍 Fitur Unggulan

- 🎨 Upload gambar kulit untuk klasifikasi penyakit
- 💡 Antarmuka diagnosis ringan dan edukatif hasil prediksi AI
- 📍 (Opsional) Peta apotek/klinik terdekat atau marketplace penyedia obat gratis
- 📖 Edukasi kesehatan kulit, video informatif, dan dokumentasi mandiri
- 📃 Riwayat konsultasi yang tersimpan secara lokal atau di cloud
- 📣 Form aspirasi masyarakat daerah 3T untuk menjembatani suara ke pemerintah daerah (on going)

## 🤝 Kolaborasi Tim

| Peran          | Tanggung Jawab                                         |
|----------------|--------------------------------------------------------|
| Front-End      | Desain UI/UX, implementasi fitur input/output user    |
| Back-End       | API, integrasi model ML, pengelolaan database         |
| Machine Learning | Training model, evaluasi, optimasi pipeline prediksi |

## 🌍 Dampak yang Diharapkan

- Membantu masyarakat di daerah 3T mendapatkan akses deteksi penyakit kulit secara digital
- Meningkatkan kesadaran dan edukasi kesehatan kulit melalui AI
- Mendukung upaya pencegahan penyakit menular dan penguatan layanan kesehatan digital berbasis komunitas

---

📌 **Catatan:** Proyek ini merupakan bagian dari kegiatan pembelajaran dan pengembangan nyata sebagai kontribusi mahasiswa terhadap isu kesehatan di Indonesia. Seluruh konten bersifat edukatif dan tidak menggantikan diagnosis medis profesional.
