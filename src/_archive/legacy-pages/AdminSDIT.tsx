import React from 'react';
import { AdminPanel } from './AdminPanel';

interface AdminSDITProps {
  onNavigate: (page: string) => void;
}

export const AdminSDIT: React.FC<AdminSDITProps> = ({ onNavigate }) => {
  return (
    <AdminPanel
      userRole="Admin Unit"
      userName="Admin SDIT"
      unitName="SDIT Baituljannah"
      accentColor="#3B82F6"
      onNavigate={onNavigate}
    />
  );
};
