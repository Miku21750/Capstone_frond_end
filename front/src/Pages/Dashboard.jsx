import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
export const Dashboard = () => {
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    age: 28,
    gender: "Female",
    avatar: "/user-avatar.jpg",
    lastLogin: "May 25, 2025",
    scans: [
      {
        id: "scan-001",
        date: "2025-05-20",
        result: "Eczema Detected",
        image: "/scans/eczema.jpg",
        recommendation: "Use moisturizer and avoid harsh soaps.",
      },
      {
        id: "scan-002",
        date: "2025-04-10",
        result: "No signs of skin disease",
        image: "/scans/normal.jpg",
        recommendation: "Maintain daily skincare routine.",
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
    <SidebarProvider>
      <Sidebar > 
         <Card className="max-w-3xl mb-4">
              <CardHeader>
                <CardTitle className={'text-2xl text-center'}>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.age}</p>
                  <p>{user.gender}</p>
                  <p>{user.lastLogin}</p>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full mb-4" variant="ghost">Home</Button>
            <Button className="w-full mb-4" variant="ghost">About</Button>
            <Button className="w-full mb-4" variant="ghost">Education</Button>
            <Button className="w-full mb-4" variant="ghost">Logout</Button>
      </Sidebar>
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name} 👋</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4 p-5">
            <TabsTrigger className={'text-2xl p-5'} value="profile">Profile Info</TabsTrigger>
            <TabsTrigger className={'text-2xl p-5'} value="scans">Scan History</TabsTrigger>
            <TabsTrigger className={'text-2xl p-5'} value="actions">Quick Actions</TabsTrigger>
          </TabsList>

          {/* Profile Info */}
          <TabsContent value="profile">
            <Card className="max-w-3xl mb-4">
              <CardHeader>
                <CardTitle className={'text-3xl'}>Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4 items-center">
                <div>
                  <h1 className="text-2xl"><strong>Email</strong> </h1>
                  <h1 className="text-2xl"><strong>Age</strong> </h1>
                  <h1 className="text-2xl"><strong>Gender</strong> </h1>
                  <h1 className="text-2xl"><strong>Last Login</strong></h1>
                </div>
                <div>
                  <h1 className="text-2xl">: {user.email}</h1>
                  <h1 className="text-2xl">: {user.age}</h1>
                  <h1 className="text-2xl">: {user.gender}</h1>
                  <h1 className="text-2xl">: {user.lastLogin}</h1>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scan History */}
          <TabsContent value="scans">
            <ScrollArea className="h-[400px] pr-4">
              {user.scans.map((scan) => (
                <Card key={scan.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{scan.date}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-6">
                    <img src={scan.image} alt="Scan" className="h-32 w-32 object-cover rounded-lg" />
                    <div>
                      <p><strong>Result:</strong> {scan.result}</p>
                      <p><strong>Recommendation:</strong> {scan.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </TabsContent>

          {/* Quick Actions */}
          <TabsContent value="actions">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scan Your Skin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Upload a new photo of your skin condition and get analysis.</p>
                  <Button className="mt-2">Upload & Scan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Update Profile Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Keep your profile up to date for better recommendations.</p>
                  <Button className="mt-2">Edit Profile</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Check the nearest clinic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Find the nearest clinic for your skin condition.</p>
                  <Button className="mt-2">Find Clinic</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </SidebarProvider>
    </div>
  );
};
