import React from 'react';
import { AdminPanel } from './AdminPanel';

interface AdminSMAITProps {
  onNavigate: (page: string) => void;
}

export const AdminSMAIT: React.FC<AdminSMAITProps> = ({ onNavigate }) => {
  return (
    <AdminPanel
      userRole="Admin Unit"
      userName="Admin SMAIT"
      unitName="SMAIT Baituljannah"
      accentColor="#8B5CF6"
      onNavigate={onNavigate}
    />
  );
};
