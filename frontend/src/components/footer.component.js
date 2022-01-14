import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center" position="static">
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        FColombo
                    </Link>
                    {' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </div>
    );
}

export default Footer;
