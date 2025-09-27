interface LlamaResponse {
  analysis: string;
  rootCauses: string[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  confidence: number;
}

interface DataSummary {
  totalRecords: number;
  columns: string[];
  numericColumns: string[];
  missingValues: Record<string, number>;
  dataTypes: Record<string, string>;
  sampleData: any[];
}

class LlamaService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // In a real application, these would come from environment variables
    this.baseUrl = 'https://api.llama.ai/v1'; // Example endpoint
    // Browser-safe environment variable access
    this.apiKey = 'demo-key'; // For demo purposes, use a static key
  }

  /**
   * Generate a comprehensive data summary for the LLM
   */
  private generateDataSummary(data: any[]): DataSummary {
    if (!data || data.length === 0) {
      return {
        totalRecords: 0,
        columns: [],
        numericColumns: [],
        missingValues: {},
        dataTypes: {},
        sampleData: []
      };
    }

    const firstRow = data[0];
    const columns = Object.keys(firstRow);
    
    // Identify numeric columns
    const numericColumns = columns.filter(col => {
      return data.some(row => !isNaN(Number(row[col])) && row[col] !== '' && row[col] !== null);
    });

    // Count missing values
    const missingValues: Record<string, number> = {};
    columns.forEach(col => {
      missingValues[col] = data.filter(row => 
        row[col] === '' || row[col] === null || row[col] === undefined
      ).length;
    });

    // Identify data types
    const dataTypes: Record<string, string> = {};
    columns.forEach(col => {
      const sampleValue = data.find(row => row[col] !== '' && row[col] !== null)?.[col];
      if (sampleValue !== undefined) {
        if (!isNaN(Number(sampleValue))) {
          dataTypes[col] = 'numeric';
        } else if (typeof sampleValue === 'string') {
          // Check if it looks like a date
          if (new Date(sampleValue).toString() !== 'Invalid Date') {
            dataTypes[col] = 'date';
          } else {
            dataTypes[col] = 'text';
          }
        } else {
          dataTypes[col] = typeof sampleValue;
        }
      }
    });

    return {
      totalRecords: data.length,
      columns,
      numericColumns,
      missingValues,
      dataTypes,
      sampleData: data.slice(0, 5) // First 5 rows for context
    };
  }

  /**
   * Create a prompt for Llama4 to analyze data and provide RCA
   */
  private createAnalysisPrompt(dataSummary: DataSummary, fileName: string): string {
    return `
You are an expert data analyst. Analyze the following dataset and provide a comprehensive Root Cause Analysis (RCA).

Dataset: "${fileName}"
Total Records: ${dataSummary.totalRecords}
Columns: ${dataSummary.columns.join(', ')}
Numeric Columns: ${dataSummary.numericColumns.join(', ')}

Data Quality Issues:
${Object.entries(dataSummary.missingValues)
  .filter(([_, count]) => count > 0)
  .map(([col, count]) => `- ${col}: ${count} missing values (${((count / dataSummary.totalRecords) * 100).toFixed(1)}%)`)
  .join('\n')}

Sample Data:
${JSON.stringify(dataSummary.sampleData, null, 2)}

Please provide:
1. ANALYSIS: Comprehensive analysis of the data patterns, trends, and anomalies
2. ROOT_CAUSES: Identify potential root causes for any data quality issues, patterns, or anomalies
3. RECOMMENDATIONS: Specific actionable recommendations for data improvement
4. SEVERITY: Rate the overall data quality issues as low, medium, or high
5. CONFIDENCE: Your confidence level in this analysis (0-100%)

Format your response as a JSON object with the keys: analysis, rootCauses (array), recommendations (array), severity, confidence.
`;
  }

  /**
   * Mock Llama4 API call for development/demo purposes
   */
  private async mockLlamaCall(dataSummary: DataSummary, fileName: string): Promise<LlamaResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const missingValuesCount = Object.values(dataSummary.missingValues).reduce((a, b) => a + b, 0);
    const missingPercentage = (missingValuesCount / (dataSummary.totalRecords * dataSummary.columns.length)) * 100;

    let severity: 'low' | 'medium' | 'high' = 'low';
    if (missingPercentage > 20) severity = 'high';
    else if (missingPercentage > 10) severity = 'medium';

    const rootCauses = [];
    const recommendations = [];

    if (missingPercentage > 0) {
      rootCauses.push(`Data collection gaps: ${missingPercentage.toFixed(1)}% of data points are missing`);
      recommendations.push('Implement data validation at source to reduce missing values');
    }

    if (dataSummary.numericColumns.length === 0) {
      rootCauses.push('Limited quantitative analysis capability due to lack of numeric columns');
      recommendations.push('Consider adding numeric KPIs and metrics for better analysis');
    }

    if (dataSummary.totalRecords < 100) {
      rootCauses.push('Small dataset size may limit statistical significance of insights');
      recommendations.push('Collect more data points to improve analysis reliability');
    }

    // Add some intelligent analysis based on column names
    const hasTimeColumn = dataSummary.columns.some(col => 
      col.toLowerCase().includes('date') || col.toLowerCase().includes('time')
    );
    
    if (!hasTimeColumn) {
      rootCauses.push('Lack of temporal data limits trend analysis capabilities');
      recommendations.push('Include timestamp or date fields for temporal analysis');
    }

    return {
      analysis: `Analysis of ${fileName} reveals a dataset with ${dataSummary.totalRecords} records across ${dataSummary.columns.length} columns. 
      ${dataSummary.numericColumns.length > 0 ? 
        `The dataset contains ${dataSummary.numericColumns.length} numeric columns (${dataSummary.numericColumns.join(', ')}) suitable for quantitative analysis.` : 
        'The dataset appears to be primarily categorical with limited numeric data.'
      } 
      ${missingPercentage > 0 ? 
        `Data completeness is ${(100 - missingPercentage).toFixed(1)}% with some missing values across different fields.` :
        'Data appears to be complete with no missing values detected.'
      }
      ${hasTimeColumn ? 'Temporal data is available for trend analysis.' : 'No temporal columns detected, limiting time-based insights.'}
      The current data structure ${severity === 'high' ? 'has significant quality issues that should be addressed' : 
        severity === 'medium' ? 'has moderate quality concerns' : 'shows good data quality overall'}.`,
      rootCauses: rootCauses.length > 0 ? rootCauses : ['No significant data quality issues detected'],
      recommendations: recommendations.length > 0 ? recommendations : [
        'Data quality appears good - consider advanced analytics and visualization',
        'Explore correlations between variables for deeper insights',
        'Consider segmentation analysis for different data subsets'
      ],
      severity,
      confidence: Math.max(70, 95 - (missingPercentage * 2)) // Lower confidence with more missing data
    };
  }

  /**
   * Actual Llama4 API call (for production use)
   */
  private async callLlamaAPI(prompt: string): Promise<LlamaResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'llama4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert data analyst providing Root Cause Analysis.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const result = await response.json();
      const analysisText = result.choices[0].message.content;
      
      // Parse the JSON response from Llama4
      return JSON.parse(analysisText);
    } catch (error) {
      console.error('Llama4 API error:', error);
      // Fallback to mock for development
      throw error;
    }
  }

  /**
   * Main method to analyze data using Llama4
   */
  async analyzeData(data: any[], fileName: string): Promise<LlamaResponse> {
    const dataSummary = this.generateDataSummary(data);
    const prompt = this.createAnalysisPrompt(dataSummary, fileName);

    try {
      // For now, use mock - in production, uncomment the line below
      // return await this.callLlamaAPI(prompt);
      return await this.mockLlamaCall(dataSummary, fileName);
    } catch (error) {
      // Fallback to mock analysis if API fails
      console.warn('Falling back to mock analysis:', error);
      return await this.mockLlamaCall(dataSummary, fileName);
    }
  }
}

export default new LlamaService();