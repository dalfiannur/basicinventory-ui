import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

interface ContentProps {
    children: ReactNode;
}

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
}));

export default (props: ContentProps) => {
    const classes = useStyles();

    return (
        <main className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Grid container component={'main'} className={classes.content}>
                {props.children}
            </Grid>
        </main>
    )
}