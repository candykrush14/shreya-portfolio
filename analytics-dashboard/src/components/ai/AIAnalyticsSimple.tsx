import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, AlertCircle, Loader, Zap, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import llamaService from '../../services/llamaService';

interface Props {
  data: any[];
  fileName: string;
}

interface LlamaAnalysis {
  analysis: string;
  rootCauses: string[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  confidence: number;
}

const AIAnalyticsSimple: React.FC<Props> = ({ data, fileName }) => {
  const [llamaAnalysis, setLlamaAnalysis] = useState<LlamaAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const generateInsights = () => {
    if (!data || data.length === 0) {
      return [];
    }

    const insights = [];
    
    // Sample insights based on data
    if (data.length > 0) {
      insights.push({
        type: 'info',
        title: 'Data Volume',
        description: `Your dataset contains ${data.length} records`,
        icon: Target
      });

      // Check for numeric columns
      const firstRow = data[0];
      const numericColumns = Object.keys(firstRow).filter(key => 
        !isNaN(Number(firstRow[key])) && firstRow[key] !== ''
      );

      if (numericColumns.length > 0) {
        insights.push({
          type: 'success',
          title: 'Numeric Analysis Available',
          description: `Found ${numericColumns.length} numeric columns: ${numericColumns.join(', ')}`,
          icon: TrendingUp
        });
      }

      // Data completeness check
      const totalFields = Object.keys(firstRow).length * data.length;
      const filledFields = data.reduce((acc, row) => {
        return acc + Object.values(row).filter(value => value !== '' && value != null).length;
      }, 0);
      const completenessPercent = (filledFields / totalFields) * 100;
      const completeness = completenessPercent.toFixed(1);

      insights.push({
        type: completenessPercent > 80 ? 'success' : 'warning',
        title: 'Data Completeness',
        description: `Your data is ${completeness}% complete`,
        icon: completenessPercent > 80 ? Target : AlertCircle
      });
    }

    return insights;
  };

  const insights = generateInsights();

  // Run LLM analysis when data changes
  useEffect(() => {
    if (data && data.length > 0 && fileName) {
      runLlamaAnalysis();
    }
  }, [data, fileName]);

  const runLlamaAnalysis = async () => {
    if (!data || data.length === 0) return;
    
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      const analysis = await llamaService.analyzeData(data, fileName);
      setLlamaAnalysis(analysis);
    } catch (error) {
      console.error('LLM Analysis failed:', error);
      setAnalysisError('Failed to generate LLM analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return CheckCircle;
      case 'medium': return AlertTriangle;
      case 'high': return XCircle;
      default: return AlertCircle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">AI-Powered Analytics</h2>
        <p className="text-gray-600">Intelligent insights from your data</p>
      </div>

      {data.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-4">Upload data in the Data Upload section to get AI insights</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Upload Data
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Analyzing: {fileName}</h3>
            <p className="text-gray-600">{data.length} records processed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              const colorClass = {
                success: 'bg-green-50 border-green-200 text-green-800',
                warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                info: 'bg-blue-50 border-blue-200 text-blue-800'
              }[insight.type];

              return (
                <div key={index} className={`border rounded-lg p-6 ${colorClass}`}>
                  <div className="flex items-center mb-3">
                    <Icon className="w-6 h-6 mr-3" />
                    <h4 className="font-semibold">{insight.title}</h4>
                  </div>
                  <p>{insight.description}</p>
                </div>
              );
            })}
          </div>

          {/* LLM Analysis Section */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-purple-600 mr-3" />
              <h4 className="text-lg font-semibold text-purple-800">Llama4 AI Analysis & Root Cause Analysis</h4>
              {!llamaAnalysis && !isAnalyzing && !analysisError && (
                <button
                  onClick={runLlamaAnalysis}
                  className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  Generate Analysis
                </button>
              )}
            </div>

            {isAnalyzing && (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-8 h-8 animate-spin text-purple-600 mr-3" />
                <p className="text-purple-700 font-medium">Analyzing your data with Llama4...</p>
              </div>
            )}

            {analysisError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-700">{analysisError}</p>
                  <button
                    onClick={runLlamaAnalysis}
                    className="ml-auto bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {llamaAnalysis && (
              <div className="space-y-6">
                {/* Severity Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getSeverityColor(llamaAnalysis.severity)}`}>
                  {(() => {
                    const SeverityIcon = getSeverityIcon(llamaAnalysis.severity);
                    return <SeverityIcon className="w-4 h-4 mr-2" />;
                  })()}
                  <span className="font-semibold capitalize">{llamaAnalysis.severity} Risk</span>
                  <span className="ml-2 text-sm">({llamaAnalysis.confidence}% confidence)</span>
                </div>

                {/* Analysis */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">🔍 Comprehensive Analysis</h5>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{llamaAnalysis.analysis}</p>
                  </div>
                </div>

                {/* Root Causes */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">⚡ Root Cause Analysis</h5>
                  <div className="space-y-2">
                    {llamaAnalysis.rootCauses.map((cause, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-orange-200 border-l-4 border-l-orange-500">
                        <p className="text-gray-700">{cause}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">💡 AI Recommendations</h5>
                  <div className="space-y-2">
                    {llamaAnalysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-green-200 border-l-4 border-l-green-500">
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={runLlamaAnalysis}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Brain className="w-4 h-4" />
                    Regenerate Analysis
                  </button>
                  <button
                    onClick={() => {
                      const analysisText = `
Analysis for ${fileName}:

${llamaAnalysis.analysis}

Root Causes:
${llamaAnalysis.rootCauses.map(cause => `• ${cause}`).join('\n')}

Recommendations:
${llamaAnalysis.recommendations.map(rec => `• ${rec}`).join('\n')}

Severity: ${llamaAnalysis.severity} (${llamaAnalysis.confidence}% confidence)
                      `.trim();
                      
                      navigator.clipboard.writeText(analysisText);
                      alert('Analysis copied to clipboard!');
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Copy Report
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-white rounded-lg border p-6">
            <h4 className="text-lg font-semibold mb-4">Recommended Actions</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Create Visualizations</p>
                  <p className="text-sm text-gray-600">Generate charts and graphs from your numeric data</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Statistical Analysis</p>
                  <p className="text-sm text-gray-600">Run correlation and regression analysis on your data</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Data Quality Check</p>
                  <p className="text-sm text-gray-600">Identify outliers and data inconsistencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalyticsSimple;
