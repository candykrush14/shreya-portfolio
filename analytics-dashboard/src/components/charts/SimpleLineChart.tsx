import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

interface LineChartProps {
  data: Array<{ date: string; value: number; category?: string }>;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  hideControls?: boolean;
  zoomExtent?: [Date, Date] | null;
  onZoomChange?: (extent: [Date, Date] | null) => void;
  disabled?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data = [],
  width = 320,
  height = 180,
  margin = { top: 8, right: 12, bottom: Math.max(35, Math.floor(height * 0.02) + 30), left: 35 }, // Ensure minimum bottom margin with 2% padding
  color = '#3b82f6',
  hideControls = false,
  zoomExtent = null,
  onZoomChange,
  disabled = false
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Parse dates and prepare data (do this outside useEffect to avoid re-parsing)
  const processedData = React.useMemo(() => {
    const parseTime = d3.timeParse('%Y-%m-%d');
    return data.map(d => ({
      date: parseTime(d.date) || new Date(),
      value: d.value
    }));
  }, [data]);

  const drawChart = useCallback((xDomain?: [Date, Date]) => {
    if (!processedData.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Use provided domain or default to full extent
    const fullXDomain = d3.extent(processedData, d => d.date) as [Date, Date];
    const currentXDomain = xDomain || fullXDomain;

    // Filter data based on current zoom extent
    const filteredData = processedData.filter(d => 
      d.date >= currentXDomain[0] && d.date <= currentXDomain[1]
    );

    // Scales
    const xScale = d3.scaleTime()
      .domain(currentXDomain)
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => d.value) as [number, number])
      .nice()
      .range([innerHeight, 0]);

    // Line generator
    const line = d3.line<typeof processedData[0]>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw line
    g.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add dots
    g.selectAll('.dot')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.value))
      .attr('r', 4)
      .attr('fill', color);

    // Determine tick count based on zoom level
    const timeDiff = currentXDomain[1].getTime() - currentXDomain[0].getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    const tickCount = Math.min(Math.max(Math.floor(daysDiff / 2), 3), 10);

    // X Axis with adaptive ticking
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .ticks(tickCount)
        .tickFormat(d3.timeFormat('%m/%d') as any))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#374151')
      .style('font-weight', '500')
      .attr('dy', '1em');

    // Add axis lines styling
    g.select('.domain')
      .style('stroke', '#9CA3AF')
      .style('stroke-width', '1px');

    g.selectAll('.tick line')
      .style('stroke', '#E5E7EB');

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#374151')
      .style('font-weight', '500');

    // Add zoom functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 10])
      .on('zoom', (event) => {
        const transform = event.transform;
        
        // Calculate new x domain based on zoom
        const newXScale = transform.rescaleX(d3.scaleTime()
          .domain(fullXDomain)
          .range([0, innerWidth]));
        
                const newDomain = newXScale.domain() as [Date, Date];
        drawChart(newDomain);
        onZoomChange?.(newDomain);
      });

    // Apply zoom to SVG only if not disabled
    if (!disabled) {
      svg.call(zoom);
    }

    // Add reset zoom button only if controls are not hidden
    if (!hideControls) {
      const resetButton = svg.append('g')
        .attr('class', 'reset-zoom')
        .attr('transform', `translate(${width - 34}, 10)`)
        .style('cursor', 'pointer')
        .on('click', () => {
          onZoomChange?.(null);
          svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
        });

      resetButton.append('rect')
        .attr('width', 24)
        .attr('height', 24)
        .attr('fill', '#f3f4f6')
        .attr('stroke', '#d1d5db')
        .attr('rx', 3);

      resetButton.append('text')
        .attr('x', 12)
        .attr('y', 16)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', '#374151')
        .text('⟲');
    }

  }, [processedData, width, height, margin, color, hideControls, onZoomChange, disabled]);

  useEffect(() => {
    drawChart(zoomExtent || undefined);
  }, [drawChart, zoomExtent]);

  return (
    <div className="relative w-full" style={{ height: height }}>
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default LineChart;
