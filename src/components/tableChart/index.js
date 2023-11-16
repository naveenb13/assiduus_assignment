import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Typography, Divider } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";

const TableChart = ({ tableData }) => {
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
                    Account Watchlist
                </Typography>
            </Toolbar>
            <Divider sx={{ borderWidth: 1 }} />
            <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
                <Table sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                    }
                }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#b4b4ba' }}>Account</TableCell>
                            <TableCell sx={{ color: '#b4b4ba' }} align="left">This Month</TableCell>
                            <TableCell sx={{ color: '#b4b4ba' }} align="left">Ytd&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData && tableData.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ fontSize: 12, fontWeight: 700 }} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12, fontWeight: 700 }} align="left">{row.item1}</TableCell>
                                <TableCell sx={{ fontSize: 12, fontWeight: 700 }} align="left">{row.item2}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableChart