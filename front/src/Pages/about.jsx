import { Link } from 'react-router';

export const About = () => {
  return (
    <>
      <section className="relative w-full h-screen bg-cover bg-center bg-fixed bg-[url('/papuakulit.jpg')]">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative flex flex-col justify-center items-start h-full px-6 md:px-20 text-white space-y-6 text-left">
          <h2 className="text-xl md:text-6xl font-bold max-w-4xl">Kulit sehat, hidup lebih nyaman</h2>
          <h3 className="text-2xl md:text-4xl font-semibold max-w-3xl">Kami hadir untuk bantu kamu mengenali masalah kulit lebih cepat tanpa takut, malu, atau biaya mahal.</h3>
          <h4 className="text-2xl md:text-4xl font-medium max-w-3xl">Dengan dukungan teknologi dan tenaga farmasi, kami ingin menjangkau mereka yang jauh dari akses medis.</h4>
          <p className="text-base md:text-lg max-w-xl italic">Ini perjalanan kami, dan kamu adalah bagian penting di dalamnya.</p>
        </div>
      </section>
      <section id="about" class="pt-15 pb-4 bg-blue-100">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center">
            <div class="w-full md:w-1/2 px-4 mb-10">
              <h3 class="text-center font-bold uppercase text-primary text-5xl mb-3">Visi</h3>
              <p className="text-xl md:text-2xl leading-relaxed text-center mb-5">
                Menjadi solusi digital yang inklusif dan terpercaya dalam mendukung kesehatan kulit masyarakat Indonesia, khususnya di wilayah 3T, dengan berkontribusi pada pencapaian SDGs Goal 3: Good Health & Well-Being.
              </p>
            </div>

            <div class="w-full md:w-1/2 px-4 mb-10">
              <h3 class="text-center font-bold uppercase text-primary text-5xl mb-3">Misi</h3>
              <div class="text-center text-lg leading-relaxed space-y-4">
                <p className="text-xl md:text-2xl leading-relaxed text-center mb-5"> Menyediakan platform digital yang mampu melakukan deteksi dini penyakit kulit menular ringan melalui klasifikasi gambar berbasis teknologi.</p>
                <p className="text-xl md:text-2xl leading-relaxed text-center mb-5">Memberikan rekomendasi pengobatan yang aman, cepat, dan berbasis Obat Bebas Terbatas (OBT), untuk masyarakat dengan keterbatasan akses layanan medis.</p>
                <p className="text-xl md:text-2xl leading-relaxed text-center mb-5">
                  Mengedukasi masyarakat tentang pentingnya penanganan penyakit kulit menular secara dini, agar tidak menyebar dan menimbulkan masalah kesehatan yang lebih besar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10 h-fit flex flex-col justify-center bg-blue-200 gap-10 items-center">
        <h2 className="text-center text-6xl font-bold max-w-screen">Journey</h2>
        <div className="px-4">
          <p className="text-xl md:text-2xl leading-relaxed text-center mb-5">
            Proyek ini muncul dari keprihatinan kami terhadap kasus penyakit kulit menular ringan di berbagai daerah di Indonesia, terutama di wilayah 3T (Tertinggal, Terdepan, dan Terluar). Kami menyadari bahwa penyakit seperti impetigo,
            panu, kurap, eksim, dan lain-lain sering dianggap sepele, padahal jika tidak ditangani dengan cepat dan benar, bisa menyebar luas dan menyebabkan infeksi pada kulit sehingga dapat menimbulkan rasa tidak nyaman, tidak percaya
            diri, dan dapat menularkan kepada orang lain, terutama untuk daerah yang aksesnya terhadap layanan medis masih jauh, terbatas, dan terhalang oleh biaya konsultasi yang lumayan mahal.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-center">
            Selama masa eksplorasi ide project, kami mencoba untuk menggabungkan sudut pandang teknologi dan domain knowledge yang kami miliki pada bidang farmasi. Pengetahuan tersebut menjadi landasan penting dalam merancang sistem
            rekomendasi obat berdasarkan hasil klasifikasi gambar. Obat-obat yang kami gunakan dalam rekomendasi adalah kategori Obat Bebas Terbatas (OBT) yang aman jika digunakan tanpa resep dokter—sehingga relevan untuk kondisi masyarakat
            yang tidak bisa langsung berkonsultasi dengan tenaga medis karena terhalang jarak dan biaya yang lumayan mahal.
          </p>
        </div>
      </section>

      <section className="h-fit flex flex-col items-center bg-blue-300 px-4 py-12">
        <h1 className="text-5xl font-quicksand font-black mb-10">Meet the Team</h1>
        <div className="flex flex-wrap justify-center gap-10 w-full max-w-screen-xl">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <div className="w-full h-56 overflow-hidden rounded-md mb-4">
              <img src="/fajar.jpg" alt="Fajar Pratama" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-bold flex items-center gap-1">
              Fajar Pratama
              <a href="https://www.linkedin.com/in/fajarpratama2610" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm text-gray-700 mt-2">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="fajar.jfif" alt="Rafa Elfarizi" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Rafa Elfarizi
              <a href="https://www.linkedin.com/in/rafa-elfarizi-77b853223/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm text-gray-700 mt-2">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="fajar.jfif" alt="Akhmad Mukti Setiaji" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Akhmad Mukti Setiaji
              <a href="https://www.linkedin.com/in/akhmad-mukti-setiaji-778905351/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm text-gray-700 mt-2">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>
          {/* Card 4 */}

          {/* Card 5 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="fajar.jfif" alt="Hilmi Datu Allam" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Hilmi Datu Allam
              <a href="https://www.linkedin.com/in/datuallam/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm text-gray-700 mt-2">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="Ratu.jpg" alt="Ratu Chairunisa" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Ratu Chairunisa
              <a href="https://www.linkedin.com/in/ratuchairunisa/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm text-gray-700 mt-2">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>
          {/* Card 6 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="fajar.jfif" alt="Azka Fahsya" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Azka Fahsya
              <a href="https://www.linkedin.com/in/azka-fahsya-4a3249326/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm text-gray-700 mt-2">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>
        </div>
      </section>
      <section className="bg-blue-400 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo / Brand */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Luminou§kin</h1>
            <p className="text-sm">Solusi digital inklusif untuk kesehatan kulit masyarakat Indonesia.</p>
          </div>

          {/* About */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Website
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Education</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Skin Disease Type
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Drug Recommendation
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Tips Health Skin
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Legal</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
