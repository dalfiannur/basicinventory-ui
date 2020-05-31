import React, {useCallback, useState, Fragment, useEffect} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
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
import {DashboardProps, IInventoriesResponse, IInventory} from "./interfaces";


const Dashboard = (props: DashboardProps) => {
    const [inventories, setInventories] = useState<IInventory[]>([]);
    const [totalInventories, setTotalInventories] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [dialogAddInventory, setDialogAddInventory] = useState<boolean>(false)

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
    }, [inventories])
    const doLogout = useCallback(() => {
        localStorage.removeItem('userAuthToken');
        props.history.push('/');
    }, [props]);

    useEffect(() => {
        fetchInventories();
    }, [])

    return (
        <Fragment>
            <Grid container component={'main'}>
                <Grid item md={12}>
                    <Card>
                        <CardHeader title={'Inventory'}/>
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
            </Grid>

            <AddInventory open={dialogAddInventory} onClose={() => setDialogAddInventory(false)} products={[]} />
        </Fragment>
    )
}

export const DashboardPage = withRouter(Dashboard);