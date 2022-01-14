import React, { useState, useEffect } from 'react';
import { format } from "date-fns";

import TicketDataService from '../services/ticket.service';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    table: {
        minWidth: 650,
    }
}));

const columns = [
    { id: 'id', label: '#', minWidth: 10 },
    { id: 'descripcion', label: 'Descripción', minWidth: 200 },
    { id: 'pedido', label: 'Pedido', minWidth: 50 },
    { id: 'activo', label: 'Activo', minWidth: 50 },
    {
        id: 'creado',
        label: 'Creado',
        minWidth: 100,
        align: 'left',
        // format: (value) => value.toLocaleString('en-US'),
        format: (value) => format(new Date(value), "dd-MM-yyyy H:mma")
    },
    { id: 'id_usuario', label: 'Id\u00a0Usuario', minWidth: 100 },
    { id: 'nombre_usuario', label: 'Usuario', minWidth: 100 }
];

function TicketList() {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [listaTickets, setListaTickets] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        function obtieneTickets() {
            TicketDataService.getAll()
                .then(response => {
                    setListaTickets(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        obtieneTickets();
    }, []);

    return (
        <Container component='main' maxWidth='md'>
            <CssBaseline />
            <div key='mainContent' className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ListAltIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Lista de Tickets
                </Typography>
            </div>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <TableContainer component={Paper}>
                        {/* <Table className={classes.table} aria-label='simple table'> */}
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>#</TableCell>
                                    <TableCell align='left'>Descripci&oacute;n</TableCell>
                                    <TableCell align='left'>Pedido</TableCell>
                                    <TableCell align='left'>Activo</TableCell>
                                    <TableCell align='left'>Usuario</TableCell>
                                    <TableCell align='left'>Creado</TableCell> */}
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {listaTickets.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component='th' scope='row'>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align='left'>{row.descripcion}</TableCell>
                                        <TableCell align='left'>{row.pedido}</TableCell>
                                        <TableCell align='left'>{row.activo}</TableCell>
                                        <TableCell align='left'>{row.creado}</TableCell>
                                        <TableCell align='left'>{row.id_usuario}</TableCell>
                                        <TableCell align='left'>{row.nombre_usuario}</TableCell>
                                    </TableRow>
                                ))} */}
                                {listaTickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                                        {column.format ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        align='right'
                        rowsPerPageOptions={[5, 10, 20]}
                        component='div'
                        count={listaTickets.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
            </form>
        </Container>
    );
}

export default TicketList;
