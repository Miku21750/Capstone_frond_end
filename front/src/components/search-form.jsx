import { Search } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { SidebarInput, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';

export function SearchForm({ searchKeyword, setSearchKeyword, ...props }) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput id="search" placeholder="Cari di dokumen..." className="pl-8" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
