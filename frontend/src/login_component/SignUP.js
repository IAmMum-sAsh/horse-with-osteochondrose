import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Copyright} from "@material-ui/icons";
import {Input, Select, withStyles} from "@material-ui/core";
import Cookies from "universal-cookie";
import MenuItem from "react-bootstrap/lib/MenuItem";
import './Login.css';
import './SignUp.css';

class Card extends React.Component {
    render() {
        return (<div className="card">{this.props.children}</div>)
    }
}

class SelectableCard extends React.Component {

    render() {
        var isSelected = this.props.selected ? "selected" : "";
        var className = "selectable " + isSelected;
        return (
            <Card>
                <div className={className} onClick={this.props.onClick}>
                    {this.props.children}
                    <div className="check"><span className="checkmark">✔</span></div>
                </div>
            </Card>
        );
    }
}


const useStyles = (theme) => ({
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
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});

// function registerManagerUser(credentials) { //credentials as param
//     //console.log(JSON.stringify(credentials));
//
//     let data = '';
//     return fetch('/api/signup/manager', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//         .then(data => data.json())
//
// }

async function registerWorkerUser(credentials) { //credentials as param
    //console.log(JSON.stringify(credentials));

    let data = '';
    return fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())

}

class SignUP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            who: '',
            res: '',
            firstName: '',
            lastName: '',
            secondName: '',
            username: '',
            email: '',
            password: '',
            polis: '',
            userProfileImageUrl: "https://iconorbit.com/icons/256-watermark/1611201511385554301-Girl%20User.jpg",
            title:"",
            description:"",
            clname: 'selectable ',
            sel1:"selected",
            sel2:""
        };

        //this.useStyles = this.useStyles.bind(this);

        //this.state.classes = this.useStyles();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleselselect = this.handleselselect.bind(this);
    }



    componentDidMount() {
        // this.state.classes = this.useStyles;

    }

    Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Flats.io
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    handleSubmit = async e => {
        e.preventDefault();

        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;
        let polis = this.state.polis;

        let userProfileImageUrl = this.state.userProfileImageUrl;

        if (username === null || username === '') {
            return;
        } if (email === null || email === '') {
            return;
        } if (password === null || password === '') {
            return;
        } if (polis === null || polis === '') {
            return;
        }

        const token = registerWorkerUser({
            username,
            email,
            password,
            polis
        }).then(result => {this.setState({
            res : result.username
        } ) } )

        this.props.history.push("/login");
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChange = (event) => {
        this.setState({
            who: event.target.value
        });
    }

    handleselselect() {
        if (this.state.sel1 == "selected") {
            this.setState({sel1: '',sel2: "selected"});
        } else {
            this.setState({sel2: '',sel1: "selected"});
        }
    }

    render() {
        const { classes, title, description, clname, sel } = this.props;
        const selection_worker = 'selectable '+this.state.sel1;
        const selection_manager = 'selectable '+this.state.sel2;

        return (
            // <div>
            //     <Header {...this.props}/>

            <div className='main-pallete'>
                {/*<Header {...this.props}/>*/}

                <div className="session">
                    <div className="left">
                    </div>

                    <form className="frmmain" noValidate> <a href='/'>
                        <img src="logo.png" alt="" className="icoicoico"/>
                        <h3>Электронная больница <span>Конёк-Горбунок</span></h3></a>
                        <p>Добро пожаловать! Пожалуйста, введите информацию в поля ниже для получения доступа к функциям сервиса.</p>

                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email адрес"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleInputChange}
                        /> <br/>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            autoComplete="username"
                            onChange={this.handleInputChange}
                        /> <br/>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleInputChange}
                        /> <br/>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="polis"
                            label="Медицинский полис"
                            name="polis"
                            autoComplete="polis"
                            onChange={this.handleInputChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                            id="awd"
                        >
                            Зарегистрироваться
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Уже есть аккаунт? Войти!
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }

}

export default withStyles(useStyles)(SignUP);