import React from 'react';
import { AdminPanel } from './AdminPanel';

interface AdminSLBITProps {
  onNavigate: (page: string) => void;
}

export const AdminSLBIT: React.FC<AdminSLBITProps> = ({ onNavigate }) => {
  return (
    <AdminPanel
      userRole="Admin Unit"
      userName="Admin SLBIT"
      unitName="SLBIT Baituljannah"
      accentColor="#14B8A6"
      onNavigate={onNavigate}
    />
  );
};
