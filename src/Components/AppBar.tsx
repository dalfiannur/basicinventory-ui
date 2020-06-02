import React from 'react';
import clsx from 'clsx';
import Bar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core';
import transitions from '@material-ui/core/styles/transitions';

export interface AppBarProps {
    openDrawer: boolean;
    onDrawerClosed: (openDrawer: boolean) => void;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth})`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    toolbar: {
        paddingRight: 24,
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
}));

export default (props: AppBarProps) => {
    const classes = useStyles();
    const { openDrawer, onDrawerClosed } = props;

    return (
        <Bar position={'absolute'} className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge={'start'}
                    color={'inherit'}
                    aria-label={'Open Drawer'}
                    onClick={() => onDrawerClosed(!openDrawer)}
                    className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component={'h1'} variant={'h6'} color={'inherit'} noWrap className={classes.title}>
                    Dashboard
                </Typography>
                <IconButton color={'inherit'}>
                    <Badge badgeContent={4} color={'secondary'}>
                        <NotificationIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </Bar>
    )
}