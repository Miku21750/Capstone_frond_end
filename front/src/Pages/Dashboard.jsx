import { useEffect, useState, useLayoutEffect, useRef, use } from 'react';
import gsap from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Bar, BarChart } from 'recharts';

<<<<<<< HEAD
import Swal from 'sweetalert2';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { Stethoscope, Sun, Timer, User2 } from 'lucide-react';
import ApiRequest from '@/api';
import { useNavigate } from 'react-router';

export const Dashboard = () => {
  // GSAP Animations - scoped safely
=======
 import Swal from "sweetalert2";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Stethoscope, Sun, Timer, User2 } from "lucide-react";
import ApiRequest from "@/api";
import { useNavigate } from "react-router";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

export const Dashboard = () => {

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [birthDate, setBirthDate] = useState('')

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

>>>>>>> upstream/main
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(avatarRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(cardRefs.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);

  const [scans, setScans] = useState([]);
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
  });
  const avatarRef = useRef(null);
  const cardRefs = useRef([]);
  // const user = {
  //   name: "Jane Doe",
  //   email: "jane@example.com",
  //   age: 28,
  //   gender: "Female",
  //   avatar: "/user-avatar.jpg",
  //   lastLogin: "May 25, 2025",
  //   scans: [
  //     {
  //       id: "scan-001",
  //       date: "2025-05-20",
  //       result: "Eczema Detected",
  //       image: "/scans/eczema.jpg",
  //       recommendation: "Use moisturizer and avoid harsh soaps.",
  //     },
  //     {
  //       id: "scan-002",
  //       date: "2025-04-10",
  //       result: "No signs of skin disease",
  //       image: "/scans/normal.jpg",
  //       recommendation: "Maintain daily skincare routine.",
  //     },
  //   ],
  // };
  const handleLogout = () => {
    localStorage.removeItem('token');
    Swal.fire({
      title: 'Logout Successful',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    navigate('/');
  };

  useEffect(() => {
    //fetch user
    const fetchUserProfile = async () => {
      try {
        const res = await ApiRequest.get('/api/user/detail');
        setUser(res.data);
      } catch (error) {
        console.error('failed to fetch data user : ', error);
      }
    };

    //fetch image scanner
    const fetchUserScans = async () => {
      try {
        const res = await ApiRequest.get('/api/users/dataScans');
        setScans(res.data);
      } catch (error) {
        console.error('Falied to load data : ', error);
      }
    };

    fetchUserScans();
    fetchUserProfile();
  }, []);

  const sortedScans = [...scans].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  const lastDiagnosis = sortedScans[0]?.prediction || '-';
  const lastMedication = sortedScans[0]?.obat || '-';
  const lastInstruction = sortedScans[0]?.cara_pakai || '-';

  const conditionSet = new Set(scans.map((scan) => scan.prediction));
  const uniqueConditionsCount = conditionSet.size;

  const conditionCounts = scans.reduce((acc, scan) => {
    acc[scan.prediction] = (acc[scan.prediction] || 0) + 1;
    return acc;
  }, {});
  const mostCommonCondition = Object.entries(conditionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  const totalScans = scans.length;
  let averageGapDays = 0;

  if (sortedScans.length > 1) {
    const gaps = [];
    for (let i = 1; i < sortedScans.length; i++) {
      const prevDate = new Date(sortedScans[i - 1].uploadedAt).getTime();
      const currDate = new Date(sortedScans[i].uploadedAt).getTime();
      const diffDays = Math.abs(currDate - prevDate) / (1000 * 60 * 60 * 24); // convert ms to days
      gaps.push(diffDays);
    }
    const totalGap = gaps.reduce((sum, gap) => sum + gap, 0);
    averageGapDays = totalGap / gaps.length;
  }

  const scanFrequency =
    averageGapDays === 0 ? 'Only 1 scan' : averageGapDays < 7 ? `Every ${averageGapDays.toFixed(1)} day${averageGapDays < 2 ? '' : 's'}` : `Every ${(averageGapDays / 7).toFixed(1)} week${averageGapDays / 7 < 2 ? '' : 's'}`;

  const lastScanDate = sortedScans.length ? new Date(sortedScans[0].uploadedAt).toLocaleDateString() : '-';

  const averageConfidence = scans.length
    ? (
        (scans.reduce((acc, scan) => {
          const conf = parseFloat(scan.confidence);
          return !isNaN(conf) ? acc + conf : acc;
        }, 0) /
          scans.length) *
        100
      ).toFixed(2)
    : '0.00';

  // Card Section Definitions
  const sections = [
    {
      title: 'Personal Information',
      icon: <User2 className="h-6 w-6 text-gray-500" />,
      content: [
        ['Full Name', user.name],
        ['Email', user.email],
        ['Gender', user.gender],
        ['Age', user.age],
        ['Last Login', user.lastLogin],
        ['Location', user.location],
        ['Phone', user.Phone],
      ],
      bg: 'bg-emerald-100',
    },
    {
      title: 'Recent Diagnosis Summary',
      icon: <Stethoscope className="h-6 w-6 text-gray-500" />,
      content: [
        ['Most Common Condition', mostCommonCondition],
        ['Last Diagnosed', lastDiagnosis],
        ['Most Recent Medication', lastMedication],
        ['Application Instructions', lastInstruction],
        ['Total Conditions Identified', uniqueConditionsCount],
      ],
      bg: 'bg-pink-100',
    },
    {
      title: 'App Activity',
      span: 2,
      icon: <Timer className="h-6 w-6 text-gray-500" />,
      content: [
        ['Total Scans', totalScans],
        ['Last Scan', lastScanDate],
        ['Scan Frequency', scanFrequency],
        ['Average Scan Confidence', `${averageConfidence}%`],
        // ["Next Scheduled Checkup", "June 15, 2025"],
      ],
      bg: 'bg-sky-100',
    },
    // {
    //   title: "Environmental Exposure",
    //   icon: <Sun className="h-6 w-6 text-gray-500" />,
    //   content: [
    //     ["Sun Exposure", "Moderate"],
    //     ["Pollution Level", "Low"],
    //     ["Sunscreen Usage", "Daily"],
    //     ["Routine", "Morning & Night"],
    //     ["Product Usage", "Cleanser, Moisturizer, Sunscreen"],
    //   ],
    //   bg: "bg-amber-100",
    // },
  ];

  const navigateButton = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Education', path: '/education' },
  ];

  //chart
  const dailyStatsMap = {};

  scans.forEach((scan) => {
    const date = new Date(scan.uploadedAt).toLocaleDateString();
    if (!dailyStatsMap[date]) {
      dailyStatsMap[date] = {
        date,
        scans: 0,
        confidenceSum: 0,
        diseases: {},
      };
    }

    dailyStatsMap[date].scans += 1;
    dailyStatsMap[date].confidenceSum += parseFloat(scan.confidence || 0);
    const disease = scan.prediction || 'Unknown';
    dailyStatsMap[date].diseases[disease] = (dailyStatsMap[date].diseases[disease] || 0) + 1;
  });

  const diseasePerDay = {};

  scans.forEach((scan) => {
    const date = new Date(scan.uploadedAt).toLocaleDateString('en-GB'); // or "id-ID"
    const disease = scan.prediction;

    if (!diseasePerDay[date]) diseasePerDay[date] = {};
    if (!diseasePerDay[date][disease]) diseasePerDay[date][disease] = 0;

    diseasePerDay[date][disease]++;
  });

  const diseaseNames = Array.from(new Set(scans.map((scan) => scan.prediction)));

  const diseasePerDayChartData = Object.entries(diseasePerDay).map(([date, counts]) => {
    const entry = { date };
    diseaseNames.forEach((disease) => {
      entry[disease] = counts[disease] || 0;
    });
    return entry;
  });

  const chartData = Object.values(dailyStatsMap).map((entry) => ({
    date: entry.date,
    scans: entry.scans,
    confidence: (entry.confidenceSum / entry.scans).toFixed(2),
    ...entry.diseases,
  }));

  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800">
      <SidebarProvider>
        <Sidebar>
          <Card className="max-w-3xl mb-4 shadow-md rounded-xl border-0">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center text-center">
              <Avatar ref={avatarRef} className="h-24 w-24 ring-2 ring-emerald-500">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm">
                  {user.age} • {user.gender}
                </p>
              </div>
            </CardContent>
          </Card>

          {navigateButton.map((nav) => (
            <button key={nav.label} className="bg-red-300 w-full mb-2" onClick={() => navigate(nav.path)}>
              {nav.label}
            </button>
          ))}

          <Button className="w-full mt-2" variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 tracking-tight">Welcome back, {user.name} 👋</h1>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6 bg-white rounded-lg shadow flex-wrap">
              {['profile', 'scans', 'actions'].map((tab) => (
                <TabsTrigger key={tab} value={tab} className="text-lg px-6 py-2 capitalize">
                  {tab.replace(/^\w/, (c) => c.toUpperCase())}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Profile Info */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-2 shadow-md bg-white rounded-lg mt-6">
                  <CardHeader className="bg-indigo-100 flex justify-between items-center p-4 rounded-t-lg">
                    <CardTitle className="text-xl font-semibold">Condition Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="py-6 px-6 space-y-10">
                    <div>
                      <p className="text-lg font-medium mb-2">Scans Per Day</p>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
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
                      <p className="text-lg font-medium mb-2">Diseases per Day</p>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={diseasePerDayChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Legend />
                          {diseaseNames.map((disease, index) => (
                            <Bar
                              key={disease}
                              dataKey={disease}
                              stackId={undefined} // not stacked
                              fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908'][index % 5]}
                            />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <p className="text-lg font-medium mb-2">Average Confidence Over Time</p>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                          <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
                          <Legend />
                          <Line type="monotone" dataKey="confidence" stroke="#00bcd4" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                {sections.map((section, idx) => (
                  <Card key={section.title} ref={(el) => (cardRefs.current[idx] = el)} className={`mb-4 shadow-md ${section.span ? 'col-span-2' : ''} bg-white rounded-lg`}>
                    <CardHeader className={`${section.bg} flex justify-between items-center p-4 rounded-t-lg`}>
                      <CardTitle className="text-xl font-semibold">{section.title}</CardTitle>
                      {section.icon}
                    </CardHeader>
                    <CardContent className="space-y-1 py-4 px-6">
                      {section.content.map(([label, value], i) => (
                        <div key={i}>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-sm text-gray-700">{value}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Scans */}
            <TabsContent value="scans">
              <ScrollArea className="h-[500px] pr-4">
<<<<<<< HEAD
                {scans.length > 0 ? (
                  scans.map((scan, i) => (
                    <Card key={scan._id} ref={(el) => (cardRefs.current[sections.length + i] = el)} className="mb-4 shadow-md">
                      <CardHeader>
                        <CardTitle>{new Date(scan.uploadedAt).toLocaleDateString()}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex gap-4 items-start">
                        <img src={`http://localhost:4000${scan.path}`} alt="Scan" className="h-32 w-32 object-cover rounded-lg" loading="lazy" />
                        <div>
                          <p>this is the thing {scan.path}</p>
=======
                {scans.length > 0 ? scans.map((scan, i) => (
                  <Card
                    key={scan._id}
                    ref={(el) => (cardRefs.current[sections.length + i] = el)}
                    className="mb-4 shadow-md"
                  >
                    <CardHeader>
                      <CardTitle>{new Date(scan.uploadedAt).toLocaleDateString()}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4 items-start">
                      <img
                        src={`http://localhost:4000${scan.path}`}
                        alt="Scan"
                        className="h-32 w-32 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div>
>>>>>>> upstream/main

                          <p className="font-medium">Result:</p>
                          <p>{scan.prediction}</p>
                          <p className="font-medium">Confidence:</p>
                          <p>{(scan.confidence * 100).toFixed(2)}%</p>
                          <p className="font-medium">Detail:</p>
                          <p>{scan.penjelasan}</p>
                          <p className="font-medium mt-2">Obat:</p>
                          <p>{scan.obat}</p>
                          <p className="font-medium mt-2">Cara Pakai:</p>
                          <p>{scan.cara_pakai}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No scans yet.</p>
                )}
              </ScrollArea>
            </TabsContent>

            {/* Actions */}
            <TabsContent value="actions">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Scan Your Skin',
                    description: 'Upload a new photo of your skin condition and get analysis.',
                    button: 'Upload & Scan',
                    url: '/upload-penyakit',
                  },
                  {
<<<<<<< HEAD
                    title: 'Update Profile Info',
                    description: 'Keep your profile up to date for better recommendations.',
                    button: 'Edit Profile',
                    // url: "/maps",
=======
                    title: "Update Profile Info",
                    description: "Keep your profile up to date for better recommendations.",
                    button: "Edit Profile",
                    onClick: () => setOpen(true),
>>>>>>> upstream/main
                  },
                  {
                    title: 'Check the nearest clinic',
                    description: 'Find the nearest clinic for your skin condition.',
                    button: 'Find Clinic',
                    url: '/maps',
                  },
                ].map((action, i) => (
                  <Card key={i} ref={(el) => (cardRefs.current[sections.length + scans.length + i] = el)}>
                    <CardHeader>
                      <CardTitle>{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{action.description}</p>
<<<<<<< HEAD
                      <Button className="mt-3" onClick={() => navigate(action.url)}>
                        {action.button}
                      </Button>
=======
                      <Button className="mt-3" onClick={() => {
                          if (action.onClick) {
                            action.onClick();
                          } else if (action.url) {
                            navigate(action.url);
                          }
                        }} >{action.button}</Button>
>>>>>>> upstream/main
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        
        <DialogContent >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information to keep it current.
          </DialogDescription>
          <div className="flex">
           <div className="flex-1 space-y-4 flex flex-col">
             <Label htmlFor="full-name" className="block mb-2">Full Name</Label>
             <Input id="full-name" placeholder="Name" />
             <Label htmlFor="email" className="block mb-2">Email</Label>
             <Input id="email" placeholder="Email" />
             <Label htmlFor="phone" className="block mb-2">Phone Number</Label>
             <Input id="phone" placeholder="Phone Number" />
             <Label htmlFor="address" className="block mb-2">Address</Label>
             <Input id="address" placeholder="Address" />
             <Label htmlFor="date-picker" className="block mb-2">Date of Birth</Label>
             <DatePicker id="date-picker" value={birthDate} onChange={setBirthDate} />
              <Label htmlFor="photo-profile" className="block mb-2">Profile Photo</Label>
             <Input id="photo-profile" type="file" accept="image/*" className="mt-2" />
           </div>
           <Separator orientation="vertical" className="mx-4" />
           <div className="flex-1 space-y-4">
              <Label htmlFor="height" className="block mb-2">Height</Label>
              <Input id="height" placeholder="Height" type={'number'} />
              <Label htmlFor="weight" className="block mb-2">Weight</Label>
              <Input id="weight" placeholder="Weight" type={'number'} />
              
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
