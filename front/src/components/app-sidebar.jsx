import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { useState } from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./ui/button"
import { Link } from "react-router"
import { SearchForm } from "./search-form"
const data = {
  navMain: [
    {
      title: "Introduction",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/education",

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
          url: "/education/prevention-tips/daily-skincare-routine",
        },
        {
          title: "Hygiene Advice",
          url: "/education/prevention-tips/hygiene-advice",
        },
        {
          title: "Lifestyle Choices",
          url: "/education/prevention-tips/lifestyle-choices",
        },
        {
          title: "Sun Protection",
          url: "/education/prevention-tips/sun-protection",
        },
      ],
    },
    {
      title: "Treatment Options",
      url: "#",
      items: [
        {
          title: "Over-the-Counter",
          url: "/education/treatment-option/over-the-counter",
        },
        {
          title: "Prescription",
          url: "/education/treatment-option/prescription",
        },
        {
          title: "Natural Remedies",
          url: "/education/treatment-option/natural-remedies",
        },
        {
          title: "When to Seek Medical Help",
          url: "/education/treatment-option/when-to-seek-help",
        },
      ],
    },
    {
      title: "Other",
      url: "#",
      items: [
        {
          title: "Myths & Facts",
          url: "/education/other/myths-facts",
        },
        {
          title: "FAQs",
          url: "/education/other/faqs",
        },
        {
          title: "Resources & References",
          url: "/education/other/resources-references",
        },
        {
          title: "Contact / Ask a Dermatologist",
          url: "/education/other/ask-a-dermatologist",
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
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>

      <SidebarHeader>
        <SearchForm className="w-full " />
      </SidebarHeader>
      <SidebarContent className={'bg-cold-2/50'}>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
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
          </SidebarGroup>
        ))}
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      </Sidebar>
  );
}
