'use client';
import { useEffect, useState, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Bar, BarChart, ReferenceArea, ReferenceLine } from 'recharts';
import Swal from 'sweetalert2';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarHeader, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarSeparator, useSidebar, SidebarFooter, SidebarMenuItem } from '@/components/ui/sidebar';
import { Stethoscope, Sun, Timer, User2, Mars, Venus, HeartPulse, Trash2, MenuIcon, X } from 'lucide-react';
import ApiRequest from '@/api';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DatePicker from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export const BMIChart = ({ bmi }) => {
  const bmiRanges = [
    { name: 'Underweight', min: 0.0, max: 18.4, color: '#3b82f6' },
    { name: 'Normal', min: 18.5, max: 24.9, color: '#22c55e' },
    { name: 'Overweight', min: 25.0, max: 29.9, color: '#eab308' },
    { name: 'Obese', min: 30.0, max: 45.0, color: '#ef4444' },
  ];

  const chartData = [
    { bmiValue: 0.0, dummyY: 0 },
    { bmiValue: 5.0, dummyY: 0 },
    { bmiValue: 10.0, dummyY: 0 }, // Intermediate point
    { bmiValue: 18.4, dummyY: 0 }, // End of Underweight
    { bmiValue: 18.5, dummyY: 0 }, // Start of Normal
    { bmiValue: 20.0, dummyY: 0 }, // Intermediate point
    { bmiValue: 24.9, dummyY: 0 }, // End of Normal
    { bmiValue: 25.0, dummyY: 0 }, // Start of Overweight
    { bmiValue: 27.0, dummyY: 0 }, // Intermediate point
    { bmiValue: 29.9, dummyY: 0 }, // End of Overweight
    { bmiValue: 30.0, dummyY: 0 }, // Start of Obese
    { bmiValue: 35.0, dummyY: 0 }, // Intermediate point
    { bmiValue: 40.0, dummyY: 0 }, // Intermediate point
    { bmiValue: 45.0, dummyY: 0 }, // End of chart domain
  ];

  const clampedBmi = Math.max(0, Math.min(bmi, 45));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && label !== undefined) {
      const hoveredBmi = parseFloat(label);
      const currentRange = bmiRanges.find((range) => hoveredBmi >= range.min && hoveredBmi <= range.max);

      return (
        <div className="bg-white border border-gray-300 p-3 rounded shadow-lg text-sm min-w-[150px]">
          <p className="font-semibold text-gray-800 mb-1">{`BMI: ${hoveredBmi.toFixed(1)}`}</p>

          {currentRange && (
            <>
              <p className="text-gray-600 mb-1">
                {`Category: `}
                <span style={{ color: currentRange.color, fontWeight: 'bold' }}>{currentRange.name}</span>
              </p>

              <p className="text-gray-500 text-xs">{`Range: ${currentRange.min.toFixed(1)} - ${currentRange.max.toFixed(1)}`}</p>
            </>
          )}

          {bmi > 0 && Math.abs(hoveredBmi - bmi) < 0.2 && <p className="text-purple-700 font-bold mt-2 pt-2 border-t border-gray-200">{`Your BMI: ${bmi.toFixed(1)}`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={90}>
      <LineChart data={chartData} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
        <XAxis type="number" dataKey="bmiValue" domain={[0, 45]} tickCount={6} axisLine={true} tickLine={true} label={{ value: 'BMI Scale', position: 'insideBottom', offset: -5, fill: '#333', fontSize: 12 }} />
        <YAxis hide />

        <Line type="monotone" dataKey="dummyY" strokeOpacity={0} dot={false} activeDot={false} />

        {bmiRanges.map((range, index) => (
          <ReferenceArea
            key={range.name}
            x1={range.min}
            x2={range.max}
            fill={range.color}
            fillOpacity={0.2}
            stroke={range.color}
            strokeOpacity={0.5}
            label={{
              value: range.name,
              position: 'top',
              fill: range.color,
              fontSize: 10,
              dy: -5,
              offset: (range.max + range.min) / 2,
            }}
          />
        ))}

        {bmi > 0 && (
          <ReferenceLine
            x={clampedBmi}
            stroke="#673ab7"
            strokeWidth={2}
            strokeDasharray="4 4"
            label={{
              value: `You: ${bmi.toFixed(1)}`,
              position: 'top',
              fill: '#673ab7',
              fontSize: 12,
              dx: 0,
              dy: -20,
            }}
          />
        )}

        <Tooltip cursor={{ stroke: '#ccc', strokeWidth: 1 }} content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const DashboardContent = ({
  user, scans, sections, navigateButton, navigate, handleLogout,
  setIsEditProfileDialogOpen, formData, setFormData, birthDate, setBirthDate,
  photoFile, setPhotoFile, photoPreview, setPhotoPreview, removePhoto, setRemovePhoto,
  selectedGender, handleGenderChange, handleSubmit, handleDeleteScan, sortedScans,
  lastDiagnosis, lastMedication, lastInstruction, uniqueConditionsCount, conditionCounts,
  mostCommonCondition, totalScans, averageGapDays, scanFrequency, lastScanDate,
  averageConfidence, calculateBMI, getBMICategory, getBMISuggestions, bmi, category,
  color, dailyStatsMap, diseaseNames, diseasePerDayChartData, chartData,
  cardRefs, 
  avatarRef, 
  isEditProfileDialogOpen, predictionSlugMap,
}) => {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <>
      <button className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <MenuIcon className="h-6 w-6" />
      </button>

      <Sidebar className="z-50">
        <SidebarHeader className="pt-6 pb-2">
          <CardTitle className="text-center text-2xl font-semibold">Profil Anda</CardTitle>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-4 items-center text-center pb-6 overflow-hidden">
          <Avatar
            ref={avatarRef} 
            className="h-24 w-24 ring-2 ring-emerald-500"
          >
            <AvatarImage src={`${import.meta.env.VITE_API_BASE_URL}${user.avatar}`} alt={`${user.name}'s avatar`} />
            <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium text-lg">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm flex items-center justify-center gap-1">
              {user.age} {user.gender === 'female' ? <Venus className="text-pink-500 h-5 w-5" /> : <Mars className="text-blue-500 h-5 w-5" />}
            </p>
          </div>
          <SidebarSeparator className="my-2" />
          <SidebarMenu className="px-2">
            {navigateButton.map((nav) => (
              <SidebarMenuItem key={nav.label}>
                <SidebarMenuButton
                  onClick={() => {
                    navigate(nav.path);
                    if (isMobile) toggleSidebar();
                  }}
                  className="w-full justify-start text-base"
                  size="lg"
                >
                  {nav.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarFooter className="p-2">
            <Button className="w-full justify-start px-4 py-3 text-base" variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight pt-10 md:pt-0">Selamat Datang kembali, {user.name} 👋</h1>

        <Tabs defaultValue="profile">
          <TabsList className="mb-4 md:mb-6 bg-white rounded-lg shadow flex-wrap justify-center sm:justify-start">
            {['profil', 'pemindaian', ' tindakan'].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-base px-4 py-2 sm:px-6 sm:py-2 capitalize min-w-[100px]">
                {tab.replace(/^\w/, (c) => c.toUpperCase())}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
              <Card
                className="col-span-1 md:col-span-2 lg:col-span-2 shadow-md bg-white rounded-lg"
                ref={(el) => {
                  if (el) cardRefs.current.push(el);
                }}
              >
                <CardHeader className="bg-indigo-100 flex flex-row justify-between items-center p-4 rounded-t-lg">
                  <CardTitle className="text-lg md:text-xl font-semibold">Tinjauan & Aktivitas Kesehatan</CardTitle>
                  <Sun className="h-6 w-6 text-yellow-500" />
                </CardHeader>
                <CardContent className="py-6 px-4 md:px-6 space-y-8">
                  <div>
                    <p className="text-md md:text-lg font-medium mb-2">Pemindaian Per Hari</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="scans" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <p className="text-md md:text-lg font-medium mb-2">Penyakit per Hari</p>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={diseasePerDayChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        {diseaseNames.map((disease, index) => (
                          <Bar key={disease} dataKey={disease} stackId={undefined} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908'][index % 5]} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* <div>
                    <p className="text-md md:text-lg font-medium mb-2">Average Confidence Over Time</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                        <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
                        <Legend />
                        <Line type="monotone" dataKey="confidence" stroke="#00bcd4" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div> */}
                </CardContent>
              </Card>

              {sections.map((section, idx) => (
                <Card
                  key={section.title}
                  ref={(el) => {
                    if (el) cardRefs.current.push(el);
                  }}
                  className={`shadow-md bg-white rounded-lg flex flex-col ${section.span ? 'col-span-full' : ''}`}
                >
                  <CardHeader className={`${section.bg} flex flex-row justify-between items-center p-4 rounded-t-lg`}>
                    <CardTitle className="text-lg md:text-xl font-semibold">{section.title}</CardTitle>
                    {section.icon}
                  </CardHeader>
                  <CardContent className="space-y-3 py-4 px-6 flex-grow">
                    {section.content.map(([label, value], i) => (
                      <div key={i} className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600">{label}:</p>
                        {typeof value === 'string' || typeof value === 'number' ? <p className="text-base text-gray-800">{value}</p> : <div className="pt-2">{value}</div>}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scans">
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              {scans.length > 0 ? scans.map((scan, i) => 
              {
                
                const normalize = (text) => text.replace(/[’‘]/g, "'").trim();
                const predictionName = normalize(scan.prediction);
                const slug = predictionSlugMap[predictionName] || predictionName.toLowerCase().replace(/\s+/g, '-');
                return (
                <Card
                  key={scan._id}
                  ref={(el) => {
                    if (el) cardRefs.current.push(el); 
                  }}
                  className="mb-4 shadow-md bg-white rounded-lg"
                >
                  <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                    <CardTitle className="text-lg">{new Date(scan.uploadedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
                    <Button
                      onClick={() => handleDeleteScan(scan._id)}
                      variant="ghost"
                      className="text-red-500 hover:bg-red-50 focus:ring-red-500 p-2"
                      aria-label={`Delete scan from ${new Date(scan.uploadedAt).toLocaleDateString()}`}
                    >
                      <Trash2 className='h-5 w-5' />
                    </Button>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row gap-4 p-4 pt-0">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${scan.path}`}
                      alt={`Scan result for ${scan.prediction || 'N/A'}`}
                      className="h-40 w-full sm:h-32 sm:w-32 object-cover rounded-lg flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-gray-600">Hasil:</p>
                        <p className="text-base font-semibold text-gray-800">{scan.prediction || 'N/A'}</p>
                        {scan.prediction && (
                          <Button
                            variant="link"
                            className="text-blue-600 underline px-0"
                            onClick={() =>
                              navigate(`/education/skin-conditions/${slug}`)
                            }
                          >
                            Pelajari lebih lanjut
                          </Button>
                        )}
                      </div>
                      {/* <div>
                        <p className="font-medium text-gray-600">Confidence:</p>
                        <p className="text-base text-gray-800">{scan.confidence ? `${(parseFloat(scan.confidence) * 100).toFixed(2)}%` : 'N/A'}</p>
                      </div> */}
                      <div>
                        <p className="font-medium text-gray-600">Detail:</p>
                        <p className="text-base text-gray-800">{scan.penjelasan || 'No details available.'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Obat:</p>
                        <p className="text-base text-gray-800">{scan.obat || 'No medication suggested.'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Cara Pakai:</p>
                        <p className="text-base text-gray-800">{scan.cara_pakai || 'No instructions provided.'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            )
                :
                <p className="text-center text-gray-500 py-10">Belum ada pemindaian. Mulailah dengan memindai kulit Anda di tab "Tindakan"!</p>
              }
            </ScrollArea>
          </TabsContent>

          <TabsContent value="actions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: 'Pindai Kulit Anda',
                  description: 'Unggah foto terbaru kondisi kulit Anda dan dapatkan analisis.',
                  button: 'Unggah & Pindai',
                  url: '/upload-penyakit',
                },
                {
                  title: 'Perbarui Info Profil',
                  description: 'Jaga profil Anda tetap terbaru untuk rekomendasi yang lebih baik.',
                  button: 'Edit Profil',
                  onClick: () => setIsEditProfileDialogOpen(true),
                },
                {
                  title: 'Periksa Klinik Terdekat',
                  description: 'Temukan klinik terdekat untuk kondisi kulit Anda.',
                  button: 'Cari Klinik',
                  url: '/maps',
                },
              ].map((action, i) => (
                <Card
                  key={i}
                  ref={(el) => {
                    if (el) cardRefs.current.push(el);
                  }}
                  className="shadow-md bg-white rounded-lg flex flex-col"
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg md:text-xl font-semibold">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-between">
                    <p className="text-gray-700 mb-4">{action.description}</p>
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (action.onClick) {
                          action.onClick();
                        } else if (action.url) {
                          navigate(action.url);
                        }
                      }}
                    >
                      {action.button}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isEditProfileDialogOpen} onOpenChange={setIsEditProfileDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogTitle>Edit Profil</DialogTitle>
          <DialogDescription>Perbarui informasi profil Anda agar tetap terkini.</DialogDescription>
          <div className="flex flex-col md:flex-row gap-6 py-4">
            <div className="flex-1 space-y-4">
              <div className="relative w-32 h-32 group cursor-pointer mx-auto md:mx-0">
                <img
                  src={photoPreview || (removePhoto ? "/user-avatar.jpg" : `${import.meta.env.VITE_API_BASE_URL}${user.avatar}`)}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-300 text-center"
                  onClick={() => document.getElementById('avatarInput').click()}
                />

                {!removePhoto && (photoPreview || user.avatar) && (
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full shadow p-1 text-red-500 hover:bg-red-100 z-10 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemovePhoto(true);
                      setPhotoFile(null);
                      setPhotoPreview(null);
                    }}
                    aria-label="Remove photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <Input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPhotoFile(file);
                      setPhotoPreview(URL.createObjectURL(file));
                      setRemovePhoto(false);
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="full-name" className="block mb-1">
                  Nama Lengkap
                </Label>
                <Input id="full-name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email" className="block mb-1">
                  Email
                </Label>
                <Input id="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone" className="block mb-1">
                  Nomor Telepon
                </Label>
                <Input id="phone" placeholder="Phone Number" type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="address" className="block mb-1">
                  Alamat
                </Label>
                <Input id="address" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="date-picker" className="block mb-1">
                  Tanggal lahir
                </Label>
                <DatePicker id="date-picker" value={birthDate} onChange={setBirthDate} />
              </div>
              <div>
                <Label htmlFor="gender" className="block mb-1">
                  Jenis kelamin
                </Label>
                <div className="flex justify-around items-center gap-2 mt-2">
                  <label
                    className="flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg transition-all duration-200 w-20"
                    style={{
                      border: selectedGender === 'male' ? '3px solid #60a5fa' : '2px solid #e5e7eb',
                      boxShadow: selectedGender === 'male' ? '0 0 0 2px #bfdbfe' : 'none',
                    }}
                  >
                    <Input onChange={handleGenderChange} type="radio" name="gender" value="male" checked={selectedGender === 'male'} className="hidden" />
                    <p className="text-base font-semibold">Cowok</p>
                    <Mars className={`h-6 w-6 transition-all ${selectedGender === 'male' ? 'text-blue-500' : 'text-gray-400'}`} />
                  </label>
                  <label
                    className="flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg transition-all duration-200 w-20"
                    style={{
                      border: selectedGender === 'female' ? '3px solid #f87171' : '2px solid #e5e7eb',
                      boxShadow: selectedGender === 'female' ? '0 0 0 2px #fecaca' : 'none',
                    }}
                  >
                    <Input onChange={handleGenderChange} type="radio" name="gender" value="female" checked={selectedGender === 'female'} className="hidden" />
                    <p className="text-base font-semibold">Cewek</p>
                    <Venus className={`h-6 w-6 transition-all ${selectedGender === 'female' ? 'text-pink-500' : 'text-gray-400'}`} />
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="height" className="block mb-1">
                  Tinggi (cm)
                </Label>
                <Input id="height" placeholder="Height in cm" type={'number'} value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="weight" className="block mb-1">
                  Berat (kg)
                </Label>
                <Input id="weight" placeholder="Weight in kg" type={'number'} value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row-reverse sm:space-x-2 sm:space-x-reverse space-y-2 sm:space-y-0 pt-4">
            <Button onClick={handleSubmit}>Konfirmasi</Button>
            <Button variant="outline" onClick={() => setIsEditProfileDialogOpen(false)}>
              Kembali
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  const [birthDate, setBirthDate] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    height: '',
    weight: '',
    gender: '',
  });

  const [selectedGender, setSelectedGender] = useState('');
  const [user, setUser] = useState({
    name: 'Loading....',
    age: '',
    address: '',
    username: '',
    email: '',
    phoneNumber: '',
    gender: '',
    avatar: '/user-avatar.jpg',
    lastLogin: '',
    height: '',
    weight: '',
  });

  const [scans, setScans] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const avatarRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    cardRefs.current = [];

    const ctx = gsap.context(() => {
      if (avatarRef.current) {
        gsap.from(avatarRef.current, {
          y: -20,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }

      if (cardRefs.current.length > 0) {
        gsap.to(cardRefs.current, { clearProps: 'all', duration: 0 });

        gsap.from(cardRefs.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });

    return () => ctx.revert();
  }, [user, scans]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchUserProfile = async () => {
      try {
        const res = await ApiRequest.get('/api/user/detail');
        setUser(res.data);
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          phoneNumber: res.data.phoneNumber || '',
          address: res.data.address || '',
          height: res.data.height || '',
          weight: res.data.weight || '',
        });
        if (res.data.birthDate) {
          setBirthDate(new Date(res.data.birthDate));
        }
        if (res.data.gender) {
          setSelectedGender(res.data.gender);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchUserScans = async () => {
      try {
        const res = await ApiRequest.get('/api/users/dataScans');
        setScans(res.data);
      } catch (error) {
        console.error('Failed to load scan data:', error);
      }
    };

    if (token) {
      fetchUserScans();
      fetchUserProfile();
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    Swal.fire({
      title: 'Logout Successful',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/');
    });
  }, [navigate]);

  const handleGenderChange = useCallback((e) => {
    setSelectedGender(e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    if (birthDate) {
      form.append('birthDate', birthDate.toISOString());
    }
    if (photoFile) {
      form.append('avatar', photoFile);
    }
    if (removePhoto) {
      form.append('removePhoto', 'true');
    }
    if (selectedGender) {
      form.append('gender', selectedGender);
    }

    try {
      await ApiRequest.put('/api/user/detail', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Perbarui Profil',
        text: 'Informasi profil Anda berhasil diperbarui.',
      });

      setIsEditProfileDialogOpen(false);
      setRemovePhoto(false);
      setPhotoFile(null);
      setPhotoPreview(null);

      const refreshed = await ApiRequest.get('/api/user/detail');
      setUser(refreshed.data);
    } catch (error) {
      console.error('Request error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memperbarui',
        text: error.response?.data?.message || 'Terjadi kesalahan.',
      });
    }
  }, [formData, birthDate, photoFile, removePhoto, selectedGender]);

  const handleDeleteScan = useCallback(async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Tindakan ini tidak dapat dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiRequest.delete(`/api/dataPhoto/${id}`);
          setScans((prev) => prev.filter((scan) => scan._id !== id));
          Swal.fire('Deleted!', 'Your scan has been deleted.', 'success');
        } catch (error) {
          console.error('Failed to delete scan:', error);
          Swal.fire('Error!', error.response?.data?.message || 'Something went wrong while deleting the scan.', 'error');
        }
      }
    });
  }, []);

  const sortedScans = useMemo(() => [...scans].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()), [scans]);

  const lastDiagnosis = sortedScans[0]?.prediction || '-';
  const lastMedication = sortedScans[0]?.obat || '-';
  const lastInstruction = sortedScans[0]?.cara_pakai || '-';

  const uniqueConditionsCount = useMemo(() => new Set(scans.map((scan) => scan.prediction)).size, [scans]);

  const conditionCounts = useMemo(
    () =>
      scans.reduce((acc, scan) => {
        acc[scan.prediction] = (acc[scan.prediction] || 0) + 1;
        return acc;
      }, {}),
    [scans]
  );

  const mostCommonCondition = useMemo(() => Object.entries(conditionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-', [conditionCounts]);

  const totalScans = scans.length;
  const averageGapDays = useMemo(() => {
    if (sortedScans.length < 2) return 0;
    const gaps = [];
    for (let i = 1; i < sortedScans.length; i++) {
      const prevDate = new Date(sortedScans[i - 1].uploadedAt).getTime();
      const currDate = new Date(sortedScans[i].uploadedAt).getTime();
      const diffDays = Math.abs(currDate - prevDate) / (1000 * 60 * 60 * 24);
      gaps.push(diffDays);
    }
    const totalGap = gaps.reduce((sum, gap) => sum + gap, 0);
    return totalGap / gaps.length;
  }, [sortedScans]);

  const scanFrequency =
    averageGapDays === 0 ? 'Only 1 scan' : averageGapDays < 7 ? `Every ${averageGapDays.toFixed(1)} day${averageGapDays < 2 ? '' : 's'}` : `Every ${(averageGapDays / 7).toFixed(1)} week${averageGapDays / 7 < 2 ? '' : 's'}`;

  const lastScanDate = sortedScans.length ? new Date(sortedScans[0].uploadedAt).toLocaleDateString() : '-';

  // const averageConfidence = useMemo(() =>
  //   scans.length
  //     ? (
  //       (scans.reduce((acc, scan) => {
  //         const conf = parseFloat(scan.confidence);
  //         return !isNaN(conf) ? acc + conf : acc;
  //       }, 0) /
  //         scans.length) *
  //       100
  //     ).toFixed(2)
  //     : '0.00'
  //   , [scans]);

  const calculateBMI = (weightKg, heightCm) => {
    if (!weightKg || !heightCm || heightCm === 0) return 0;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return parseFloat(bmi.toFixed(2));
  };

  const getBMICategory = (bmi) => {
    if (bmi === 0) return { category: 'N/A', color: 'text-gray-500' };
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const getBMISuggestions = (bmi) => {
    if (bmi === 0) return 'Please enter your height and weight to calculate BMI and get health tips.';
    if (bmi < 18.5) return 'Consider eating more frequently and focus on nutrient-dense foods.';
    if (bmi < 25) return 'Keep up the good work! Maintain your routine.';
    if (bmi < 30) return 'Watch your portions and increase physical activity.';
    return 'Consult a healthcare provider and consider a structured weight loss program.';
  };

  const bmi = useMemo(() => calculateBMI(user.weight, user.height), [user.weight, user.height]);
  const { category, color } = getBMICategory(bmi);

  const dailyStatsMap = useMemo(() => {
    const map = {};
    scans.forEach((scan) => {
      const date = new Date(scan.uploadedAt).toLocaleDateString();
      if (!map[date]) {
        map[date] = {
          date,
          scans: 0,
          // confidenceSum: 0,
          diseases: {},
        };
      }
      map[date].scans += 1;
      // const conf = parseFloat(scan.confidence || 0);
      // map[date].confidenceSum += !isNaN(conf) ? conf : 0;
      const disease = scan.prediction || 'Unknown';
      map[date].diseases[disease] = (map[date].diseases[disease] || 0) + 1;
    });
    return map;
  }, [scans]);

  const diseaseNames = useMemo(() => Array.from(new Set(scans.map((scan) => scan.prediction))), [scans]);

  const diseasePerDayChartData = useMemo(
    () =>
      Object.entries(dailyStatsMap).map(([date, counts]) => {
        const entry = { date };
        diseaseNames.forEach((disease) => {
          entry[disease] = counts.diseases[disease] || 0;
        });
        return entry;
      }),
    [dailyStatsMap, diseaseNames]
  );

  const chartData = useMemo(() =>
    Object.values(dailyStatsMap).map((entry) => ({
      date: entry.date,
      scans: entry.scans,
      // confidence: (entry.confidenceSum / entry.scans) || 0,
    }))
    , [dailyStatsMap]);

  const sections = [
    {
      title: 'Personal Information',
      icon: <User2 className="h-6 w-6 text-gray-500" />,
      content: [
        ['Full Name', user.name],
        ['Email', user.email],
        ['Gender', user.gender],
        ['Age', user.age],
        ['Last Login', user.lastLogin ? format(new Date(user.lastLogin), 'PPpp') : 'Never'],
        ['Location', user.address],
        ['Phone', user.phoneNumber],
      ],
      bg: 'bg-emerald-100',
    },
    {
      title: 'Ringkasan Diagnosis Terbaru',
      icon: <Stethoscope className="h-6 w-6 text-gray-500" />,
      content: [
        ['Kondisi yang Paling Umum', mostCommonCondition],
        ['Diagnosa Terakhir', lastDiagnosis],
        ['Obat Terakhir yang Digunakan', lastMedication],
        ['Petunjuk Penggunaan', lastInstruction],
        ['Total Kondisi yang Dikenali', uniqueConditionsCount],
      ],
      bg: 'bg-pink-100',
    },
    {
      title: 'Aktivitas Aplikasi',
      icon: <Timer className="h-6 w-6 text-gray-500" />,
      content: [
        ['Total Pemindaian', totalScans],
        ['Pemindaian Terakhir', lastScanDate],
        ['Frekuensi Pemindaian', scanFrequency],
        // ['Rata-rata Tingkat Kepercayaan Pemindaian', `${averageConfidence}%`],
      ],
      bg: 'bg-sky-100',
    },
    {
      title: 'BMI & Status Kesehatan',
      icon: <HeartPulse className="h-6 w-6 text-gray-500" />,
      content: [
        ['BMI Saat Ini', bmi === 0 ? 'N/A' : bmi],
        ['Kategori', <span className={`font-bold ${color}`}>{category}</span>],
        ['Tips Kesehatan', getBMISuggestions(bmi)],
        ['Grafik', <BMIChart bmi={bmi} key={bmi} />],
      ],
      bg: 'bg-lime-100',
    },
  ];

  const navigateButton = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Education', path: '/education' },
  ];

  const predictionSlugMap = {
    "Acne": "acne",
    "Cellulitis": "cellulitis",
    "Impetigo": "impetigo",
    "Eczema": "eczema",
    "Athlete’s Foot": "athletes-foot",
    "Nail Fungus": "nail-ringworm-pathology",
    "Ringworm": "body-ringworm",
    "Cutaneous Larva Migrans": "cutaneous-larva-migrans",
    "Chickenpox": "chickenpox",
    "Shingles": "shingles"
  };


  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800">
        <DashboardContent
          user={user}
          scans={scans}
          sections={sections}
          navigateButton={navigateButton}
          navigate={navigate}
          handleLogout={handleLogout}
          setIsEditProfileDialogOpen={setIsEditProfileDialogOpen}
          formData={formData}
          setFormData={setFormData}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          photoFile={photoFile}
          setPhotoFile={setPhotoFile}
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
          removePhoto={removePhoto}
          setRemovePhoto={setRemovePhoto}
          selectedGender={selectedGender}
          handleGenderChange={handleGenderChange}
          handleSubmit={handleSubmit}
          handleDeleteScan={handleDeleteScan}
          sortedScans={sortedScans}
          lastDiagnosis={lastDiagnosis}
          lastMedication={lastMedication}
          lastInstruction={lastInstruction}
          uniqueConditionsCount={uniqueConditionsCount}
          conditionCounts={conditionCounts}
          mostCommonCondition={mostCommonCondition}
          totalScans={totalScans}
          averageGapDays={averageGapDays}
          scanFrequency={scanFrequency}
          lastScanDate={lastScanDate}
          // averageConfidence={averageConfidence}
          calculateBMI={calculateBMI}
          getBMICategory={getBMICategory}
          getBMISuggestions={getBMISuggestions}
          bmi={bmi}
          category={category}
          color={color}
          dailyStatsMap={dailyStatsMap}
          diseaseNames={diseaseNames}
          diseasePerDayChartData={diseasePerDayChartData}
          chartData={chartData}
          cardRefs={cardRefs}
          avatarRef={avatarRef}
          isEditProfileDialogOpen={isEditProfileDialogOpen}
          predictionSlugMap={predictionSlugMap}
        />
      </div>
    </SidebarProvider>
  );
};
