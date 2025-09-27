import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  hideControls?: boolean;
  visibleRange?: [number, number];
  onRangeChange?: (range: [number, number]) => void;
  disabled?: boolean; // New prop to disable interactions during drag
}

const BarChart: React.FC<BarChartProps> = ({
  data = [],
  width = 320,
  height = 180,
  margin,
  color = '#10b981',
  hideControls = false,
  visibleRange,
  onRangeChange,
  disabled = false
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [internalRange, setInternalRange] = useState<[number, number]>([0, Math.min(data.length, 5)]);

  // Calculate margin with proper override handling
  const chartMargin = margin || { top: 8, right: 12, bottom: Math.max(25, Math.floor(height * 0.02) + 20), left: 30 };

  // Use external range if provided, otherwise use internal range
  const currentRange = visibleRange || internalRange;

  const drawChart = useCallback((startIndex: number, endIndex: number) => {
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - chartMargin.left - chartMargin.right;
    const innerHeight = height - chartMargin.top - chartMargin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${chartMargin.left},${chartMargin.top})`);

    // Get visible data slice
    const visibleData = data.slice(startIndex, endIndex);

    // Scales
    const xScale = d3.scaleBand()
      .domain(visibleData.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0]) // Use full data range for consistent scaling
      .nice()
      .range([innerHeight, 0]);

    // Bars
    g.selectAll('.bar')
      .data(visibleData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label) || 0)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.value))
      .attr('fill', color);

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
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

    // Add zoom only if not disabled (for performance during drag operations)
    if (!disabled) {
      // Very simple zoom and pan - just like a basic scrollable chart
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 4])
        .on('zoom', (event) => {
          const { transform } = event;
          
          // Zoom changes how many items we see
          const itemsVisible = Math.max(3, Math.ceil(5 / transform.k));
          
          // Pan changes which items we see
          const maxStartIndex = Math.max(0, data.length - itemsVisible);
          const panProgress = Math.max(0, Math.min(1, -transform.x / (innerWidth * transform.k)));
          const startIndex = Math.floor(panProgress * maxStartIndex);
          const endIndex = startIndex + itemsVisible;
          
          // Update the view
          if (startIndex !== currentRange[0] || endIndex !== currentRange[1]) {
            if (onRangeChange) {
              onRangeChange([startIndex, endIndex]);
            } else {
              setInternalRange([startIndex, endIndex]);
            }
          }
        });

      svg.call(zoom);
    }

    // Add navigation controls positioned at extreme right (only if not hidden)
    if (!hideControls) {
      const controlsG = svg.append('g')
        .attr('class', 'controls')
        .attr('transform', `translate(${width - 75}, 10)`);

      // Previous button
      const prevButton = controlsG.append('g')
        .attr('class', 'prev-btn')
        .attr('transform', 'translate(0, 0)')
        .style('cursor', 'pointer')
      .on('click', () => {
        const newStart = Math.max(0, startIndex - 1);
        const newEnd = Math.min(newStart + (endIndex - startIndex), data.length);
        if (onRangeChange) {
          onRangeChange([newStart, newEnd]);
        } else {
          setInternalRange([newStart, newEnd]);
        }
      });

    prevButton.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', '#f3f4f6')
      .attr('stroke', '#d1d5db')
      .attr('rx', 3);

    prevButton.append('text')
      .attr('x', 10)
      .attr('y', 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .text('‹');

    // Next button
    const nextButton = controlsG.append('g')
      .attr('class', 'next-btn')
      .attr('transform', 'translate(25, 0)')
      .style('cursor', 'pointer')
      .on('click', () => {
        const rangeSize = endIndex - startIndex;
        const newStart = Math.min(startIndex + 1, data.length - rangeSize);
        const newEnd = Math.min(newStart + rangeSize, data.length);
        if (onRangeChange) {
          onRangeChange([newStart, newEnd]);
        } else {
          setInternalRange([newStart, newEnd]);
        }
      });

    nextButton.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', '#f3f4f6')
      .attr('stroke', '#d1d5db')
      .attr('rx', 3);

    nextButton.append('text')
      .attr('x', 10)
      .attr('y', 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .text('›');

    // Reset button
    const resetButton = controlsG.append('g')
      .attr('class', 'reset-btn')
      .attr('transform', 'translate(50, 0)')
      .style('cursor', 'pointer')
      .on('click', () => {
        if (onRangeChange) {
          onRangeChange([0, Math.min(data.length, 5)]);
        } else {
          setInternalRange([0, Math.min(data.length, 5)]);
        }
        // Only reset zoom transform if not disabled
        if (!disabled) {
          svg.select('.zoom-layer').transition().duration(300);
        }
      });

    resetButton.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', '#f3f4f6')
      .attr('stroke', '#d1d5db')
      .attr('rx', 3);

    resetButton.append('text')
      .attr('x', 10)
      .attr('y', 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#374151')
      .text('⟲');
    }
  }, [data, width, height, margin, color, hideControls]);

  useEffect(() => {
    drawChart(currentRange[0], currentRange[1]);
  }, [drawChart, currentRange]);

  return (
    <div className="relative w-full" style={{ height: height, overflow: 'hidden' }}>
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block cursor-move"
        preserveAspectRatio="xMidYMid meet"
        style={{ touchAction: 'none', userSelect: 'none' }}
      />
    </div>
  );
};

export default BarChart;
