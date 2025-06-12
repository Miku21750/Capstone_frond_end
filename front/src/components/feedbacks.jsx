import ApiRequest from "@/api";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { FormControl } from "./ui/form";
export function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState([]);


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
        .then(data => {
          setProvinces(data)
        })
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
  
    
    const [filters, setFilters] = useState({
        region: '',
        method: '',
        minRating: '',
    })
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchFeedbakcs = async () => {
        const params = new URLSearchParams({
            ...filters,
            page,
            limit:6,
        });

        const res = await ApiRequest.get(`/api/feedback?${params.toString()}`);
        const { data, totalPages } = res.data;
        const filtered = data.filter(f =>  f.consent);
        setFeedbacks(filtered);
        setTotalPages(totalPages);
    }

    useEffect(() =>{
        fetchFeedbakcs();
    }, [filters, page])

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    }
    const isValidOption = (option) =>
      option && option.id != null && String(option.id).trim() !== "";

    return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-center text-[#002d52] mb-10">Semua Testimoni Pengguna</h1>
      {/* FILTERS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* <select name="region" onChange={handleFilterChange} value={filters.region} className="p-2 rounded border"> */}
        
        <Select
          onValueChange={(val) => {
            const selected = provinces.find(p => p.id.toString() === val);
            setSelectedProvince(selected);
            setFilters(prev => ({ ...prev, province: selected?.name || '' }));
            setPage(1);
          }}
        >
            <SelectTrigger className="w-full"><SelectValue placeholder="Pilih provinsi" /></SelectTrigger>
          
          <SelectContent>
            {provinces.map((prov) => (
              <SelectItem key={prov.id} value={prov.id}>{prov.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>


        <Select onValueChange={(value) => {
          setFilters(prev => ({ ...prev, method: value }));
          setPage(1);
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Metode Diagnosis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Semua Metode</SelectItem>
            <SelectItem value="upload">Mengunggah</SelectItem>
            <SelectItem value="camera">Kamera</SelectItem>
            <SelectItem value="both">Keduanya</SelectItem>
          </SelectContent>
        </Select>


        <Select onValueChange={(value) => {
          setFilters(prev => ({ ...prev, minRating: value }));
          setPage(1);
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Minimal Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Semua Penilaian</SelectItem>
            <SelectItem value="5">★★★★★ (5)</SelectItem>
            <SelectItem value="4">★★★★☆ (4+)</SelectItem>
            <SelectItem value="3">★★★☆☆ (3+)</SelectItem>
          </SelectContent>
        </Select>

      </div>
      <div className="space-y-8">
        {feedbacks.length > 0 ? (
          feedbacks.map((f, i) => (
            <div key={i} className="bg-[#f0f8ff] p-6 rounded-xl shadow">
              <p className="text-lg italic text-[#003366]">“{f.comments}”</p>

              {f.diagnosisHelpful && (
                <div className="mt-3 text-yellow-500">
                    {'★'.repeat(f.diagnosisHelpful)}{'☆'.repeat(5 - f.diagnosisHelpful)}
                    <span className="ml-2 text-sm text-gray-600">({f.diagnosisHelpful}/5)</span>
                </div>
            )}
              <div className="mt-2 text-sm text-gray-600">
                — {f.name}, {f.village}, {f.district}, {f.regency}, {f.province}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Belum ada testimoni yang ditampilkan.</p>
        )}
      </div>
    </div>
  );
}