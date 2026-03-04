'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';

export default function AdminAchievementPage() {
  const { menuItems } = useNavigationMenu('admin');
  const accentColor = '#1E4AB8';
  const [count] = useState(0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        accentColor={accentColor}
        userRole="Super Admin"
        userName="Admin Utama"
      />
      <main className="flex-1 p-6">
        <div className="bg-white rounded-2xl p-8 shadow-soft">
          <h1 className="text-2xl mb-2">Manajemen Prestasi</h1>
          <p className="text-gray-600">Halaman ini masih dalam pengembangan. Total data: {count}</p>
        </div>
      </main>
    </div>
  );
}
