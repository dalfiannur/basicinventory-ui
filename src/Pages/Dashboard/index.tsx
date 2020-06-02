import React, { useCallback, useState, Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import AddInventory from "./Components/AddInventory";
import Button from "@material-ui/core/Button";
import { DashboardProps, IInventoriesResponse, IInventory } from "./interfaces";
import AppBar from '../../Components/AppBar';
import Drawer from '../../Components/Drawer';
import Content from '../../Components/Content';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const Dashboard = (props: DashboardProps) => {
    const classes = useStyles();

    const [inventories, setInventories] = useState<IInventory[]>([]);
    const [totalInventories, setTotalInventories] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [dialogAddInventory, setDialogAddInventory] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const fetchInventories = useCallback(() => {
        fetch(process.env.REACT_APP_API + '/inventories', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userAuthToken')
            }
        }).then((response: any) => response.json()).then((res: IInventoriesResponse) => {
            setInventories(res.data.inventories);
            setTotalInventories(res.data.total);
            setTotalPages(res.data.pages);
        }).catch((error: Error) => {
            console.error(error.message);
        })
    }, []);

    const doLogout = useCallback(() => {
        localStorage.removeItem('userAuthToken');
        props.history.push('/');
    }, [props]);

    useEffect(() => {
        fetchInventories();
    }, [fetchInventories]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar openDrawer={openDrawer} onDrawerClosed={setOpenDrawer} />
            <Drawer openDrawer={openDrawer} onDrawerClosed={setOpenDrawer} />
            <Content>
                <Grid item md={12}>
                    <Card>
                        <button onClick={doLogout}>Logout</button>
                        <CardHeader title={'Inventory'} />
                        <CardContent>
                            <Button onClick={() => setDialogAddInventory(true)}>Add Item</Button>
                            <Table>
                                <TableHead>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created At</TableCell>
                                </TableHead>
                                <TableBody>
                                    {
                                        inventories.map((inventory, index) => (
                                            <Fragment key={index}>
                                                <TableCell>{inventory.id}</TableCell>
                                                <TableCell>{inventory.id}</TableCell>
                                                <TableCell>{inventory.quantity}</TableCell>
                                                <TableCell>{inventory.isOut ? 'Out' : 'In'}</TableCell>
                                                <TableCell>{inventory.createdAt}</TableCell>
                                            </Fragment>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Content>
            <AddInventory open={dialogAddInventory} onClose={() => setDialogAddInventory(false)} products={[]} />
        </div >
    )
}

export const DashboardPage = withRouter(Dashboard);