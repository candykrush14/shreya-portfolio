import React, { useState } from 'react';
import LeftNavigation from './navigation/LeftNavigation';
import SimpleDashboardDndKit from './SimpleDashboardDndKit';
import DataUpload from './upload/DataUpload';
import AIAnalyticsSimple from './ai/AIAnalyticsSimple';

const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDataUpload = (data: any[], filename: string) => {
    setUploadedData(data);
    setFileName(filename);
    // Optionally switch to dashboard to see the data
    // setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SimpleDashboardDndKit />;
      case 'upload':
        return (
          <DataUpload 
            onDataUpload={handleDataUpload}
            uploadedData={uploadedData}
            uploadedFileName={fileName}
          />
        );
      case 'ai-analytics':
        return <AIAnalyticsSimple data={uploadedData} fileName={fileName} />;
      default:
        return <SimpleDashboardDndKit />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainDashboard;
