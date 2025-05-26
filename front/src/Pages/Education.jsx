import ApiRequest from '@/api'
import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router'


export const Education = () => {
    const navigate = useNavigate();
    const [conditions, setConditions] = useState([])
    const [selectedCondition, setSelectedCondition] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() =>{
        ApiRequest.get('/api/list-skin-condition')
            .then(res => setConditions(res.data))
            .catch(err => console.error("Failed to fetch conditions", err))
    },[])

    const filteredConditions = conditions.filter((condition) =>
        condition.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <>
            <SidebarProvider>
                <AppSidebar 
                    items={filteredConditions}
                    onItemClick={(item) => setSelectedCondition(item)}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                />
                <SidebarInset>
                    <header className="flex  items-center justify-between px-4 gap-2 py-4 bg-cold-1">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                        <div className="space-x-4">
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/')}
                            >
                                Home
                            </Button>
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/about')}
                            >
                                About
                            </Button>
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/education')}
                            >
                                Education
                            </Button>
                        </div>

                        <div className="space-x-4">
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </Button>
                        </div>
                    </header>
                <section className='relative h-screen bg-cold-4/0'>
                    {selectedCondition ? (
                        <>
                            <h2 className='text-2xl font-bold mb-4'>{selectedCondition.name}</h2>
                            {selectedCondition.images.map((image, index) =>(
                                <img
                                    key={index}
                                    src={image.localPath} // e.g., "/images/conditions/actinic-keratosis/0.jpg"
                                    alt={image.alt}
                                    title={image.title}
                                    className="rounded shadow-md mb-4"
                                />
                            ))}
                            {selectedCondition.sections.map((section, index) => (
                                <div key={index} className='mb-6'>
                                    {section.level === 'h1' && (
                                        <h1 className="text-3xl font-extrabold mb-2">{section.heading}</h1>
                                    )}
                                    {section.level === 'h2' && (
                                        <h2 className="text-2xl font-bold mb-2">{section.heading}</h2>
                                    )}
                                    {section.level === "h3" && (
                                        <h3 className="text-xl font-semibold mb-1">{section.heading}</h3>
                                    )}
                                    <p className="whitespace-pre-wrap text-base text-gray-800">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </>
                    ):(
                        <></>
                    )}
                </section>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
