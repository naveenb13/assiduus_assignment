import React, { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
import { Toolbar, Typography, Divider, Button, Modal, Box, Input } from '@mui/material';
import { Close } from '@mui/icons-material';

const BarChartOne = ({ barChartData }) => {
    const barChartRef = useRef();

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)

    const xData = ["Older", "Jan 01-08", "Jan 09-16", "Jan 17-24", "Jan 25-31", "Future"]

    useEffect(() => {
        //setting up the svg
        const width = 450
        const height = 150
        const svg = d3.select(barChartRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', "#FFFFFF")
            .style('overflow', "visible")

        svg.selectAll('bar').remove();
        svg.selectAll("rect").remove();
        //setting the scalling

        const xAxisScale = d3.scaleBand()
            .domain(barChartData && barChartData.map((item, i) => i))
            .range([0, width])
            .paddingInner(0.85)
            .align(0.5)

        const yAxisScale = d3.scaleLinear()
            .domain([0, height])
            .range([height, 0])

        //setting the axes

        const xAxisLine = d3.axisBottom(xAxisScale)
            .ticks(barChartData && barChartData.length)
            .tickFormat((d, i) => {
                return xData[i]
            })
            .tickSize(0)
            .tickPadding(10)

        svg.append("g")
            .call(xAxisLine)
            .attr('transform', `translate(0,${height})`)
            .style("color", "#b4b4ba")


        //setting the data for the svg

        svg.selectAll(".domain,.tick>line")
            .style("opacity", 0)
            .remove();

        svg.selectAll('.bar')
            .data(barChartData)
            .join('rect')
            .attr('x', (d, i) => xAxisScale(i))
            .attr('y', yAxisScale)
            .attr('width', xAxisScale.bandwidth())
            .attr('height', d => height - yAxisScale(d))
            .attr('fill', "#47B747")
            .attr('rx', 5)
    }, [barChartData])

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
                    Invoices owed by you
                </Typography>
                <Button size="small" onClick={handleOpen} sx={{ backgroundColor: "#E7EDFC", fontSize: 10, fontWeight: "bold", textTransform: "none" }}>New Sales Invoice</Button>
            </Toolbar>
            <Divider sx={{ borderWidth: 1 }} />
            <svg ref={barChartRef}></svg>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Close style={{ color: 'black' }} onClick={handleOpen} />
                    </Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
                        Upload file
                    </Typography>
                    <Input type='file' />
                </Box>
            </Modal>
        </>
    )
}

export default BarChartOne