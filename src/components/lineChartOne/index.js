import React, { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
import { Toolbar, Typography, Divider, FormControl, MenuItem, Select, InputLabel, Box } from '@mui/material';
import { Square } from '@mui/icons-material';

const LineChartOne = ({ dataRes }) => {
    const lineChartRef = useRef();

    console.log("dataRes", dataRes)

    useEffect(() => {
        //setting up the svg

        const width = 450
        const height = 300
        const svg = d3.select(lineChartRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', "#FFFFFF")
            .style('overflow', "visible")

        svg.selectAll('line').remove();
        svg.selectAll("path").remove();

        //setting the scalling

        const xAxisScale = d3.scaleLinear()
            .domain([0, dataRes && dataRes.length - 1])
            .range([0, width])

        const yAxisScale = d3.scaleLinear()
            .domain([0, d3.max(dataRes, (d) => d.confirmed)])
            .range([height, 0])

        const combine = d3.line()
            .x((d, i) => xAxisScale(i))
            .y((d, i) => yAxisScale(d.recovered))
            .curve(d3.curveCardinal)

        const combine1 = d3.line()
            .x((d, i) => xAxisScale(i))
            .y((d, i) => yAxisScale(d.confirmed))
            .curve(d3.curveCardinal)

        //setting the axes

        const xAxisLine = d3.axisBottom(xAxisScale)
            .ticks(dataRes.length)
            .tickFormat((d, i) => {
                return dataRes[i].date
            })
            .tickSize(0)

        const yAxisLine = d3.axisLeft(yAxisScale)
            .ticks(20)

        svg.append("g")
            .call(xAxisLine)
            .attr('transform', `translate(0,${height})`)
            .style("color", "#b4b4ba")
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-65)")

        svg.append("g")
            .call(yAxisLine)
            .style("color", "#b4b4ba")


        //setting the data for the svg

        svg.selectAll(".domain,.tick>line")
            .style("opacity", 0)
            .remove();

        svg.selectAll('.line')
            .data([dataRes])
            .join('path')
            .attr('d', d => combine(d))
            .attr('fill', "none")
            .attr('stroke', "#47B747")
            .attr('stroke-width', 2)

        svg.selectAll('.line')
            .data([dataRes])
            .join('path')
            .attr('d', d => combine1(d))
            .attr('fill', "none")
            .attr('stroke', "#FF0000")
            .attr('stroke-width', 2)
    }, [dataRes])

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
                    Covid Cases
                </Typography>
                <div className='d-flex flex-row'>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Square sx={{
                            color: "#FF0000"
                        }} />
                        <Typography variant='body2' sx={{ fontWeight: 'bold', marginRight: 3 }}>
                            Confirmed
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
                            Recovered
                        </Typography>
                    </Box>
                </div>
            </Toolbar>
            <Divider sx={{ borderWidth: 1 }} />
            <svg ref={lineChartRef}></svg>
        </>
    )
}

export default LineChartOne