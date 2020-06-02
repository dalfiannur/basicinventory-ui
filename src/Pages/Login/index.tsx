import React, { useCallback, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withRouter } from "react-router-dom";
import { LoginProps, ILoginResponse } from "./interfaces";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    leftSection: {
        display: 'flex'
    },
    paper: {
        height: 450,
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        padding: 15,
        alignSelf: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
            Basic Inventory
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
);

const LoginComponent = (props: LoginProps) => {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = useCallback(() => {
        fetch(process.env.REACT_APP_API + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        }).then((response: any) => response.json()).then((res: ILoginResponse) => {
            localStorage.setItem('userAuthToken', res.data.accessToken);
            props.history.push('/');
        }).catch((error: Error) => {
            console.error(error.message)
        });
    }, [username, password, props]);

    return (
        <Grid container component={'main'} className={classes.root}>
            <CssBaseLine />
            <Grid item xs={false} sm={4} md={8} />
            <Grid item xs={12} sm={8} md={4} className={classes.leftSection}   >
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={doLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export const LoginPage = withRouter(LoginComponent)