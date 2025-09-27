import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Download } from 'lucide-react';

interface Props {
  onDataUpload: (data: any[], fileName: string) => void;
  uploadedData: any[];
  uploadedFileName: string;
}

const DataUpload: React.FC<Props> = ({ onDataUpload, uploadedData, uploadedFileName }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        let data;
        
        if (file.name.endsWith('.json')) {
          data = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split('\n');
          const headers = lines[0].split(',');
          data = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim();
            });
            return obj;
          });
        }
        
        onDataUpload(Array.isArray(data) ? data : [data], file.name);
      } catch (error) {
        alert('Error parsing file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const downloadCSVTemplate = () => {
    const csvTemplate = "name,age,email,department,salary\nJohn Doe,30,john@example.com,Engineering,75000\nJane Smith,25,jane@example.com,Marketing,60000\nMike Johnson,35,mike@example.com,Sales,65000";
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSONTemplate = () => {
    const jsonTemplate = [
      { name: "John Doe", age: 30, email: "john@example.com", department: "Engineering", salary: 75000 },
      { name: "Jane Smith", age: 25, email: "jane@example.com", department: "Marketing", salary: 60000 },
      { name: "Mike Johnson", age: 35, email: "mike@example.com", department: "Sales", salary: 65000 }
    ];
    const blob = new Blob([JSON.stringify(jsonTemplate, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Data Upload</h2>

      {/* Template Download Section */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Download Sample Templates</h3>
        <p className="text-blue-700 mb-3 text-sm">Get started with our sample data templates:</p>
        <div className="flex gap-3">
          <button
            onClick={downloadCSVTemplate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={16} />
            CSV Template
          </button>
          <button
            onClick={downloadJSONTemplate}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            JSON Template
          </button>
        </div>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold mb-2">Upload your data file</h3>
        <p className="text-gray-600 mb-4">Drag and drop a JSON or CSV file here, or click to browse</p>
        <input
          type="file"
          accept=".json,.csv"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
        >
          Choose File
        </label>
      </div>

      {uploadedData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Data: {uploadedFileName}</h3>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-600 mb-2">
              {uploadedData.length} records loaded
            </p>
            <div className="max-h-64 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {uploadedData[0] && Object.keys(uploadedData[0]).map(key => (
                      <th key={key} className="text-left p-2">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.slice(0, 5).map((row, index) => (
                    <tr key={index} className="border-b">
                      {Object.values(row).map((value: any, i) => (
                        <td key={i} className="p-2">{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataUpload;
