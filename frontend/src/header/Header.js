import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            username: cookies.get("accessToken") || "",
            data_p: 'avatar.png',
            id: 0,
            role: '',
            name: '',
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        };

    }

    handleRemoveCookie = () => {
        const { cookies } = this.props;
        cookies.remove("accessToken"); // remove the cookie
        cookies.remove("refreshToken"); // remove the cookie
        cookies.remove("name"); // remove the cookie
        cookies.remove("role"); // remove the cookie
        cookies.remove("id"); // remove the cookie
    };

    async componentDidMount() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        let cName = cookies.get('name');
        let cRole = cookies.get('role');
        let cId = cookies.get('id');

        if (a) {
            this.setState({data_p: '../avatar.png'});
            this.setState({role: cRole});
            this.setState({name: cName});
            this.setState({id: cId});
        } else {
            this.setState({data_p: '../avatar1.png'});
        }
    }

    // строка в шапке
    renderInfoPage() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a) {
            return <a className='p-2 text-white' href="/about">Записаться</a>;
        }
    }

    renderMyRecords() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a) {
            return <a className='p-2 text-white' href="/records">Мои записи</a>;
        }
    }

    // выпадающее меню
    renderGiveRole() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = cookies.get('role');

        if (a && (b == "ROLE_ADMIN")) {
            return <a className='p-2 text-white' href='/give_role'>Выдать права</a>;
        }
    }

    renderFutureRecords() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = cookies.get('role');

        if (a && (b == "ROLE_DOCTOR")) {
            return <a className='p-2 text-white' href='/future_records'>Предстоящие записи</a>;
        }
    }

    // собираем выпадающее меню
    addFunctions() {
        const cookies = new Cookies();
        let b = cookies.get('accessToken');

        if (b) {
            return (
                <div className="dropdown-child">
                    {this.renderGiveRole()}
                    {this.renderFutureRecords()}
                    <a onClick={() => window.setTimeout(this.handleRemoveCookie, 10)} href="/"  >Выйти</a>
                </div>
            )
        } else {
            return (
                <div className="dropdown-child">
                    <a href="/login">Войти</a>
                    <a href="/signup">Зарегистрироваться</a>
                </div>
            )
        }
    }

    // имя в шапке
    renderName() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a) {
            return <span className="user-span">по имени <span className="user-name">{this.state.name}</span> ID: {this.state.id}</span>;
        }
    }

    render() {
        const { data_p } = this.state;
        return (
            <div>

                <div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm opana '>
                    <h5 className='my-0 mr-md-auto font-weight-bold'><a className='main-lbl p-2 text-dark' href='/'>Конёк </a>{this.renderName()}</h5>


                    <nav className='my-2 my-md-0 mr-md-3'>
                        {/*в шапке*/}
                        {this.renderInfoPage()}
                        {this.renderMyRecords()}
                        <div className="dropdown">
                            <div >
                                <img className='user-nav-img' src={data_p}  alt='avatar'/>

                            </div>
                            {/*выпадающее меню*/}
                            { this.addFunctions() }
                        </div>
                    </nav>

                </div>
            </div>
        );
    }
}

export default withCookies(Header);