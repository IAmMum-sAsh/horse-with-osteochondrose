import '../App.css';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core";
import {useCookies, withCookies} from "react-cookie";
import Cookies from 'universal-cookie';
import PropTypes from "prop-types";
import './Login.css';
import Typography from '@material-ui/core/Typography';

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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


async function loginUser(credentials) {

    let data = '';
    console.log(credentials);
    return fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())

}


class Login extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            _email: '',
            _password: ''
        };

        //const [token, setToken] = useState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        //console.log(name, " ", value)
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();


        let email = this.state._email;
        let password = this.state._password;

        const token = await loginUser({
            email,
            password
        });

        if (token.accessToken) {
            const cookies = new Cookies();
            cookies.set('accessToken', token.accessToken, {path: '/'});
            cookies.set('refreshToken', token.refreshToken, {path: '/'});

            this.props.history.push("/");
        }

    }

    render() {
        const { classes } = this.props;

        return (
            <div className='main-pallete'>

                <div className="session">
                    <div className="left">
                    </div>

                    <form className={classes.form} noValidate>
                        <img src="logo.png" alt="" className="icoicoico"/>
                        <a href='/'><h3>Электронная больница <span>Конёк-Горбунок</span></h3></a>
                        <p>Добро пожаловать! Войдите в аккаунт используя адрес электронной почты и пароль.</p>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email адрес"
                            name="_email"
                            autoComplete="email"
                            onChange={this.handleInputChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="_password"
                            label="Пароль"
                            type="password"
                            id="password"
                            onChange={this.handleInputChange}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            onClick={this.handleSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Войти!
                        </Button>
                        <Grid container>
                            <Grid item sm>
                                <Link href="/signup" variant="body2">
                                    {"Еще нет у нас аккаунта? Зарегистрироваться!"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }

}

export default withCookies(withStyles(useStyles)(Login));