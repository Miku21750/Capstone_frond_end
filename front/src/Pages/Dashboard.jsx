import { useEffect, useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Stethoscope, Sun, Timer, User2 } from "lucide-react";
import ApiRequest from "@/api";

export const Dashboard = () => {

  // GSAP Animations - scoped safely
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(avatarRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(cardRefs.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);

  
  const [scans, setScans] = useState([]);
  const [user, setUser] = useState({
    name: "Loading....",
    age: "",
    address: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    avatar: "/user-avatar.jpg", 
    lastLogin: "", 
  })
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

  useEffect(() =>{
    //fetch user
    const fetchUserProfile = async () => {
      try {
        const res = await ApiRequest.get("/api/user/detail")
        setUser(res.data)
      } catch (error) {
        console.error("failed to fetch data user : ",error)
      }
    }

    //fetch image scanner
    const fetchUserScans = async () => {
      try {
        const res = await ApiRequest.get("/api/users/dataScans")
        setScans(res.data)
      } catch (error) {
        console.error("Falied to load dara : ", error)
      }
    }

    fetchUserScans();
    fetchUserProfile();
  }, [])

  // Card Section Definitions
  const sections = [
    {
      title: "Personal Information",
      icon: <User2 className="h-6 w-6 text-gray-500" />,
      content: [
        ["Full Name", user.name],
        ["Email", user.email],
        ["Gender", user.gender],
        ["Age", user.age],
        ["Last Login", user.lastLogin],
        ["Location", user.location],
        ["Phone", user.Phone],
      ],
      bg: "bg-emerald-100",
    },
    {
      title: "Skin & Health Details",
      icon: <Stethoscope className="h-6 w-6 text-gray-500" />,
      content: [
        ["Skin Type", "Oily"],
        ["Known Allergies", "Pollen, Nuts"],
        ["Chronic Conditions", "Eczema"],
        ["Preferred Clinic", "HealthSkin Center"],
        ["Last Skin Checkup", "April 14, 2025"],
      ],
      bg: "bg-pink-100",
    },
    {
      title: "App Activity",
      icon: <Timer className="h-6 w-6 text-gray-500" />,
      content: [
        ["Total Scans", scans.length],
        ["Last Scan", (new Date(scans[0]?.uploadedAt).toLocaleDateString())],
        ["Scan Frequency", "Every 2 weeks"],
      ],
      bg: "bg-sky-100",
    },
    {
      title: "Environmental Exposure",
      icon: <Sun className="h-6 w-6 text-gray-500" />,
      content: [
        ["Sun Exposure", "Moderate"],
        ["Pollution Level", "Low"],
        ["Sunscreen Usage", "Daily"],
        ["Routine", "Morning & Night"],
        ["Product Usage", "Cleanser, Moisturizer, Sunscreen"],
      ],
      bg: "bg-amber-100",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800">
      <SidebarProvider>
        <Sidebar>
          <Card className="max-w-3xl mb-4 shadow-md rounded-xl border-0">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center text-center">
              <Avatar
                ref={avatarRef}
                className="h-24 w-24 ring-2 ring-emerald-500"
              >
                <AvatarImage src={user.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm">{user.age} • {user.gender}</p>
              </div>
            </CardContent>
          </Card>

          {["Home", "About", "Education"].map((label, i) => (
            <Button key={i} className="w-full mb-2" variant="ghost">
              {label}
            </Button>
          ))}
          <Button className="w-full mt-2" variant="destructive">
            Logout
          </Button>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 tracking-tight">
            Welcome back, {user.name} 👋
          </h1>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6 bg-white rounded-lg shadow flex-wrap">
              {["profile", "scans", "actions"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-lg px-6 py-2 capitalize"
                >
                  {tab.replace(/^\w/, (c) => c.toUpperCase())}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Profile Info */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section, idx) => (
                  <Card
                    key={section.title}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    className="bg-white shadow-lg"
                  >
                    <CardHeader className={`${section.bg} flex justify-between items-center p-4 rounded-t-lg`}>
                      <CardTitle className="text-xl font-semibold">
                        {section.title}
                      </CardTitle>
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
                      />
                      <div>
                        {/* <p className="font-medium">Result:</p>
                        <p>{scan.result}</p>
                        <p className="font-medium mt-2">Recommendation:</p>
                        <p>{scan.recommendation}</p> */}
                      </div>
                    </CardContent>
                  </Card>
                )): <p>No scans yet.</p>}
              </ScrollArea>
            </TabsContent>

            {/* Actions */}
            <TabsContent value="actions">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Scan Your Skin",
                    description: "Upload a new photo of your skin condition and get analysis.",
                    button: "Upload & Scan",
                  },
                  {
                    title: "Update Profile Info",
                    description: "Keep your profile up to date for better recommendations.",
                    button: "Edit Profile",
                  },
                  {
                    title: "Check the nearest clinic",
                    description: "Find the nearest clinic for your skin condition.",
                    button: "Find Clinic",
                  },
                ].map((action, i) => (
                  <Card
                    key={i}
                    ref={(el) => (cardRefs.current[sections.length + scans.length + i] = el)}
                  >
                    <CardHeader>
                      <CardTitle>{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{action.description}</p>
                      <Button className="mt-3">{action.button}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarProvider>
    </div>
  );
};
