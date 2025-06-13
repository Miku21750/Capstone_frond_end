import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, MessageCircleQuestion, Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sparkles, Stethoscope, Leaf, Pill } from 'lucide-react';

import ApiRequest from '@/api';

import Swal from 'sweetalert2';

export const SkinCondition = () => {
  const { name } = useParams();
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conditions.length === 0 && loading) {
      Swal.fire({
        title: 'Loading conditions...',
        text: 'Please wait while we fetch the data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    ApiRequest.get('/api/list-skin-condition')
      .then((res) => {
        setConditions(res.data);
        const matched = res.data.find((condition) => slugify(condition.name) === name);

        setSelectedCondition(matched || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch conditions', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching the data.',
        });
        setLoading(false);
      })
      .finally(() => {
        Swal.close();
      });
  }, [name, loading, conditions.length]); // Add conditions.length to dependency array

  useEffect(() => {
    if (conditions.length > 0) {
      const matched = conditions.find((condition) => slugify(condition.name) === name);
      setSelectedCondition(matched || null);
    }
  }, [name, conditions]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  if (loading && conditions.length === 0) {
    return (
      <section className="flex items-center justify-center min-h-[60vh] p-4 bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Memuat konten...</p>
          {/* You could add a simple spinner here if Swal is not visible */}
        </div>
      </section>
    );
  }

  if (!selectedCondition) {
    return (
      <section className="flex items-center justify-center min-h-[60vh] p-4 bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600">Condition not found.</p>
          <p className="text-gray-600 mt-2">Please check the URL or try searching for another condition.</p>
        </div>
      </section>
    );
  }

  const filteredConditions = conditions.filter((condition) => condition.name.toLowerCase().includes(searchKeyword.toLowerCase()));

  const tocSections = [];
  let currentH2 = null;

  selectedCondition.sections.forEach((section, index) => {
    section.id = `section-${index}`; // Ensure unique IDs for scrolling

    if (section.level === 'h2') {
      currentH2 = {
        ...section,
        children: [],
      };
      tocSections.push(currentH2);
    } else if (section.level === 'h3' && currentH2) {
      currentH2.children.push(section);
    }
  });

  return (
    <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-screen bg-[#E9F3F4] text-gray-800">
      {/* Main content area */}
      <section className="flex-1 w-auto lg:mr-80 px-4 py-8 lg:px-8 lg:py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-6 sm:mb-10 leading-tight">
          {selectedCondition.name}
        </h1>

        <div className=" p-5 lg:hidden"> 
          <h2 className="font-bold text-2xl text-blue-800 mb-6">Di halaman ini</h2>
          <ul className="space-y-3 text-gray-700 border-4 w-fit p-5 border-blue-200 rounded-lg">
            {tocSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="font-semibold text-sm hover:text-blue-600 transition-colors duration-200 block py-1"
                >
                  {section.heading}
                </a>
                {section.children.length > 0 && (
                  <ul className="ml-5 mt-2 space-y-1 text-gray-600 border-l-2 border-blue-100 pl-4">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className="hover:text-blue-600 transition-colors duration-200 block py-1"
                        >
                          {child.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div> 


        <div className="space-y-8 sm:space-y-10">
          {tocSections.map((section) => (
            <article key={section.id} id={section.id} className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">{section.heading}</h2>
              <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                {section.content}
              </p>

              {section.children.map((child, idx) => (
                <div key={child.id} id={child.id} className="mt-6 sm:mt-8 ml-4 sm:ml-8 pl-4 border-l-4 border-blue-200">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">{child.heading}</h3>
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                    {child.content}
                  </p>
                </div>
              ))}
            </article>
          ))}
        </div>

        {selectedCondition.images && selectedCondition.images.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">Galeri Gambar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCondition.images.map((image, index) => (
                <figure key={index} className="group relative overflow-hidden rounded-lg shadow-md bg-white border border-gray-100">
                  <img
                    src={image.supabaseUrl || image.src || `${import.meta.env.VITE_API_BASE_URL}${image.localPath}`}
                    alt={image.alt || 'Skin condition image'}
                    title={image.title || image.alt || 'Skin condition image'}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  />
                  <figcaption className="p-3 text-sm text-gray-600">
                    {image.title || image.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Right-aligned Table of Contents (TOC) sidebar */}
      <aside className="hidden lg:block fixed right-0 top-0 h-screen w-80 bg-white shadow-xl border-l border-gray-100 p-8 overflow-y-auto z-30">
        <div className="pt-24"> 
          <h2 className="font-bold text-3xl text-blue-800 mb-6">On this page</h2>
          <ul className="space-y-3 text-gray-700">
            {tocSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="font-semibold text-lg hover:text-blue-600 transition-colors duration-200 block py-1"
                >
                  {section.heading}
                </a>
                {section.children.length > 0 && (
                  <ul className="ml-5 mt-2 space-y-2 text-gray-600 border-l-2 border-blue-100 pl-4">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className="hover:text-blue-600 transition-colors duration-200 block py-1"
                        >
                          {child.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};
export const Overviewinfo = () => {
  return (
    <section className="p-5 flex flex-col gap-5 bg-[#E9F3F4]">
      <h1 className={' text-4xl font-quicksand font-bold'}>Perkenalan</h1>
      <h1 className={' text-2xl font-quicksand'}>Memahami Penyakit Kulit</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <MessageCircleQuestion className="h-10 w-10" />
            <CardTitle className="text-2xl font-bold">Apa itu Penyakit Kulit?</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Penyakit kulit adalah berbagai macam kondisi yang memengaruhi kulit, termasuk infeksi, peradangan, reaksi alergi, dan gangguan autoimun.
            <br />
            <br />
            Kondisi ini dapat menyebabkan ruam, gatal, kemerahan, pembengkakan, lepuh, atau perubahan lain pada tampilan atau tekstur kulit. Sementara beberapa penyakit kulit bersifat sementara dan tidak berbahaya, yang lain mungkin
            memerlukan perawatan jangka panjang atau menandakan masalah kesehatan yang lebih dalam.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <AlertCircle className="w-10 h-10" />
            <CardTitle className="text-2xl font-bold">Mengapa Kesehatan Kulit Penting?</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Kulit Anda adalah organ terbesar di tubuh Anda dan bertindak sebagai garis pertahanan pertama melawan patogen dan faktor lingkungan yang berbahaya.
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Mengatur suhu tubuh dan mencegah hilangnya air.</li>
              <li>Kulit yang sehat mencerminkan kesejahteraan dan kepercayaan diri secara keseluruhan.</li>
              <li>Kulit yang terabaikan dapat menyebabkan penyakit kronis dan infeksi.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <User className="w-10 h-10" />
            <CardTitle className="text-2xl font-bold">Siapa yang Dapat Terkena Dampak?</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Penyakit kulit dapat menyerang siapa saja tanpa memandang usia, jenis kelamin, atau suku.
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <Badge>Bayi:</Badge>Kondisi seperti ruam popok dan kerak kepala.
              </li>
              <li>
                <Badge>Remaja:</Badge> Jerawat karena perubahan hormonal.
              </li>
              <li>
                <Badge>Dewasa:</Badge>Eksim, psoriasis, infeksi, atau kerusakan akibat sinar matahari.
              </li>
              <li>
                <Badge>Senior:</Badge> Kondisi terkait usia seperti kulit kering dan kanker kulit.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Sun className="w-10 h-10" />
            <CardTitle className="text-2xl font-bold">Kondisi Kulit yang Paling Umum</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Jutaan orang menderita berbagai kondisi kulit setiap tahun. Yang paling umum meliputi:
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <Badge variant={'destructive'}>Jerawat:</Badge> Pori-pori tersumbat oleh minyak dan sel kulit mati.
              </li>
              <li>
                <Badge variant={'destructive'}>Eksim:</Badge> Bercak gatal dan meradang yang disebabkan oleh faktor lingkungan atau genetik.
              </li>
              <li>
                <Badge variant={'destructive'}>Psoriasis:</Badge> Kondisi autoimun yang menyebabkan kulit tebal dan bersisik.
              </li>
              <li>
                <Badge variant={'destructive'}>Rosacea:</Badge> Kemerahan dan pembuluh darah terlihat sering pada wajah.
              </li>
              <li>
                <Badge variant={'destructive'}>Infeksi jamur:</Badge> Seperti kutu air atau kurap, biasanya disebabkan oleh kelembaban dan bakteri.
              </li>
              <li>
                <Badge variant={'destructive'}>Kanker kulit:</Badge> Sering kali disebabkan oleh paparan sinar matahari jangka panjang dan kerusakan UV.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="p-5">
        <h1></h1>
      </div>
    </section>
  );
};

export const DailySkincareRoutine = () => {
  return (
    <div className="">
      <Card className={' p-6 '}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">🕐 Rutinitas Perawatan Kulit Harian</CardTitle>
        </CardHeader>

        <CardContent className="text-base leading-relaxed text-muted-foreground space-y-4">
          <section>
            <p>
              Rutinitas perawatan kulit harian yang konsisten membantu menjaga lapisan kulit tetap bersih, terhidrasi, dan seimbang. Rutinitas ini mencegah timbulnya jerawat, tanda-tanda awal penuaan, dan melindungi kulit Anda dari tekanan
              lingkungan seperti polusi atau sinar UV.
            </p>
          </section>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className={'ring-2 ring-amber-200 '}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-1">
                  <Sun /> Langkah-langkah Perawatan Kulit di Pagi Hari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-3 space-y-1">
                  <li>
                    <Badge className={'bg-amber-300'}>1</Badge> <strong>Pembersih:</strong> Cuci wajah Anda dengan lembut untuk menghilangkan minyak dan keringat akibat tidur.
                  </li>
                  <li>
                    <Badge className={'bg-amber-300'}>2</Badge> <strong>Toner:</strong> Menyeimbangkan pH kulit Anda dan mempersiapkannya untuk pelembab.
                  </li>
                  <li>
                    <Badge className={'bg-amber-300'}>3</Badge> <strong>Pelembab:</strong> Menjaga kulit tetap terhidrasi dan halus.
                  </li>
                  <li>
                    <Badge className={'bg-amber-300'}>4</Badge> <strong>Sunscreen (SPF 30+):</strong> Penting untuk melindungi dari kerusakan UV, bahkan di dalam ruangan.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className={'ring-2 ring-fuchsia-200 '}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-1">
                  <Moon />
                  Langkah-langkah Perawatan Kulit Malam Hari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-3 space-y-1">
                  <li>
                    <Badge className={'bg-fuchsia-200'}>1</Badge> <strong>Penghapus Makeup/Minyak Pembersih:</strong> Menghapus riasan dan kotoran.
                  </li>
                  <li>
                    <Badge className={'bg-fuchsia-200'}>2</Badge> <strong>Pembersih Lembut:</strong> Lanjutkan dengan membersihkan pori-pori secara mendalam.
                  </li>
                  <li>
                    <Badge className={'bg-fuchsia-200'}>3</Badge> <strong>Pelembab Malam:</strong> Menyembuhkan dan menghidrasi sepanjang malam.
                  </li>
                  <li>
                    <Badge className={'bg-fuchsia-200'}>4</Badge> <strong>Serum atau Perawatan:</strong>Gunakan produk dengan bahan-bahan seperti Vitamin C atau Retinol berdasarkan jenis kulit Anda.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <section className="bg-cold-3 p-4 rounded-md border border-cold-4 mt-6">
            <h3 className="text-lg font-semibold mb-1">Kebiasaan & Tips yang Bermanfaat</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Gantilah sarung bantal dan handuk wajah secara rutin.</li>
              <li>Hindari menyentuh wajah saat beraktivitas.</li>
              <li>Minumlah setidaknya 8 gelas air setiap hari.</li>
              <li>Jangan terlalu sering eksfoliasi – cukup 1–2 kali seminggu.</li>
              <li>Pilih produk perawatan sesuai jenis kulit Anda (berminyak, kering, sensitif, kombinasi).</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export const HygieneAdvice = () => {
  return (
    <div className="p-6 mx-auto ">
      <h2 className="text-3xl font-bold mb-4">🧼 Kebersihan Pribadi untuk Kulit Sehat</h2>
      <p className="text-muted-foreground mb-6">
        Menjaga kebersihan yang baik membantu mencegah penumpukan bakteri, pori-pori tersumbat, dan peradangan. Berikut adalah kebiasaan penting untuk menjaga kulit tetap bersih, seimbang, dan tahan terhadap gangguan.
      </p>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="1">
          <AccordionTrigger>Cuci Wajah Dua Kali Sehari</AccordionTrigger>
          <AccordionContent>
            Mencuci wajah di pagi hari menghilangkan minyak dan keringat selama tidur, sedangkan malam hari membersihkan polusi, tabir surya, dan kotoran. Gunakan pembersih lembut yang sesuai dengan jenis kulit Anda.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="2">
          <AccordionTrigger>Ganti Sarung Bantal dan Handuk Secara Rutin</AccordionTrigger>
          <AccordionContent>Kain yang kotor menumpuk minyak, bakteri, dan sel kulit mati. Gantilah sarung bantal setiap 2–3 hari dan handuk minimal dua kali seminggu.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="3">
          <AccordionTrigger>Jaga Kebersihan Tangan dan Kuku</AccordionTrigger>
          <AccordionContent>Menyentuh wajah dengan tangan yang kotor memindahkan mikroba. Potong dan bersihkan kuku secara teratur karena kuku sering menyimpan kotoran dan kuman.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="4">
          <AccordionTrigger>Sanitasi Alat Pribadi</AccordionTrigger>
          <AccordionContent>Pisau cukur, pinset, dan kuas makeup dapat membawa bakteri jika tidak dibersihkan. Sanitasi alat-alat ini setiap minggu untuk menghindari infeksi atau jerawat.</AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-10 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <h3 className="font-semibold mb-2 text-blue-800">💡 Kiat Profesional:</h3>
        <p className="text-blue-700">Hindari terlalu sering mencuci kulit — menghilangkan minyak alami dapat menyebabkan kulit kering dan bahkan memicu lebih banyak produksi minyak.</p>
      </div>
    </div>
  );
};

import { Heart, BedDouble, Droplet, Dumbbell, Utensils, Smile } from 'lucide-react';

const tips = [
  {
    title: 'Minum Air Secukupnya',
    desc: 'Minumlah setidaknya 2 liter air setiap hari. Hidrasi membantu regenerasi sel dan detoksifikasi tubuh.',
    icon: <Droplet className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Cukupi Waktu Tidur',
    desc: 'Tidur membantu memperbaiki kulit, menyeimbangkan hormon, dan mengurangi mata bengkak atau kulit kusam.',
    icon: <BedDouble className="w-6 h-6 text-purple-500" />,
  },
  {
    title: 'Olahraga Secara Teratur',
    desc: 'Meningkatkan sirkulasi darah, mengantarkan oksigen ke kulit, dan menjaga warna kulit tetap sehat.',
    icon: <Dumbbell className="w-6 h-6 text-green-500" />,
  },
  {
    title: 'Konsumsi Makanan Seimbang',
    desc: 'Buah, sayur, lemak sehat, dan protein tanpa lemak membantu menutrisi kulit dari dalam.',
    icon: <Utensils className="w-6 h-6 text-amber-500" />,
  },
  {
    title: 'Hindari Merokok & Alkohol',
    desc: 'Merokok dan alkohol merusak kolagen, membuat kulit kering, dan mempercepat penuaan.',
    icon: <Heart className="w-6 h-6 text-red-500" />,
  },
  {
    title: 'Kelola Stres',
    desc: 'Stres kronis dapat menyebabkan jerawat, eksim, atau gangguan kulit lainnya. Lakukan relaksasi dan mindfulness.',
    icon: <Smile className="w-6 h-6 text-pink-500" />,
  },
];

export const LifestyleChoices = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-4">🌿 Kebiasaan Gaya Hidup untuk Kulit yang Bercahaya</h2>
      <p className="text-muted-foreground mb-8">Pilihan harian Anda membentuk kesehatan kulit Anda. Strategi jangka panjang ini membantu mencegah iritasi, peradangan, dan penuaan dini — mendukung kilau alami kulit.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <Card key={index} className="flex items-start p-4 space-x-4">
            <div className="shrink-0">{tip.icon}</div>
            <CardContent className="p-0">
              <h3 className="font-semibold text-lg mb-1">{tip.title}</h3>
              <p className="text-muted-foreground text-sm">{tip.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 bg-green-50 p-4 rounded-xl border border-green-100">
        <h3 className="font-semibold mb-2 text-green-800">🧠 Catatan Penting:</h3>
        <p className="text-green-700">Konsistensi adalah kunci — perbaikan kecil yang dilakukan setiap hari akan menghasilkan perubahan besar jangka panjang dalam ketahanan dan kejernihan kulit Anda.</p>
      </div>
    </div>
  );
};

import { CheckCircle, Shield, Glasses, Clock3 } from 'lucide-react';
const steps = [
  {
    title: 'Gunakan Tabir Surya Setiap Hari',
    desc: 'Pilih SPF 30+ spektrum luas dan aplikasikan secara merata ke kulit yang terpapar — bahkan saat cuaca mendung.',
    icon: <Sun className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: 'Oleskan Ulang Setiap 2 Jam',
    desc: 'Tabir surya kehilangan efektivitasnya seiring waktu, terutama setelah berkeringat atau berenang.',
    icon: <Clock3 className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Gunakan Pakaian Pelindung',
    desc: 'Gunakan topi bertepi lebar, kacamata hitam pelindung UV, dan pakaian berlengan panjang saat berada di luar ruangan.',
    icon: <Shield className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Hindari Jam UV Tertinggi',
    desc: 'Sinar matahari paling kuat antara pukul 10 pagi – 4 sore. Cari tempat teduh jika memungkinkan.',
    icon: <Glasses className="w-6 h-6 text-purple-500" />,
  },
];

export const SunProtection = () => {
  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold mb-4">☀️ Perlindungan Matahari yang Esensial</h2>
      <p className="text-muted-foreground mb-6">Paparan sinar UV adalah penyebab utama penuaan dini, hiperpigmentasi, dan kanker kulit. Berikut cara melindungi kulit Anda setiap hari.</p>

      <div className="space-y-6 border-l-4 border-yellow-400 pl-9 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-6 top-1">{step.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
        <h3 className="font-semibold mb-2 text-yellow-800">⚠️ Tahukah Anda?</h3>
        <p className="text-yellow-700">Bahkan paparan matahari yang singkat (seperti berjalan ke sekolah atau tempat kerja) bisa berdampak. Jadikan penggunaan tabir surya sebagai kebiasaan yang tidak bisa ditawar!</p>
      </div>
    </div>
  );
};

export const OverTheCounter = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-cold-7">Perawatan Tanpa Resep (OTC) untuk Kondisi Kulit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base text-muted-foreground">
          <p>
            Perawatan tanpa resep (OTC) adalah obat yang bisa dibeli tanpa resep dokter, tersedia di apotek dan toko daring. Biasanya digunakan sebagai lini pertama untuk mengatasi kondisi kulit umum seperti jerawat, eksim, dan infeksi
            jamur. Produk OTC bervariasi berdasarkan bahan aktif, tujuan, dan kecocokan dengan jenis kulit.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">Perawatan Jerawat</AccordionTrigger>
              <AccordionContent>
                <p>
                  Bahan seperti <strong>benzoyl peroxide</strong> (membunuh bakteri penyebab jerawat), <strong>salicylic acid</strong> (mengelupas pori-pori), dan <strong>adapalene</strong> (retinoid) sering digunakan. Tersedia dalam bentuk
                  pembersih, krim, dan gel.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">Mengatasi Eksim</AccordionTrigger>
              <AccordionContent>
                <p>
                  Krim OTC yang mengandung <strong>colloidal oatmeal</strong>, <strong>ceramides</strong>, atau <strong>hydrocortisone</strong> membantu meredakan peradangan, gatal, dan kulit kering.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">Infeksi Jamur</AccordionTrigger>
              <AccordionContent>
                <p>
                  <strong>Clotrimazole</strong>, <strong>miconazole</strong>, dan <strong>terbinafine</strong> adalah krim antijamur umum untuk kutu air, kurap, dan infeksi jamur lainnya.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-cold-2 p-4 rounded-md border-l-4 border-cold-4">
            <p>
              <strong>Penting:</strong> Selalu baca label produk dan lakukan tes tempel sebelum mencoba perawatan OTC baru. Jika gejala tidak membaik, konsultasikan dengan tenaga medis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Prescription = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-cold-7">Perawatan dengan Resep Dokter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-base text-muted-foreground">
          <p>Jika obat tanpa resep tidak efektif, dokter dapat meresepkan obat topikal atau oral yang lebih kuat. Perawatan ini disesuaikan dengan kondisi dan riwayat kesehatan individu, serta sering memerlukan pemantauan ketat.</p>

          <ul className="list-disc list-inside space-y-3">
            <li>
              <strong>Steroid Topikal:</strong> Untuk eksim atau psoriasis parah, kortikosteroid mengurangi peradangan dan kemerahan.
            </li>
            <li>
              <strong>Antibiotik Oral:</strong> Digunakan untuk jerawat yang terinfeksi atau infeksi kulit akibat bakteri.
            </li>
            <li>
              <strong>Biologis:</strong> Perawatan suntik canggih untuk kondisi kronis seperti psoriasis.
            </li>
            <li>
              <strong>Retinoid:</strong> Retinoid dengan kekuatan resep seperti tretinoin membantu jerawat dan penuaan kulit.
            </li>
            <li>
              <strong>Imunosupresan:</strong> Untuk penyakit kulit autoimun seperti lupus.
            </li>
          </ul>

          <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
            <p>
              <strong>Catatan:</strong> Selalu ikuti instruksi dokter dan beri tahu jika ada efek samping. Beberapa resep dapat berinteraksi dengan obat lain atau memerlukan pemeriksaan darah.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const NaturalRemedies = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Leaf className="text-green-500 w-8 h-8" />
          <CardTitle className="text-3xl font-semibold text-green-800">Pengobatan Alami</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base text-muted-foreground">
          <p>Beberapa orang memilih pengobatan alami atau rumahan untuk kondisi kulit ringan. Meskipun tidak selalu terbukti secara ilmiah, beberapa pilihan ini dapat memberikan kelegaan jika digunakan dengan aman.</p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li>
              <strong>Lidah Buaya:</strong> Menenangkan luka bakar, sengatan matahari, dan iritasi.
            </li>
            <li>
              <strong>Minyak Pohon Teh:</strong> Antiseptik dan anti-inflamasi, bermanfaat untuk jerawat dan infeksi jamur.
            </li>
            <li>
              <strong>Mandi Oatmeal:</strong> Meredakan gatal dan flare-up eksim.
            </li>
            <li>
              <strong>Minyak Kelapa:</strong> Melembapkan dan memiliki sifat antimikroba ringan.
            </li>
          </ul>

          <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-400">
            <p>
              <strong>Perhatian:</strong> Selalu lakukan uji tempel sebelum menggunakan minyak esensial. Jangan gunakan pengobatan alami sebagai pengganti perawatan profesional jika kondisi memburuk.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const WhenToSeekHelp = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Stethoscope className="text-red-500 w-8 h-8" />
          <CardTitle className="text-3xl font-semibold text-red-700">Kapan Harus Mencari Bantuan Medis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base text-muted-foreground">
          <p>Tidak semua masalah kulit bisa diobati di rumah. Dalam beberapa kasus, sangat penting untuk berkonsultasi dengan dokter kulit atau dokter umum.</p>

          <ul className="space-y-3">
            <li>
              <strong>Penyebaran Cepat:</strong> Jika ruam atau infeksi menyebar cepat atau disertai demam.
            </li>
            <li>
              <strong>Gejala yang Bertahan:</strong> Ketika kondisi tidak membaik dengan pengobatan OTC.
            </li>
            <li>
              <strong>Nyeri atau Pendarahan:</strong> Luka terbuka, luka yang berdarah, atau tahi lalat yang berubah bentuk.
            </li>
            <li>
              <strong>Gejala Sistemik:</strong> Seperti kelelahan, pembengkakan, atau nyeri sendi — bisa jadi indikasi masalah yang lebih dalam.
            </li>
          </ul>

          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-400">
            <p>
              <strong>Pengingat:</strong> Diagnosis dini dapat mencegah komplikasi serius. Jangan ragu untuk mencari pertolongan medis profesional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const MythsFact = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Mitos & Fakta Tentang Kesehatan Kulit</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Mitos: Jerawat hanya dialami remaja</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fakta:</strong> Meski paling umum terjadi saat remaja, banyak orang dewasa mengalami jerawat hingga usia 30-an, 40-an, bahkan lebih. Perubahan hormon, stres, dan produk perawatan kulit bisa memicunya.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Mitos: Tidak perlu tabir surya saat mendung</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fakta:</strong> Sinar UV bisa menembus awan dan tetap merusak kulit. Penggunaan tabir surya harian penting untuk kesehatan kulit dan pencegahan kanker.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Mitos: Berjemur bisa menyembuhkan jerawat</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fakta:</strong> Berjemur mungkin menutupi jerawat sementara, tetapi justru memperparahnya dalam jangka panjang dan meningkatkan risiko kanker kulit.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Mitos: Obat alami selalu aman</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fakta:</strong> Bahkan bahan alami bisa menyebabkan iritasi, alergi, atau berinteraksi dengan obat lain. Selalu konsultasikan dengan dokter kulit sebelum mencoba perawatan baru.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export const Faqs = () => {
  const faqs = [
    {
      q: 'Apa penyebab jerawat?',
      a: 'Jerawat disebabkan oleh pori-pori yang tersumbat, bakteri, perubahan hormon, dan produksi minyak berlebih.',
    },
    {
      q: 'Apakah penyakit kulit bisa sembuh total?',
      a: 'Beberapa bisa sembuh total, namun ada juga yang seperti eksim atau psoriasis yang dikelola jangka panjang dengan pengobatan.',
    },
    {
      q: 'Apakah boleh memencet jerawat?',
      a: 'Sebaiknya hindari memencet jerawat karena bisa menyebabkan bekas luka dan infeksi.',
    },
    {
      q: 'Tabir surya apa yang terbaik digunakan?',
      a: 'Gunakan tabir surya spektrum luas dengan SPF minimal 30. Oleskan ulang setiap 2 jam jika berada di luar ruangan.',
    },
  ];
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Pertanyaan yang Sering Diajukan</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="p-4 border rounded-md bg-white shadow">
            <summary className="cursor-pointer text-lg font-semibold text-accent-foreground">{faq.q}</summary>
            <p className="mt-2 text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export const ResourcesReferences = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Sumber & Referensi</h1>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a className="text-blue-600 underline" href="https://www.aad.org/" target="_blank">
            American Academy of Dermatology (aad.org)
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="https://www.skincancer.org/" target="_blank">
            Skin Cancer Foundation
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank">
            PubMed Central (PMC) – Studi Dermatologi
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="https://www.who.int/news-room/fact-sheets/detail/skin-diseases" target="_blank">
            Organisasi Kesehatan Dunia – Fakta Penyakit Kulit
          </a>
        </li>
      </ul>
    </div>
  );
};

export const AskDermatologist = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Hubungi / Tanya Dokter Kulit</h1>
      <p className="text-muted-foreground">Punya pertanyaan tentang kesehatan kulit Anda? Isi formulir di bawah ini dan ahli dermatologi kami akan merespons dalam 24–48 jam.</p>
      <form className="space-y-4">
        <div>
          <label className="block font-medium" htmlFor="name">
            Nama Lengkap
          </label>
          <input id="name" type="text" className="w-full border rounded p-2" placeholder="John Doe" />
        </div>
        <div>
          <label className="block font-medium" htmlFor="email">
            Alamat Email
          </label>
          <input id="email" type="email" className="w-full border rounded p-2" placeholder="anda@example.com" />
        </div>
        <div>
          <label className="block font-medium" htmlFor="question">
            Pertanyaan Anda
          </label>
          <textarea id="question" rows={5} className="w-full border rounded p-2" placeholder="Jelaskan masalah Anda secara detail..." />
        </div>
        <Button type="submit">Kirim Pesan</Button>
      </form>
    </div>
  );
};

const videos = [
  { id: 1, title: "Mengenali Jerawat: Penyebab & Perawatan", url: "https://youtu.be/Hxom8pws-10" },
  { id: 2, title: "Penanganan Eksim: Kiat & Pengobatan", url: "https://youtu.be/psBKIhBIKs8" },
  { id: 3, title: "Penyebab dan Cara Mengobati Impetigo", url: "https://youtu.be/3m5BD0NOVO4" },
  { id: 4, title: "Menemukan Salulitis – Gambaran Umum Gejala", url: "https://youtu.be/4T5kVUaM29E" },
  { id: 5, title: "Kutu Air (Tinea Pedis), Infeksi Jamur", url: "https://youtu.be/1rewPzxYQ0E" },
  { id: 6, title: "Infeksi Jamur pada Kulit, Ringworm", url: "https://youtu.be/az_5-PR7Ye0" },
  { id: 7, title: "Pengenalan Cutanus Larva Migrans", url: "https://youtu.be/-p-Nz12YWfk" },
  { id: 8, title: "Mitos atau Fakta? Penyakit Cacar Air", url: "https://youtu.be/xaEujbRF4mA" },
  { id: 9, title: "Waspada Herpes Zoster atau Cacar Ular", url: "https://youtu.be/c-9fe_p8N8M" },
];


function getYoutubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
  return match ? match[1] : "";
}

export default function EducationalVideos() {
  return (
    <section className="min-h-screen bg-muted/40 py-8 px-4 lg:px-16">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
        Video Edukasi tentang Kesehatan Kulit 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          const videoId = getYoutubeId(video.url);
          return (
            <Card key={video.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}