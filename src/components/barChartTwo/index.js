import React, { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
import { Toolbar, Typography, Divider, Checkbox, Box } from '@mui/material';
import { CheckBoxOutlineBlank, Square } from '@mui/icons-material'

const BarChartTwo = ({ barChartTwoData }) => {
    const barChartTwoRef = useRef();

    const colors = ["#47B747", "#1EC28A"]

    const xData = ["August", "September", "October", "November", "December", "January"]

    useEffect(() => {

        const width = 450
        const height = 150
        const svg = d3.select(barChartTwoRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', "#FFFFFF")
            .style('overflow', "visible")

        const keys = Object.keys(barChartTwoData[0]).filter((key) => key !== 'month');

        const stack = d3.stack().keys(keys);

        const stackResult = stack(barChartTwoData);

        const xAxisScale = d3
            .scaleBand()
            .domain(barChartTwoData.map((d, i) => d.month))
            .range([0, width])
            .paddingInner(0.85)
            .align(0.5)

        const yAxisScale = d3.scaleLinear()
            .domain([0, d3.max(stackResult, (d) => d3.max(d, (d) => d[1]))])
            .range([height, 0]);

        const color = d3.scaleOrdinal().domain(keys).range(colors);

        const xAxisLine = d3.axisBottom(xAxisScale)
            .ticks(barChartTwoData && barChartTwoData.length)
            .tickFormat((d, i) => {
                return xData[i]
            })
            .tickSize(0)
            .tickPadding(10)

        svg.append("g")
            .call(xAxisLine)
            .attr('transform', `translate(0,${height})`)
            .style("color", "#b4b4ba")

        svg.selectAll(".domain,.tick>line")
            .style("opacity", 0)
            .remove();

        svg
            .append('g')
            .selectAll('g')
            .data(stackResult)
            .enter()
            .append('g')
            .attr('fill', (d) => color(d.key))
            .selectAll('rect')
            .data((d) => d)
            .enter()
            .append('rect')
            .attr('x', (d) => xAxisScale(d.data.month))
            .attr('y', (d) => yAxisScale(d[1]))
            .attr('height', (d) => yAxisScale(d[0]) - yAxisScale(d[1]))
            .attr('width', xAxisScale.bandwidth())
    }, [barChartTwoData])

    return (
        <>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                flexDirection: 'row',
                borderRadius: 2
            }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                    Total cash flow
                </Typography>
                <div className='d-flex flex-row'>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Square sx={{
                            color: "#1EC28A"
                        }} />
                        <Typography variant='body2' sx={{ fontWeight: 'bold', marginRight: 3 }}>
                            In
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Square color='primary' />
                        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                            Out
                        </Typography>
                    </Box>
                </div>
            </Toolbar>
            <Divider sx={{ borderWidth: 1 }} />
            <svg ref={barChartTwoRef}></svg>
        </>
    )
}

export default BarChartTwo