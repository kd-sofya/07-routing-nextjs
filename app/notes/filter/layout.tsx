import React from 'react';
import css from '@/app/notes/Notes.module.css';

interface LayoutProps {
  children: React.ReactNode; 
  sidebar: React.ReactNode; 
}

export default function FilterLayout({ children, sidebar }: LayoutProps) {
  return (
    <div
      className={css.container}
      style={{ display: 'flex', gap: '30px', padding: '20px' }}
    >
      <aside style={{ width: '250px', borderRight: '1px solid #ddd' }}>

        {sidebar}
      </aside>

      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  );
}