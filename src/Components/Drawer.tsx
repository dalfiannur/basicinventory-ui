import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import transitions from '@material-ui/core/styles/transitions';


export interface DrawerProps {
    openDrawer: boolean;
    onDrawerClosed: (open: boolean) => void;
}

const drawerWidth: number = 240;
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

const mainListItems: any[] = [];
const secondaryListItems: any[] = [];

export default (props: DrawerProps) => {
    const classes = useStyles();
    const { openDrawer, onDrawerClosed } = props;

    return (
        <Drawer
            variant={'permanent'}
            classes={{
                paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose)
            }}
            open={openDrawer}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => onDrawerClosed(!openDrawer)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {mainListItems}
            </List>
            <Divider />
            <List>
                {secondaryListItems}
            </List>
        </Drawer>
    )
}