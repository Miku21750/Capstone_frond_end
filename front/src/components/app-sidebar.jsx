import * as React from "react"

import { useState } from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./ui/button"
import { Link } from "react-router"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Introduction",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Skin Conditions",
      url: "#",
      items: [],
    },
    {
      title: "Prevention Tips",
      url: "#",
      items: [
        {
          title: "Daily Skincare Routine",
          url: "#",
        },
        {
          title: "Hygiene Advice",
          url: "#",
        },
        {
          title: "Lifestyle Choices",
          url: "#",
        },
        {
          title: "Sun Protection",
          url: "#",
        },
      ],
    },
    {
      title: "Treatment Options",
      url: "#",
      items: [
        {
          title: "Over-the-Counter",
          url: "#",
        },
        {
          title: "Prescription",
          url: "#",
        },
        {
          title: "Natural Remedies",
          url: "#",
        },
        {
          title: "When to Seek Medical Help",
          url: "#",
        },
      ],
    },
    {
      title: "More",
      url: "#",
      items: [
        {
          title: "Myths & Facts",
          url: "#",
        },
        {
          title: "FAQs",
          url: "#",
        },
        {
          title: "Resources & References",
          url: "#",
        },
        {
          title: "Contact / Ask a Dermatologist",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({
  items= [],
  onItemClick,
  searchKeyword,
  setSearchKeyword
}) {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleGroup = () => {
    setIsOpen(!isOpen);
  };
  // const sidebarItems = items.map((item) => ({
  //   title: item.name,
  //   url: `/conditions/${item.name.toLowerCase().replace(/\s+/g, '-')}`, 
  //   isActive: false,
  // }));
  // data.navMain[1].items.push(...sidebarItems);

  // Confirm
  // console.log(items);
  return (
    // <Sidebar>
    //   <SidebarHeader>
    //     {/* <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} /> */}
    //     <SearchForm
    //       searchKeyword={searchKeyword}
    //       setSearchKeyword={setSearchKeyword}
    //     />
    //   </SidebarHeader>
    //   <SidebarContent>
    //     {data.navMain.map((group) => (
    //       <SidebarGroup key={group.title}>
    //         <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
    //         <SidebarGroupContent>
    //           <SidebarMenu>
    //             {group.items.map((item) => (
    //               <SidebarMenuItem key={item.title}>
    //                 <SidebarMenuButton className={' font-quicksand'} asChild isActive={item.isActive}>
    //                   <Link to={item.url}>{item.title}</Link>
    //                 </SidebarMenuButton>
    //               </SidebarMenuItem>
    //             ))}
    //           </SidebarMenu>
    //         </SidebarGroupContent>
    //       </SidebarGroup>
    //     ))}
    //   </SidebarContent>
    //   <SidebarRail />
    // </Sidebar>

    <Sidebar>
      <SidebarHeader>
        <SearchForm
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div
            className="flex items-center justify-between cursor-pointer px-2 py-1"
            onClick={toggleGroup}
          >
            <SidebarGroupLabel className="text-base font-semibold">
              Skin Conditions
            </SidebarGroupLabel>
            <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
              <ChevronRight size={16} />
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-100' : 'max-h-0 opacity-0'
            }`}
            >
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) =>(
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      className="font-quicksand"
                      asChild
                      onClick={() => onItemClick(item)}
                    >
                      <button>{item.name}</button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
