import * as React from 'react';
import { BookOpen, Bot, Command, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal } from 'lucide-react';

import { useState, useMemo, useRef, useEffect } from 'react';

// import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from '@/components/version-switcher';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router';
import { SearchForm } from './search-form';
// import { AnimatePresence, motion } from "framer-motion"
import gsap from 'gsap';
import { icon } from 'leaflet';

// const collapseVariants = {
//   hidden: {height: 0, opacity: 0},
//   visible: { height: "auto", opacity: 1}
// }
const data = {
  navMain: [
    {
      title: 'Introduction',
      icon: BookOpen,
      url: '#',
      items: [
        {
          title: 'Overview',
          url: '/education',
        },
      ],
    },
    {
      title: 'Kondisi Kulit',
      icon: BookOpen,
      url: '#',
      items: [],
    },
    {
      title: 'Tips Pencegahan',
      icon: BookOpen,
      url: '#',
      items: [
        {
          title: 'Daily Skincare Routine',
          url: '/education/prevention-tips/daily-skincare-routine',
        },
        {
          title: 'Hygiene Advice',
          url: '/education/prevention-tips/hygiene-advice',
        },
        {
          title: 'Lifestyle Choices',
          url: '/education/prevention-tips/lifestyle-choices',
        },
        {
          title: 'Sun Protection',
          url: '/education/prevention-tips/sun-protection',
        },
      ],
    },
    {
      title: 'Treatment Options',
      icon: BookOpen,
      url: '#',
      items: [
        {
          title: 'Over-the-Counter',
          url: '/education/treatment-option/over-the-counter',
        },
        {
          title: 'Prescription',
          url: '/education/treatment-option/prescription',
        },
        {
          title: 'Natural Remedies',
          url: '/education/treatment-option/natural-remedies',
        },
        {
          title: 'When to Seek Medical Help',
          url: '/education/treatment-option/when-to-seek-help',
        },
      ],
    },
    {
      title: 'Other',
      icon: BookOpen,
      url: '#',
      items: [
        {
          title: 'Myths & Facts',
          url: '/education/other/myths-facts',
        },
        {
          title: 'FAQs',
          url: '/education/other/faqs',
        },
        {
          title: 'Resources & References',
          url: '/education/other/resources-references',
        },
        {
          title: 'Contact / Ask a Dermatologist',
          url: '/education/other/ask-a-dermatologist',
        },
      ],
    },
  ],
};
export function AppSidebar({ itemsJson = [], onItemClick, searchKeyword, setSearchKeyword, ...props }) {
  const [openGroups, setOpenGroups] = useState(() => {
    return data.navMain.reduce((acc, group) => {
      acc[group.title] = true;
      return acc;
    }, {});
  });

  const refs = useRef({});

  const toggleGroup = (groupTitle) => {
    const isOpen = openGroups[groupTitle];
    const contentEl = refs.current[groupTitle];
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: !isOpen,
    }));

    if (!contentEl) return;
    if (isOpen) {
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          contentEl.style.display = 'none';
          contentEl.style.removeProperty('height');
        },
      });
    } else {
      contentEl.style.display = 'block';
      const fullHeight = contentEl.scrollHeight;
      gsap.fromTo(
        contentEl,
        { height: 0, opacity: 0 },
        {
          height: fullHeight,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            contentEl.style.height = 'auto';
          },
        }
      );
    }
  };

  const sidebarItems = itemsJson.map((item) => ({
    title: item.name,
    url: `/education/skin-conditions/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
    isActive: false,
  }));

  data.navMain[1].items = sidebarItems;

  const filteredNavMain = useMemo(() => {
    if (!searchKeyword) return data.navMain;

    return data.navMain
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.title.toLowerCase().includes(searchKeyword.toLowerCase())),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchKeyword]);

  useEffect(() => {
    Object.entries(refs.current).forEach(([groupTitle, el]) => {
      if (!el) return;
      el.style.overflow = 'hidden';
      if (openGroups[groupTitle]) {
        el.style.display = 'block';
        el.style.height = 'auto';
      } else {
        el.style.display = 'none';
        el.style.height = '0px';
      }
    });
  }, []);

  const navigate = useNavigate();
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarHeader>
        <SearchForm className="w-full md:hidden" value={searchKeyword} onChange={(e) => setSearchKeyword?.(e.target.value)} />
      </SidebarHeader>
      <SidebarContent className={'bg-[#E9F3F4] scrollbar-thin overflow-y-auto'}>
        {filteredNavMain.map((group) => {
          const isOpen = openGroups[group.title];
          return (
            <SidebarGroup key={group.title}>
              <button onClick={() => toggleGroup(group.title)} className="flex items-center justify-between w-full px-2 py-2 text-left font-semibold hover:bg-[#E9F3F4]">
                <SidebarGroupLabel className={'text-lg inline-flex gap-5'}>
                  {group.title} <group.icon />{' '}
                </SidebarGroupLabel>
                <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={16} />
              </button>

              <div ref={(el) => (refs.current[group.title] = el)} className="overflow-hidden ">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          className="font-quicksand"
                          asChild
                          onClick={() => {
                            navigate(`${item.url}`);
                            onItemClick?.(item);
                          }}
                        >
                          <button>{item.title}</button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </div>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
