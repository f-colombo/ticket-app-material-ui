import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    rootLink: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function NavBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} onClick={handleClick} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link href="/tickets" color="inherit">
                                Tickets
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link href="/tickets/add" color="inherit">
                                Agregar ticket
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link href="/users/add" color="inherit">
                                Agregar usuario
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
                    </Menu>



                    <Typography variant="h6" className={classes.title}>
                        Ticket App
                    </Typography>
                    <Typography className={classes.rootLink}>
                        <Link href="/users/login" color="inherit">
                            Iniciar Sesión
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
