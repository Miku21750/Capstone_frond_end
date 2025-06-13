'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';

import { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import ApiRequest from '@/api';
export const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);


  // State for regions
  // Using the EMSIFA API for Indonesian regions
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(err => console.error("Failed to load provinces:", err));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince.id}.json`)
        .then(res => res.json())
        .then(data => setRegencies(data))
        .catch(err => console.error("Failed to load regencies:", err));
    } else {
      setRegencies([]); setDistricts([]); setVillages([]);
    }
  }, [selectedProvince]);
  useEffect(() => {
    if (selectedRegency) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency.id}.json`)
        .then(res => res.json())
        .then(data => setDistricts(data))
        .catch(err => console.error("Failed to load districts:", err));
    } else {
      setDistricts([]); setVillages([]);
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict.id}.json`)
        .then(res => res.json())
        .then(data => setVillages(data))
        .catch(err => console.error("Failed to load villages:", err));
    } else {
      setVillages([]);
    }
  }, [selectedDistrict]);





  const form = useForm({
    defaultValues: {
      name: '',
      province: '',
      regency: '',
      district: '',
      village: '',
      method: 'upload',
      diagnosisHelpful: 3,
      drugAdviceClear: 'yes',
      nearbyHelp: 'yes',
      learnMore: [],
      email: '',
      comments: '',
      consent: false,
    },
  });


  const onSubmit = async (data) => {
    try {
      console.log('Feedback submitted:', data);
      const response = await ApiRequest.post('/api/feedback', data);

      if(!response) throw new Error('Failed to submit feedback');
      setSubmitted(true);
      form.reset();
      toast({
        title: "✅ Terima kasih!",
        description: "Masukan Anda membantu meningkatkan akses kesehatan untuk semua orang.",
        variant: "success",
      })
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "❌ Gagal mengirim masukan",
        description: "Silakan coba lagi nanti.",
        variant: "destructive",
      });
      return;
    }
    
  };
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000); // auto-hide after 5s
      return () => clearTimeout(timer);
    }
  }, [submitted]);
  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-center">
            🗣 Kami Sangat Mengharapkan Masukan Anda
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {submitted ? (
           <div className="text-center text-green-600 font-medium text-base md:text-lg py-8">
              ✅ Terima kasih! Masukan Anda membantu meningkatkan akses kesehatan untuk semua orang.
            </div>
          ) : (
            <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-15 gap-y-6 items-start">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Nama Anda (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g. Ria from NTT" {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          const prov = provinces.find((p) => p.id === val);
                          setSelectedProvince(prov);
                          form.setValue("province", prov.name);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Pilih provinsi" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {provinces.map((prov) => (
                            <SelectItem key={prov.id} value={prov.id}>{prov.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="regency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kabupaten / Kota</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          const reg = regencies.find((r) => r.id === val);
                          setSelectedRegency(reg);
                          form.setValue("regency", reg.name);
                        }}
                        disabled={!regencies.length}
                      >
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Pilih kabupaten/kota" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regencies.map((r) => (
                            <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          const dist = districts.find((d) => d.id === val);
                          setSelectedDistrict(dist);
                          form.setValue("district", dist.name);
                        }}
                        disabled={!districts.length}
                      >
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Pilih kecamatan" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map((d) => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelurahan / Desa</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          const village = villages.find((v) => v.id === val);
                          form.setValue("village", village.name);
                        }}
                        disabled={!villages.length}
                      >
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Pilih desa/kelurahan" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {villages.map((v) => (
                            <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Apakah Anda menggunakan unggah gambar atau kamera?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upload">Mengunggah</SelectItem>
                          <SelectItem value="camera">Kamera</SelectItem>
                          <SelectItem value="both">Keduanya</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="diagnosisHelpful"
                  render={({ field }) => {
                    const [hover, setHover] = useState(null);

                    return (
                      <FormItem className="col-span-2">
                        <FormLabel className={'text-base md:text-xl'}>Apakah Diagnosisnya membantu?</FormLabel>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                              key={rating}
                              size={24}
                              style={{ cursor: 'pointer' }}
                              color={(hover ?? field.value) >= rating ? '#ffc107' : '#e4e5e9'}
                              onClick={() => field.onChange(rating)}
                              onMouseEnter={() => setHover(rating)}
                              onMouseLeave={() => setHover(null)}
                            />
                          ))}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="drugAdviceClear"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Apakah Saran Obatnya jelas?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Iya</SelectItem>
                          <SelectItem value="no">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nearbyHelp"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Sudahkah Anda mencoba mencari bantuan di sekitar sini?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Iya</SelectItem>
                          <SelectItem value="no">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="learnMore"
                  render={() => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Apa yang ingin Anda pelajari lebih lanjut?</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {['Pencegahan', 'Pemanfaatan Obat', 'Kebersihan Kulit', 'Klinik Lokal', 'Lainnya'].map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="learnMore"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex items-center gap-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked ? [...(field.value || []), option] : field.value?.filter((val) => val !== option);
                                        field.onChange(newValue);
                                      }}
                                    />
                                  </FormControl>
                                  <span>{option}</span>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Email (Optional)</FormLabel>
                      <FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Saran / Komentar Anda</FormLabel>
                      <FormControl><Textarea className={' resize-none'} rows={4} placeholder="Your experience, suggestions, or issues..." {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div>
                        <FormLabel>Saya setuju agar umpan balik saya digunakan secara anonim untuk meningkatkan layanan</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white col-span-2">
                  Kirim Masukan
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </>
  );
};
