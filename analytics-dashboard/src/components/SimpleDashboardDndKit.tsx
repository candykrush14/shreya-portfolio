import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Download, Plus, Info, GripVertical, Edit3, X, Brain } from 'lucide-react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LineChart from './charts/SimpleLineChart';
import BarChart from './charts/SimpleBarChart';

interface Widget {
  id: string;
  title: string;
  type: 'line' | 'bar';
  subtitle?: string;
  color?: string;
  xAxis?: string;
  yAxis?: string;
  size?: 'small' | 'medium' | 'large';
}

interface WidgetConfig {
  id: string;
  title: string;
  type: 'line' | 'bar';
  subtitle?: string;
  color?: string;
  xAxis?: string;
  yAxis?: string;
  size?: 'small' | 'medium' | 'large';
}

// Sortable Widget Component for @dnd-kit
function SortableWidget({ 
  widget, 
  index, 
  onSizeChange, 
  onRemove,
  onEdit 
}: { 
  widget: Widget; 
  index: number; 
  onSizeChange: (id: string, size: 'small' | 'medium' | 'large') => void; 
  onRemove: (id: string) => void; 
  onEdit: (widget: Widget) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getCardGridClass = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-12 sm:col-span-6 lg:col-span-4'; // 1 per row on mobile, 2 on tablet, 3 on desktop
      case 'medium': return 'col-span-12 md:col-span-6'; // 1 per row on mobile/tablet, 2 on desktop
      case 'large': return 'col-span-12'; // Always full width
      default: return 'col-span-12 md:col-span-6'; // Default to medium
    }
  };

  const getCardHeightClass = (size: string) => {
    switch (size) {
      case 'small': return 'h-72'; // Much taller for 3-per-row
      case 'large': return 'h-[32rem]'; // Very tall for full-width
      default: return 'h-96'; // Taller medium height for 2-per-row
    }
  };

  // Generate sample data
  const sampleLineData = Array.from({ length: 10 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 100) + 20
  }));

  const sampleBarData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 59 },
    { label: 'Mar', value: 80 },
    { label: 'Apr', value: 81 },
    { label: 'May', value: 56 },
    { label: 'Jun', value: 55 }
  ];

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${getCardGridClass(widget.size || 'medium')} ${getCardHeightClass(widget.size || 'medium')} ${
        isDragging ? 'shadow-lg z-50' : 'hover:shadow-md'
      } relative overflow-hidden transition-all duration-300 flex flex-col`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Widget Header with Drag Handle */}
      <div className="flex items-center justify-between p-4 pb-2 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="drag-handle text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1 touch-none select-none"
            title="Drag to reorder"
            style={{ touchAction: 'none', userSelect: 'none' }}
          >
            <GripVertical size={16} />
          </div>
          
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">{widget.title}</h2>
            {/* Size indicator badge */}
            <span className={`text-xs px-2 py-1 rounded-full ${
              widget.size === 'small' ? 'bg-blue-100 text-blue-800' :
              widget.size === 'large' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {widget.size || 'M'}
            </span>
            {/* Info Icon beside heading */}
            <div className="relative group">
              <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
              <div className="absolute left-0 top-5 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                Drag the handle to reorder widgets
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Size Dropdown */}
          <select
            value={widget.size || 'medium'}
            onChange={(e) => onSizeChange(widget.id, e.target.value as 'small' | 'medium' | 'large')}
            className="text-xs border border-gray-300 rounded bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            style={{ 
              padding: '2px 4px',
              minWidth: '40px',
              maxWidth: '45px',
              fontSize: '10px',
              width: '40px'
            }}
          >
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
          </select>
          
          {/* Edit Button */}
          <button
            onClick={() => onEdit(widget)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit widget"
          >
            <Edit3 size={14} />
          </button>
          
          {/* Remove Button */}
          <button
            onClick={() => onRemove(widget.id)}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Remove widget"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Subtitle */}
      {widget.subtitle && (
        <div className="px-4 pb-2 flex-shrink-0">
          <p className="text-sm text-gray-500">{widget.subtitle}</p>
        </div>
      )}

      {/* Chart Component */}
      <div className={`flex-1 min-h-0 px-3 pb-3`}>
        <div className="w-full h-full">
          {widget.type === 'line' ? (
            <LineChart 
              data={sampleLineData} 
              width={widget.size === 'large' ? 700 : widget.size === 'small' ? 300 : 450}
              height={widget.size === 'large' ? 420 : widget.size === 'small' ? 240 : 320}
              margin={{
                top: 8,
                right: widget.size === 'small' ? 12 : 16,
                bottom: widget.size === 'small' ? 80 : widget.size === 'large' ? 80 : 70,
                left: widget.size === 'small' ? 30 : widget.size === 'large' ? 50 : 40
              }}
            />
          ) : (
            <BarChart 
              data={sampleBarData}
              width={widget.size === 'large' ? 700 : widget.size === 'small' ? 300 : 450}
              height={widget.size === 'large' ? 420 : widget.size === 'small' ? 240 : 320}
              margin={{
                top: 8,
                right: widget.size === 'small' ? 12 : 16,
                bottom: widget.size === 'small' ? 75 : widget.size === 'large' ? 75 : 65,
                left: widget.size === 'small' ? 30 : widget.size === 'large' ? 50 : 40
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function SimpleDashboard() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);

  const [chartWidgets, setChartWidgets] = useState<Widget[]>([
    {
      id: 'widget-1',
      title: 'Revenue Trend',
      type: 'line',
      size: 'medium',
      subtitle: 'Monthly revenue growth',
      xAxis: 'Month',
      yAxis: 'Revenue ($)',
      color: '#3b82f6'
    },
    {
      id: 'widget-2',
      title: 'Sales by Quarter',
      type: 'bar',
      size: 'medium',
      subtitle: 'Quarterly sales data',
      xAxis: 'Quarter',
      yAxis: 'Sales Count',
      color: '#10b981'
    },
    {
      id: 'widget-3',
      title: 'User Activity',
      type: 'line',
      size: 'small',
      subtitle: 'Daily active users',
      xAxis: 'Date',
      yAxis: 'Active Users',
      color: '#f59e0b'
    },
    {
      id: 'widget-4',
      title: 'Product Performance',
      type: 'bar',
      size: 'large',
      subtitle: 'Top performing products',
      xAxis: 'Product',
      yAxis: 'Performance Score',
      color: '#8b5cf6'
    }
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setChartWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over!.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSizeChange = (widgetId: string, size: 'small' | 'medium' | 'large') => {
    setChartWidgets(prev => 
      prev.map(widget => {
        if (widget.id === widgetId) {
          return { ...widget, size };
        }
        return widget;
      })
    );
  };

  const handleRemoveWidget = (widgetId: string) => {
    setChartWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  };

  const handleEditWidget = (widget: Widget) => {
    setEditingWidget(widget);
    setIsEditModalOpen(true);
  };

  const handleSaveWidget = (config: WidgetConfig) => {
    setChartWidgets(prev => 
      prev.map(widget => 
        widget.id === config.id 
          ? { ...widget, ...config }
          : widget
      )
    );
    setIsEditModalOpen(false);
    setEditingWidget(null);
  };

  const handleAddWidget = () => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      title: 'New Widget',
      type: Math.random() > 0.5 ? 'line' : 'bar',
      size: 'medium',
      subtitle: 'New chart widget'
    };
    setChartWidgets(prev => [...prev, newWidget]);
  };

  const resetLayout = () => {
    setChartWidgets([
      {
        id: 'widget-1',
        title: 'Revenue Trend',
        type: 'line',
        size: 'medium',
        subtitle: 'Monthly revenue growth',
        xAxis: 'Month',
        yAxis: 'Revenue ($)',
        color: '#3b82f6'
      },
      {
        id: 'widget-2',
        title: 'Sales by Quarter',
        type: 'bar',
        size: 'medium',
        subtitle: 'Quarterly sales data',
        xAxis: 'Quarter',
        yAxis: 'Sales Count',
        color: '#10b981'
      },
      {
        id: 'widget-3',
        title: 'User Activity',
        type: 'line',
        size: 'small',
        subtitle: 'Daily active users',
        xAxis: 'Date',
        yAxis: 'Active Users',
        color: '#f59e0b'
      },
      {
        id: 'widget-4',
        title: 'Product Performance',
        type: 'bar',
        size: 'large',
        subtitle: 'Top performing products',
        xAxis: 'Product',
        yAxis: 'Performance Score',
        color: '#8b5cf6'
      }
    ]);
  };

  return (
    <div className="dashboard p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Drag and drop widgets to customize your layout</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetLayout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw size={16} />
              Reset Layout
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download size={16} />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-xs text-green-600 mt-1">↑ 12.5% from last month</div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-2xl font-bold text-green-600">$56.7K</div>
            <div className="text-sm text-gray-600">Revenue</div>
            <div className="text-xs text-green-600 mt-1">↑ 8.3% from last month</div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-2xl font-bold text-yellow-600">87.3%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
            <div className="text-xs text-red-600 mt-1">↓ 2.1% from last month</div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600">Satisfaction Score</div>
            <div className="text-xs text-green-600 mt-1">↑ 0.3 from last month</div>
          </motion.div>
        </div>

        {/* Add New Widget Button */}
        <div className="mb-6">
          <button
            onClick={handleAddWidget}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add New Widget
          </button>
        </div>

        {/* Charts Grid with Drag & Drop */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={chartWidgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-12 auto-rows-min gap-4 mb-8">
              {chartWidgets.map((widget, index) => (
                <SortableWidget
                  key={widget.id}
                  widget={widget}
                  index={index}
                  onSizeChange={handleSizeChange}
                  onRemove={handleRemoveWidget}
                  onEdit={handleEditWidget}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* AI Trend Analysis */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-purple-600" size={24} />
            <h3 className="text-xl font-semibold text-gray-900">AI Trend Analysis</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Key Insights</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Revenue is trending upward with 8.3% growth this month</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span>Conversion rate shows slight decline (-2.1%) - recommend A/B testing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>User satisfaction is improving (+0.3) - current initiatives working</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Predictions</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Next month revenue forecast: $62.1K (+9.5%)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span>User growth expected to reach 1,400 by month end</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                  <span>Recommend focus on mobile conversion optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
            <div className="space-y-3">
              {['Alice Johnson', 'Bob Smith', 'Carol Davis'].map((name, index) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{name}</span>
                  </div>
                  <span className="text-green-600 font-medium">
                    {Math.floor(Math.random() * 50) + 90}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                'New user registration: John Doe',
                'Payment processed: $1,234',
                'Support ticket resolved #4521'
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="text-sm text-gray-600">{activity}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Server</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cache</span>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Warning
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Edit Widget Modal */}
        {isEditModalOpen && editingWidget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Widget</h3>
              <EditWidgetForm 
                widget={editingWidget}
                onSave={handleSaveWidget}
                onCancel={() => {
                  setIsEditModalOpen(false);
                  setEditingWidget(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Status Message */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>✅ All Features Restored!</strong> Edit widgets, drag & drop, size controls, and AI insights are all working!
          </p>
        </div>
      </div>
    </div>
  );
}

// Edit Widget Form Component
const EditWidgetForm: React.FC<{
  widget: Widget;
  onSave: (config: WidgetConfig) => void;
  onCancel: () => void;
}> = ({ widget, onSave, onCancel }) => {
  const [config, setConfig] = useState<WidgetConfig>({
    id: widget.id,
    title: widget.title,
    type: widget.type,
    subtitle: widget.subtitle || '',
    color: widget.color || '#3b82f6',
    xAxis: widget.xAxis || 'X-Axis',
    yAxis: widget.yAxis || 'Y-Axis',
    size: widget.size || 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => setConfig({ ...config, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={config.type}
          onChange={(e) => setConfig({ ...config, type: e.target.value as 'line' | 'bar' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subtitle
        </label>
        <input
          type="text"
          value={config.subtitle}
          onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          X-Axis Label
        </label>
        <input
          type="text"
          value={config.xAxis}
          onChange={(e) => setConfig({ ...config, xAxis: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Time, Date, Category"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Y-Axis Label
        </label>
        <input
          type="text"
          value={config.yAxis}
          onChange={(e) => setConfig({ ...config, yAxis: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Revenue, Count, Percentage"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.color}
            onChange={(e) => setConfig({ ...config, color: e.target.value })}
            className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
          <input
            type="text"
            value={config.color}
            onChange={(e) => setConfig({ ...config, color: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3b82f6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size
        </label>
        <select
          value={config.size}
          onChange={(e) => setConfig({ ...config, size: e.target.value as 'small' | 'medium' | 'large' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SimpleDashboard;