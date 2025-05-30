import ApiRequest from '@/api'
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from '@/components/ui/button'
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router"
export default function Information() {
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
        <div className="[--header-height:calc(theme(spacing.14))]">
            <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
                <AppSidebar  
                    itemsJson={filteredConditions}
                    onItemClick={(item) => setSelectedCondition(item)}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                />
                <SidebarInset>
                    <Outlet/>
                </SidebarInset>
            </div>
            </SidebarProvider>
        </div>
    )
}
