'use client';

import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { colorValues } from '@/lib/design-tokens';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="border-b sticky top-0 z-10" style={{ backgroundColor: colorValues.surface.base, borderColor: colorValues.border.subtle }}>
      <div className="px-8 py-4 flex items-center justify-between gap-6">
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: colorValues.text.tertiary }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search snippets..."
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all duration-200"
              style={{
                backgroundColor: colorValues.background.secondary,
                borderColor: colorValues.border.subtle,
                color: colorValues.text.primary,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = colorValues.accent.primary)}
              onBlur={(e) => (e.currentTarget.style.borderColor = colorValues.border.subtle)}
            />
          </div>
        </form>

        <Button
          onClick={() => router.push('/dashboard/add')}
          className="flex items-center gap-2 px-4 py-3 text-white rounded-lg font-medium transition-all duration-200"
          style={{ backgroundColor: colorValues.accent.primary }}
        >
          <Plus className="w-5 h-5" />
          Add Snippet
        </Button>
      </div>
    </header>
  );
}
