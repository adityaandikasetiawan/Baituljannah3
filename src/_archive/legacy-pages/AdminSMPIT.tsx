import React from 'react';
import { AdminPanel } from './AdminPanel';

interface AdminSMPITProps {
  onNavigate: (page: string) => void;
}

export const AdminSMPIT: React.FC<AdminSMPITProps> = ({ onNavigate }) => {
  return (
    <AdminPanel
      userRole="Admin Unit"
      userName="Admin SMPIT"
      unitName="SMPIT Baituljannah"
      accentColor="#F97316"
      onNavigate={onNavigate}
    />
  );
};
