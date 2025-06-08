import { Link } from 'react-router';

export const About = () => {
  return (
    <>
      <section className="relative w-full h-screen bg-cover bg-center bg-fixed bg-[url('/papuakulit.jpg')]">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative flex flex-col justify-center items-start h-full px-6 md:px-20 text-white space-y-6 text-left">
          <h2 className="text-xl md:text-6xl font-bold font-sans text-[#ffffff] max-w-4xl">Kulit sehat, hidup lebih nyaman</h2>
          <h3 className="text-2xl md:text-4xl font-sans max-w-3xl">Kami hadir untuk bantu kamu mengenali masalah kulit lebih cepat tanpa takut, malu, atau biaya mahal.</h3>
          <h4 className="text-2xl md:text-4xl font-sans max-w-3xl">Dengan dukungan teknologi dan tenaga farmasi, kami ingin menjangkau mereka yang jauh dari akses medis.</h4>
          <p className="text-base md:text-lg max-w-xl italic">Ini perjalanan kami, dan kamu adalah bagian penting di dalamnya.</p>
        </div>
      </section>
      <section id="about" className="pt-16 pb-8 bg-[#FAF8F1]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between gap-6 flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 px-4 h-full">
              <div className="bg-[#3B6790] rounded-2xl p-8 shadow-lg h-full flex flex-col justify-center">
                <h3 className="text-center font-bold font-sans text-white uppercase text-4xl md:text-5xl mb-4">Visi</h3>
                <p className="text-lg md:text-xl leading-relaxed text-center font-sans text-white">
                  Menjadi solusi digital yang inklusif dan terpercaya dalam mendukung kesehatan kulit masyarakat Indonesia, khususnya di wilayah 3T, dengan berkontribusi pada pencapaian SDGs Goal 3: Good Health & Well-Being.
                </p>
              </div>
            </div>

            <div className="md:w-1/2 px-4 h-full">
              <div className="bg-[#3B6790] rounded-2xl p-8 shadow-lg h-full flex flex-col justify-center">
                <h3 className="text-center font-bold font-sans text-white uppercase text-4xl md:text-5xl mb-4">Misi</h3>
                <div className="space-y-4 text-white text-lg md:text-xl leading-relaxed text-center font-sans">
                  <p>Menyediakan platform digital yang mampu melakukan deteksi dini penyakit kulit menular ringan melalui klasifikasi gambar berbasis teknologi.</p>
                  <p>Memberikan rekomendasi pengobatan yang aman, cepat, dan berbasis Obat Bebas Terbatas (OBT), untuk masyarakat dengan keterbatasan akses layanan medis.</p>
                  <p>Mengedukasi masyarakat tentang pentingnya penanganan penyakit kulit menular secara dini, agar tidak menyebar dan menimbulkan masalah kesehatan yang lebih besar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10 h-fit flex flex-col justify-center bg-[#E9F3F4] gap-10 items-center">
        <h2 className="text-center text-6xl font-bold font-sans text-[#002d52] max-w-screen">Journey</h2>
        <div className="px-4">
          <p className="text-xl md:text-2xl leading-relaxed text-center font-sans mb-5">
            Proyek ini muncul dari keprihatinan kami terhadap kasus penyakit kulit menular ringan di berbagai daerah di Indonesia, terutama di wilayah 3T (Tertinggal, Terdepan, dan Terluar). Kami menyadari bahwa penyakit seperti impetigo,
            panu, kurap, eksim, dan lain-lain sering dianggap sepele, padahal jika tidak ditangani dengan cepat dan benar, bisa menyebar luas dan menyebabkan infeksi pada kulit sehingga dapat menimbulkan rasa tidak nyaman, tidak percaya
            diri, dan dapat menularkan kepada orang lain, terutama untuk daerah yang aksesnya terhadap layanan medis masih jauh, terbatas, dan terhalang oleh biaya konsultasi yang lumayan mahal.
          </p>
        </div>
      </section>

      <section className="h-fit flex flex-col items-center bg-[#FAF8F1] bg-grey px-4 py-12">
        <h1 className="text-5xl  font-bold font-sans text-[#002d52] mb-10">Meet the Team</h1>
        {/* Card 1 */}
        <div className="flex flex-wrap justify-center gap-10 w-full max-w-screen-xl">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="/rafa.png" alt="Rafa Elfarizi" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Rafa Elfarizi
              <a href="https://www.linkedin.com/in/rafa-elfarizi-77b853223/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm text-gray-700 mt-2">Full Stack & Game Developer | Ahli Otomatisasi WhatsApp Bot | Misi: Menyatukan Kode, Estetika, dan Pengalaman Pengguna yang Menyenangkan.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="mukti.png" alt="Akhmad Mukti Setiaji" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Akhmad Mukti Setiaji
              <a href="https://www.linkedin.com/in/akhmad-mukti-setiaji-778905351/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm text-gray-700 mt-2">Mahasiswa Teknologi Informasi | Calon Pengembang Full-Stack | Pembelajar Frontend & Backend | Peserta Dicoding Bootcamp | Membangun Proyek Nyata | Tetap Belajar.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <div className="w-full h-56 overflow-hidden rounded-md mb-4">
              <img src="/fajar.png" alt="Fajar Pratama" className="w-full h-full object-cover" />
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
            <p className="text-sm text-gray-700 mt-2">Full Stack Developer Cohort | Tech Entusiast | Final-year Student Information Technology | Ready to Build Professional Network & Establish Career Success</p>
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="hilmi.png" alt="Hilmi Datu Allam" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Hilmi Datu Allam
              <a href="https://www.linkedin.com/in/datuallam/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm text-gray-700 mt-2">
              Informatics undergraduate at Telkom University with interests in machine learning and data science. I'm actively building skills to become a machine learning engineer by the time I graduate in 2026.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="Ratu.png" alt="Ratu Chairunisa" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Ratu Chairunisa
              <a href="https://www.linkedin.com/in/ratuchairunisa/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm text-gray-700 mt-2">Undergraduate Statistics Student | Developing ML Skills for Real-World Applications | Machine Learning Engineer Cohort at DBS Foundation Coding Camp.</p>
          </div>
          {/* Card 6 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-left">
            <img src="azka.png" alt="Azka Fahsya" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-lg font-bold flex items-center gap-1">
              Azka Fahsya
              <a href="https://www.linkedin.com/in/azka-fahsya-4a3249326/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] mt-[2px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm text-gray-700 mt-2">Data Enthusiast | Machine Learning Engineer | Junior Data Science | Informatics Engineering Student at Krisnadwipayana University</p>
          </div>
        </div>
      </section>
      <section className="bg-[#3B6790] text-white px-6 py-10">
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
