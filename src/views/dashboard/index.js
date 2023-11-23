import React, { useEffect, useState } from 'react'
import { Paper, IconButton, InputBase, Button, Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge, Avatar, FormControl, Select, Grid } from '@mui/material'
import { Dashboard, AccountBalanceWallet, AttachMoney, Description, Person, Contacts, Search, Notifications, ArrowDropDown, Menu } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import LineChartOne from '../../components/lineChartOne';
import BarChartOne from '../../components/barChartOne';
import BarChartTwo from '../../components/barChartTwo';
import TableChart from '../../components/tableChart';
import * as d3 from 'd3'

const drawerWidth = 240;

const DashboardPage = () => {

    const location = useLocation();

    const [dataRes, setDataRes] = useState("")

    useEffect(() => {
        fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
            .then(res => res.json())
            .then((response) => {
                const startDate = new Date("2020-07-01");
                const endDate = new Date("2020-07-31");
                const transformedData = Object.entries(response && response["AN"] && response["AN"]["dates"]).filter(([date, values]) => {
                    const currentDate = new Date(date);
                    return currentDate >= startDate && currentDate <= endDate;
                })
                    .map(([date, values]) => (
                        {
                            date: date,
                            confirmed: values.total.confirmed,
                            recovered: values.total.recovered,
                        }
                    ));
                setDataRes(transformedData)
            })
    }, [])

    const [barChartData, setBarChartData] = useState([30, 50, 120, 80, 90, 60])
    const [barChartTwoData, setBarChartTwoData] = useState([
        { month: "August", out: 20, in: 20 },
        { month: "September", out: 50, in: 20 },
        { month: "October", out: 80, in: 20 },
        { month: "November", out: 60, in: 20 },
        { month: "December", out: 50, in: 20 },
        { month: "January", out: 30, in: 50 },
    ])
    const [tableData, setTableData] = useState([
        { name: "Sales", item1: 1194.58, item2: 11418.29 },
        { name: "Advertising", item1: 6879.02, item2: 9271.36 },
        { name: "Inventory", item1: 4692.26, item2: 9768.09 },
        { name: "Entertainment", item1: 0.00, item2: 0.00 },
        { name: "Product", item1: 4652.10, item2: 2529.90 },
    ])

    const randomize = () => {
        d3.selectAll("g > *").remove()
        const random1 = barChartData.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        setBarChartData(random1)
        setBarChartTwoData([
            { month: "August", out: 20 * Math.random(), in: 20 * Math.random() },
            { month: "September", out: 50 * Math.random(), in: 20 * Math.random() },
            { month: "October", out: 80 * Math.random(), in: 20 * Math.random() },
            { month: "November", out: 60 * Math.random(), in: 20 * Math.random() },
            { month: "December", out: 50 * Math.random(), in: 20 * Math.random() },
            { month: "January", out: 30 * Math.random(), in: 50 * Math.random() },
        ])
        setTableData([
            { name: "Sales", item1: parseFloat(1194.58 * Math.random()).toFixed(2), item2: parseFloat(11418.29 * Math.random()).toFixed(2) },
            { name: "Advertising", item1: parseFloat(6879.02 * Math.random()).toFixed(2), item2: parseFloat(9271.36 * Math.random()).toFixed(2) },
            { name: "Inventory", item1: parseFloat(4692.26 * Math.random()).toFixed(2), item2: parseFloat(9768.09 * Math.random()).toFixed(2) },
            { name: "Entertainment", item1: parseFloat(0.00 * Math.random()).toFixed(2), item2: parseFloat(0.00 * Math.random()).toFixed(2) },
            { name: "Product", item1: parseFloat(4652.10 * Math.random()).toFixed(2), item2: parseFloat(2529.90 * Math.random()).toFixed(2) },
        ])
    }

    const menuData = [
        {
            id: 1,
            menuName: "Dashboard",
            icon: <Dashboard style={{ color: location.pathname === "/" ? 'white' : 'black' }} />,
            route: '/'
        },
        {
            id: 2,
            menuName: "Accounts",
            icon: <AccountBalanceWallet style={{ color: location.pathname === "/accounts" ? 'white' : 'black' }} />,
            route: '/accounts'
        },
        {
            id: 3,
            menuName: "Payroll",
            icon: <AttachMoney style={{ color: location.pathname === "/payroll" ? 'white' : 'black' }} />,
            route: '/payroll'
        },
        {
            id: 4,
            menuName: "Reports",
            icon: <Description style={{ color: location.pathname === "/reports" ? 'white' : 'black' }} />,
            route: '/reports'
        },
        {
            id: 5,
            menuName: "Advisor",
            icon: <Person style={{ color: location.pathname === "/advisor" ? 'white' : 'black' }} />,
            route: '/advisor'
        },
        {
            id: 6,
            menuName: "Contacts",
            icon: <Contacts style={{ color: location.pathname === "/contacts" ? 'white' : 'black' }} />,
            route: '/contacts'
        },
    ]

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar sx={{ marginBottom: 3 }}>
                <Box
                    component="img"
                    sx={{
                        height: 50,
                        width: 200,
                    }}
                    alt="logo"
                    src={require("../../assets/img/assiduus-logo.png")}
                />
            </Toolbar>
            <List>
                {menuData && menuData.map((item, index) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton component={Link} to={item.route} selected={item.route === location.pathname}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.menuName} sx={{ color: item.route === location.pathname ? "white" : "black" }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Button size='small' onClick={() => randomize()} sx={{ marginRight: 5, backgroundColor: "#E7EDFC", fontSize: 10, fontWeight: "bold", textTransform: "none" }}>Randomize Data</Button>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <Menu />
                        </IconButton>
                        <Paper
                            component="form"
                            sx={{ p: '2px 1px', display: 'flex', alignItems: 'center', width: 250, backgroundColor: '#F6F7F9', boxShadow: 'none', marginRight: 5 }}
                        >
                            <IconButton type="button" sx={{ px: '5px', py: "1px" }} aria-label="search">
                                <Search />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                            />
                        </Paper>
                        <Badge color='primary' sx={{ marginRight: 5 }} overlap="circular" badgeContent="" variant="dot">
                            <Notifications style={{ color: 'black' }} />
                        </Badge>
                        <IconButton type="button" sx={{ px: '5px', py: "1px" }} aria-label="select">
                            <Avatar alt="Cindy Baker" src={require('../../assets/img/avatar.png')} />
                            <ArrowDropDown />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, backgroundColor: '#F6F7F9' } }}
                >
                    <Toolbar />
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6} md={6} sm={12} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 0
                        }}>
                            <Box sx={{ backgroundColor: "white", borderRadius: 2 }} width={"530px"} height={"440px"}>
                                <LineChartOne dataRes={dataRes} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} sm={12} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 0
                        }}>
                            <Box sx={{ backgroundColor: "white", borderRadius: 2 }} width={"480px"} height={"240px"}>
                                <BarChartOne barChartData={barChartData} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} sm={12} mt={5} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 0
                        }}>
                            <Box sx={{ backgroundColor: "white", borderRadius: 2 }} width={"480px"} height={"240px"}>
                                <BarChartTwo barChartTwoData={barChartTwoData} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} sm={12} mt={5} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 0
                        }}>
                            <Box sx={{ backgroundColor: "white", borderRadius: 2 }} width={"480px"} height={"240px"}>
                                <TableChart tableData={tableData} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}


export default DashboardPage