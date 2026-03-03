import React from 'react';
import { AdminPanel } from './AdminPanel';

interface AdminTKITProps {
  onNavigate: (page: string) => void;
}

export const AdminTKIT: React.FC<AdminTKITProps> = ({ onNavigate }) => {
  return (
    <AdminPanel
      userRole="Admin Unit"
      userName="Admin TKIT"
      unitName="TKIT Baituljannah"
      accentColor="#10B981"
      onNavigate={onNavigate}
    />
  );
};
