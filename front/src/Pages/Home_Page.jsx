import HorizontalScrollSection from '@/components/card-scroller';
import { FeedbackForm } from '@/components/FeedbackForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Bandage, Book, Bot, Map } from 'lucide-react';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen bg-cover bg-center bg-[url('/bg_hero.jpg')] bg-fixed">
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left min-h-[80vh] pt-24 md:pt-40 px-6 md:px-20 text-white space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-xl leading-tight">Luminou§kin</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold max-w-xl leading-snug">Pelayanan Kesehatan yang Dapat Diakses oleh Setiap Komunitas</h2>
          <p className="text-base sm:text-lg md:text-xl max-w-lg">Menghubungkan daerah pedesaan dengan solusi medis profesional melalui teknologi canggih dan perawatan penuh kasih sayang.</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg text-white font-medium transition" onClick={() => navigate('/upload-penyakit')}>
              Diagnosa
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition" onClick={() => navigate('/education')}>
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="flex justify-center items-center px-4 py-16 bg-[#03346E]">
        <div className="max-w-4xl text-center text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote className="text-2xl italic font-medium">
            "Pelayanan kesehatan adalah hak - bukan hak istimewa. Kami menggunakan teknologi untuk memberikan diagnosis dan edukasi ke setiap desa, pulau, dan keluarga di Indonesia."
          </blockquote>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section ref={containerRef} className="bg-white py-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#002d52] font-quicksand font-black text-center mb-10">Fitur yang Disediakan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { icon: <Bot className="h-10 w-10" />, title: 'Diagnosa Online', desc: 'Foto dan Scan kulit untuk mendeteksi tanda-tanda penyakit kulit' },
            { icon: <Bandage className="h-10 w-10" />, title: 'Saran Pengobatan', desc: 'Cari Tahu Obat yang kamu butuhkan untuk penyembuhan' },
            { icon: <Map className="h-10 w-10" />, title: 'Pelayanan Terdekat', desc: 'Cari Apotek, Klinik atau pelayanan kesehatan terdekat' },
            { icon: <Book className="h-10 w-10" />, title: 'Edukasi Kesehatan', desc: 'Pelajari cara penyembuhan dan pencegahan penyakit kulit' },
          ].map((feature, idx) => (
            <Card key={idx} className="feature-card border-t-4 border-sky-300 hover:shadow-2xl flex flex-col justify-between">
              <CardHeader className="flex flex-col items-center justify-center">
                {feature.icon}
                <CardTitle className="text-xl sm:text-2xl text-[#002d52] text-center font-quicksand mt-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-[#002d52] text-center font-light">{feature.desc}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Coba</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <HorizontalScrollSection />

      {/* TESTIMONIAL SECTION */}
      <section className="bg-cover bg-fixed bg-center py-16 px-4" style={{ backgroundImage: "url('/hahaay.jpg')" }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl text-[#002d52] font-black mb-12">Kesaksian Pengguna</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'Saya merasa sangat terbantu. Diagnosisnya tepat dan solusinya mudah dimengerti. Luminouskin sangat bermanfaat, terutama bagi kami di pelosok yang akses kesehatannya terbatas. Sebelumnya, saya harus menunggu kunjungan tenaga medis yang datang sebulan sekali. Tapi sekarang, hanya dengan foto dari kamera HP saya, saya sudah bisa tahu masalah kulit yang saya alami dan bagaimana mengatasinya. Sebagai petani dan ibu dari tiga anak, waktu saya sangat terbatas, jadi kemudahan ini benar-benar menyelamatkan saya.',
                name: 'Dian, Papua Barat',
                role: 'Petani & Ibu 3 Anak',
              },
              {
                quote:
                  'Akhirnya, saya bisa memahami masalah kulit saya tanpa harus menempuh perjalanan 3 jam ke klinik. Awalnya saya ragu, tapi setelah mencoba Luminouskin dan melihat hasil diagnosanya, saya jadi lebih yakin. Penjelasannya jelas, tidak menggunakan istilah medis yang sulit dipahami, dan saya merasa dilayani seperti di klinik sungguhan. Ini sangat membantu ibu rumah tangga seperti saya yang tinggal jauh dari fasilitas kesehatan.',
                name: 'Ria, Nusa Tenggara Timur',
                role: 'Ibu Rumah Tangga',
              },
              {
                quote:
                  'Layanan ini membantu kami menjangkau lebih banyak orang dengan cepat dan memberikan saran perawatan kulit yang akurat. Di puskesmas kami yang terletak di daerah cukup terpencil, jumlah tenaga medis terbatas. Dengan Luminouskin, kami bisa mengedukasi warga tentang kondisi kulit mereka bahkan sebelum mereka datang langsung. Ini bukan hanya soal teknologi, tapi soal meningkatkan kualitas hidup masyarakat pedesaan.',
                name: 'Ardi Sitorus, Kalimantan Barat',
                role: 'Mahasiswa IT & Volunteer',
              },
            ].map((t, i) => (
              <figure key={i} className="shadow-xl bg-[#3674B5] rounded-xl p-8 text-white">
                <blockquote>
                  <p className="text-base font-medium">“{t.quote}”</p>
                </blockquote>
                <figcaption className="mt-4 font-medium">
                  <div>{t.name}</div>
                  <div className="text-sm text-slate-200">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="bg-[#e9f4f4] px-4 py-10">
        <FeedbackForm />
      </section>

      {/* FOOTER SECTION */}
      <section className="bg-[#3B6790] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h1 className="text-3xl font-bold mb-4">Luminou§kin</h1>
            <p className="text-sm">Solusi digital inklusif untuk kesehatan kulit masyarakat Indonesia.</p>
          </div>
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
