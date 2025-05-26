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
      title: "Types of Skin Diseases",
      url: "#",
      items: [
        {
          title: "Acne",
          url: "#",
        },
        {
          title: "Eczema",
          url: "#",
        },
        {
          title: "Psoriasis",
          url: "#",
        },
        {
          title: "Rosacea",
          url: "#",
        },
        {
          title: "Fungal Infections",
          url: "#",
        },
        {
          title: "Skin Cancer",
          url: "#",
        },
      ],
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
  ...props
}) {
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
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className={' font-quicksand'} asChild isActive={item.isActive}>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
