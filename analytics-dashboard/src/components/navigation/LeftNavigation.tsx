import React from 'react';
import { LayoutDashboard, Upload, Brain } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const LeftNavigation: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Data Upload', icon: Upload },
    { id: 'ai-analytics', label: 'AI Insights', icon: Brain }
  ];

  return (
    <div className="bg-white border-r h-full w-60 flex flex-col">
      <div className="p-4 border-b">
        <h1 className="font-bold text-xl">Analytics</h1>
      </div>
      <nav className="flex-1 p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded mb-1 ${
                activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default LeftNavigation;
