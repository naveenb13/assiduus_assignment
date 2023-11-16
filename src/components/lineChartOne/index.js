import React, { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
import { Toolbar, Typography, Divider, FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const LineChartOne = ({ lineChartData, setLineChartData }) => {
    const lineChartRef = useRef();

    const monthData = {
        "January": [50, 60, 100, 110, 50, 80, 80, 40, 55, 60],
        "February": [100, 40, 50, 60, 60, 80, 50, 80, 110, 55],
        "March": [80, 60, 100, 110, 55, 80, 50, 60, 50, 40],
        "April": [50, 80, 100, 40, 60, 60, 80, 50, 55, 110],
        "May": [40, 55, 60, 80, 110, 50, 100, 60, 50, 80],
        "June": [60, 40, 50, 80, 80, 100, 110, 60, 50, 55],
        "July": [80, 80, 50, 50, 40, 110, 60, 55, 60, 100],
        "August": [60, 55, 80, 60, 50, 100, 110, 80, 40, 50],
        "September": [55, 100, 60, 50, 40, 50, 80, 60, 110, 80],
        "October": [80, 60, 100, 40, 110, 50, 60, 80, 55, 50],
        "November": [50, 40, 50, 60, 80, 60, 110, 80, 55, 100],
        "December": [55, 40, 60, 110, 100, 60, 50, 50, 80, 80],
    }

    const [month, setMonth] = useState('January');

    const handleChange = (event) => {
        setMonth(event.target.value);
        setLineChartData(monthData[event.target.value])
    };

    useEffect(() => {
        //setting up the svg

        const width = 450
        const height = 150
        const svg = d3.select(lineChartRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', "#FFFFFF")
            .style('overflow', "visible")

        svg.selectAll('line').remove();
        svg.selectAll("path").remove();

        //setting the scalling

        const xAxisScale = d3.scaleLinear()
            .domain([0, lineChartData && lineChartData.length - 1])
            .range([0, width])

        const yAxisScale = d3.scaleLinear()
            .domain([0, height])
            .range([height, 0])

        const combine = d3.line()
            .x((d, i) => xAxisScale(i))
            .y(yAxisScale)
            .curve(d3.curveCardinal)

        //setting the axes

        const xAxisLine = d3.axisBottom(xAxisScale)
            .ticks(lineChartData.length)
            .tickFormat(i => i + 9)
            .tickSize(0)

        svg.append("g")
            .call(xAxisLine)
            .attr('transform', `translate(0,${height})`)
            .style("color", "#b4b4ba")


        //setting the data for the svg

        svg.selectAll(".domain,.tick>line")
            .style("opacity", 0)
            .remove();

        svg.selectAll('.line')
            .data(d3.shuffle([lineChartData]))
            .join('path')
            .attr('d', d => combine(d))
            .attr('fill', "none")
            .attr('stroke', "#47B747")
            .attr('stroke-width', 2)
    }, [lineChartData])

    return (
        <>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 2
            }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                    Checking Account
                </Typography>
                <div>
                    <select placeholder='Manage' defaultValue={"Manage"} className='mx-2 px-2 py-1 bg-white border border-grey rounded small' >
                        <option value={"Manage"}>Manage</option>
                    </select>
                    <select defaultValue={month} onChange={handleChange} className='px-2 py-1 bg-white border border-grey rounded small'>
                        <option value={"January"}>January</option>
                        <option value={"February"}>February</option>
                        <option value={"March"}>March</option>
                        <option value={"April"}>April</option>
                        <option value={"May"}>May</option>
                        <option value={"June"}>June</option>
                        <option value={"July"}>July</option>
                        <option value={"August"}>August</option>
                        <option value={"September"}>September</option>
                        <option value={"October"}>October</option>
                        <option value={"November"}>November</option>
                        <option value={"December"}>December</option>
                    </select>
                </div>
            </Toolbar>
            <Divider sx={{ borderWidth: 1 }} />
            <svg ref={lineChartRef}></svg>
        </>
    )
}

export default LineChartOne