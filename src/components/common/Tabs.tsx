import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  accentColor?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, accentColor = '#1E4AB8' }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 text-sm transition-all relative ${
              activeTab === index
                ? ''
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={activeTab === index ? { color: accentColor } : {}}
          >
            {tab.label}
            {activeTab === index && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};
