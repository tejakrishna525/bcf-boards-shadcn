// src/app/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import ItemList from '@/components/itemslist';
import SkeletonCard from '@/components/SkeletonCard';
import { Sidebar } from '@/components/SideBar';

export interface BcfBoard {
  id: number;
  name: string;
  createdAt: string;
}

export interface Bcf {
  id: number;
  name: string;
  createdAt: string;
  bcfBoards: BcfBoard[];
}

export interface Board {
  id: number;
  name: string;
  createdAt: string;
  bcfs: Bcf[];
}

export interface Prompt {
  id: number;
  name: string;
  createdAt: string;
}

const Home = () => {
  const [data, setData] = useState<{ boards: Board[], prompts: Prompt[] }>({ boards: [], prompts: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/items', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const items = await response.json();
        console.log('Items:', items); // Log the items before setting state
        setData(items);
      } catch (err) {
        console.error('Data fetching error:', err); // Log errors
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="grid grid-cols-3 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return <main>{error}</main>;
  }

  return (
    <main className="flex float:left border">
      <Sidebar /> {/* Display the SelectForm component */}
      <div className=" w-full ">
        <ItemList data={data} />
      </div>
    </main>
  );
};

export default Home;
