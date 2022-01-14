import React, { useState, useEffect } from "react";

import TicketDataService from '../services/ticket.service';
import UserDataService from '../services/user.service';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';

// import Link from '@material-ui/core/Link';
// import Box from '@material-ui/core/Box';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

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

function TicketAdd() {
    const classes = useStyles();

    const [id, setId] = useState(null);
    const [id_usuario, setIdUsuario] = useState(undefined);
    const [descripcion, setDescripcion] = useState('');
    const [pedido, setPedido] = useState(false);
    const [activo, setActivo] = useState(false);
    const [listaUsuario, setListaUsuario] = useState([]);
    const [selIdUsuario, setSelIdUsuario] = useState(0);
    const [warningMessage, setWarningMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        function obtieneUsuarios() {
            UserDataService.getAll()
                .then(response => {
                    let usuariosApi = response.data.map(usuario => {
                        return { id: usuario.id, nombre: usuario.nombre }
                    });
                    setListaUsuario([{ id: 0, nombre: '(Seleccione)' }].concat(usuariosApi));
                    setSelIdUsuario(0);
                    console.log(listaUsuario);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        obtieneUsuarios();
    }, []);

    // const onChangeIdUsuario = e => {
    //     setIdUsuario(e.target.value);
    // }

    const onChangeSelIdUsuario = e => {
        setSelIdUsuario(e.target.value);
    }

    const onChangeDescripcion = e => {
        setDescripcion(e.target.value);
    }

    const newTicket = () => {
        setId(null);
        setIdUsuario(undefined);
        setDescripcion('');
        setPedido(false);
        setActivo(false);

        setSelIdUsuario(0);
        setWarningMessage('');
        setSubmitted(false);
    }

    const saveTicket = () => {
        //Validar
        if (selIdUsuario === 0) {
            setWarningMessage('Debe seleccionar un usuario.');
            return;
        }
        else if (descripcion === '') {
            setWarningMessage('Debe ingresar la descripción.');
            return;
        } else {
            setWarningMessage('');
        }

        var data = {
            id_usuario: selIdUsuario,
            descripcion: descripcion
        };

        TicketDataService.create(data)
            .then(response => {
                setId(response.data.id);
                setIdUsuario(response.data.id_usuario);
                setDescripcion(response.data.descripcion);
                setPedido(response.data.pedido);
                setActivo(response.data.activo);

                //setSelIdUsuario(0);
                setWarningMessage('');
                setSubmitted(true);

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        // Reset
        setIdUsuario(0);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {
                submitted ? (
                    <div className={classes.root}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Ticket creado — <strong>exitosamente!</strong>
                        </Alert>
                        <Button variant="contained" color="primary" onClick={newTicket}>
                            Agregar nuevo
                        </Button>
                    </div>
                ) : [
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
                                <AssignmentIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Crear Ticket
                            </Typography>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="selUsuario"
                                            label="Usuario"
                                            name="selUsuario"
                                            value={selIdUsuario}
                                            onChange={onChangeSelIdUsuario}
                                            autoFocus
                                            select>
                                            {listaUsuario.map((usuario) => <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>)}
                                        </TextField>
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
                                            value={descripcion}
                                            onChange={onChangeDescripcion}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography component="span" variant="body1">
                                            Se creará un ticket el cual será asignado al usuario seleccionado.
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={saveTicket}
                                >
                                    Crear
                                </Button>
                            </form>
                        </div>
                    ]
            }
        </Container>
    );

}

export default TicketAdd;
