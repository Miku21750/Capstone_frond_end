import * as React from "react"

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
  ...props
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} /> */}
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
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
      <SidebarRail />
    </Sidebar>
  );
}
