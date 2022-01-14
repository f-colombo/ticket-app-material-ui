import React, { useState, useEffect } from "react";

import TicketDataService from '../services/ticket.service';
import UserDataService from '../services/user.service';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
}));

function TicketEdit(props) {
    const classes = useStyles();

    const [actualTicket, setActualTicket] = useState({
        id: undefined,
        id_usuario: undefined,
        descripcion: '',
        pedido: false,
        activo: false,
        nombre_usuario: ''
    });
    const [warningMessage, setWarningMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        function obtieneTicket(id) {
            TicketDataService.get(id)
                .then(response => {
                    setActualTicket(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        obtieneTicket(props.match.params.id);
    }, []);

    const onChangeId = e => {
        setActualTicket({
            ...actualTicket,
            id: e.target.value
        });
    }

    const onChangeIdUsuario = e => {
        setActualTicket({
            ...actualTicket,
            id_usuario: e.target.value
        });
    }

    const onChangeNombreUsuario = e => {
        setActualTicket({
            ...actualTicket,
            nombre_usuario: e.target.value
        });
    }

    const onChangeDescripcion = e => {
        setActualTicket({
            ...actualTicket,
            descripcion: e.target.value
        });
    }

    const updateFieldPedido = e => {
        var valor = e.target.checked ? 1 : 0;
        console.log(valor);
        var data = {
            id: actualTicket.id,
            id_usuario: actualTicket.id_usuario,
            descripcion: actualTicket.descripcion,
            pedido: valor,
            activo: actualTicket.activo
        };
        TicketDataService.update(actualTicket.id, data)
            .then(response => {
                setActualTicket({
                    ...actualTicket,
                    pedido: valor
                });
                // setWarningMessage('');
                // setSubmitted(false);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const updateFieldActivo = e => {
        var valor = e.target.checked ? 1 : 0;
        var data = {
            id: actualTicket.id,
            id_usuario: actualTicket.id_usuario,
            descripcion: actualTicket.descripcion,
            pedido: actualTicket.pedido,
            activo: valor
        };

        TicketDataService.update(actualTicket.id, data)
            .then(response => {
                setActualTicket({
                    ...actualTicket,
                    activo: valor
                });
                // setWarningMessage('');
                // setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const updateTicket = () => {
        // Validar
        if (actualTicket.descripcion === '') {
            setWarningMessage('Debe ingresar la descripción.');
            return;
        } else {
            setWarningMessage('');
        }

        TicketDataService.update(
            actualTicket.id,
            actualTicket
        )
            .then(response => {
                console.log(response.data);
                setWarningMessage('');
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const deleteTicket = () => {
        TicketDataService.delete(actualTicket.id)
            .then(response => {
                console.log(response.data);
                props.history.push('/tickets');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {
                submitted ? (
                    <div className={classes.root}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Ticket editado — <strong>exitosamente!</strong>
                        </Alert>
                        <Button variant="contained" color="primary" href="/tickets">
                            Volver a la lista
                        </Button>
                    </div>
                ) : (
                        actualTicket.id ? [
                            warningMessage ? (
                                <div key='errMsg' className={classes.root}>
                                    <Alert severity="warning">
                                        <AlertTitle>Warning</AlertTitle>
                                        {warningMessage}
                                    </Alert>
                                </div>
                            ) : null,
                            <div key='mainContent' className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <EditIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Editar Ticket
                                </Typography>
                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="id"
                                                label="Id Ticket"
                                                name="id"
                                                autoComplete="id"
                                                value={actualTicket.id || ''}
                                                onChange={onChangeId}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="id_usuario"
                                                label="Id Usuario"
                                                name="id_usuario"
                                                autoComplete="id_usuario"
                                                value={actualTicket.id_usuario || ''}
                                                onChange={onChangeIdUsuario}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="nombre_usuario"
                                                label="Usuario"
                                                name="nombre_usuario"
                                                autoComplete="nombre_usuario"
                                                value={actualTicket.nombre_usuario || ''}
                                                onChange={onChangeNombreUsuario}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="descripcion"
                                                label="Descripción"
                                                name="descripcion"
                                                autoComplete="descripcion"
                                                value={actualTicket.descripcion || ''}
                                                onChange={onChangeDescripcion}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={actualTicket.pedido === 1 ? true : false}
                                                        onChange={updateFieldPedido}
                                                        name="checkedPedido"
                                                        color="primary"
                                                    />
                                                }
                                                label="Pedido"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={actualTicket.activo === 1 ? true : false}
                                                        onChange={updateFieldActivo}
                                                        name="checkedActivo"
                                                        color="secondary"
                                                    />
                                                }
                                                label="Activo"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                        <Button variant="contained" color="primary" onClick={updateTicket}>
                                            Actualizar
                                        </Button>&nbsp;
                                        <Button variant="contained" color="secondary" onClick={deleteTicket}>
                                            Eliminar
                                        </Button>
                                    </Grid>
                                </form>
                            </div>
                        ] : (
                                <div className={classes.root}>
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                            Ticket a editar — <strong>no encontrado!</strong>
                                    </Alert>
                                    <Button variant="contained" color="primary" href="/tickets">
                                        Volver a la lista
                                    </Button>
                                </div>
                            )
                    )
            }
        </Container>
    );
}

export default TicketEdit;
