'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data } = useQuery({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({ tag, page, perPage: 10, search: debouncedSearch }),
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SearchBox
            value={search}
             onChange={(value) => setSearch(value)}
        />
        <button onClick={() => setIsModalOpen(true)}>Add Note</button>
      </div>

      <NoteList notes={data?.notes || []} />

    <Pagination
        current={page}
        total={data?.totalPages || 1}
        onChange={(p) => setPage(p)}
    />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            />
        </Modal>
      )}
    </div>
  );
}