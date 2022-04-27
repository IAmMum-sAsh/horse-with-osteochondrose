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
    };

    async getinfo() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = cookies.get('');

        if (a){
            return await fetch('/api/getInfo', {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + a,
                    'Content-Type': 'application/json'
                }),
            }).then(response => response.json());
        }
    }

    async componentDidMount() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a) {
            this.setState({data_p: '../avatar.png'});
            let prsInfo = await this.getinfo();
            this.setState({role: prsInfo.role});
            this.setState({name: prsInfo.name});
            this.setState({id: prsInfo.id});
        } else {
            this.setState({data_p: '../avatar1.png'});
        }
    }

    renderMyProjects() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a) {
            return <a className='p-2 text-white' href="/my_projects">Мои проекты</a>;
        }
    }

    renderGiveManage() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = this.state.role;

        if (a && (b == "ROLE_ADMIN")) {
            return <a className='p-2 text-white' href='/give_manage'>Повысить</a>;
        }
    }


    addFunctions() {
        const cookies = new Cookies();
        let b = cookies.get('accessToken');

        if (b) {
            return (
                <div className="dropdown-child">
                    {this.renderGiveManage()}
                    <a href="/" onClick={this.handleRemoveCookie} >Выйти</a>
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
    renderBtnWork() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a) {
            return <a className='p-2 text-white' href='/workers'>Работники</a>;
        }
    }

    renderName() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a) {
            return <span className="user-span">по имени <span className="user-name">{this.state.name}</span> ID: {this.state.id}</span>;
        }
    }

    render() {
        const { data_p } = this.state;

        console.log(this.state.name + ' ' + this.state.role + ' ' + this.state.id)
        return (
            <div>

                <div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm opana '>
                    <h5 className='my-0 mr-md-auto font-weight-bold'><a className='main-lbl p-2 text-dark' href='/'>Конёк </a>{this.renderName()}</h5>


                    <nav className='my-2 my-md-0 mr-md-3'>
                        <a className='p-2 text-white' href='/companies'>Компании</a>
                        <a className='p-2 text-white' href='/projects'>Проекты</a>
                        {this.renderBtnWork()}
                        {this.renderMyProjects()}
                        <div className="dropdown">
                            <div >
                                <img className='user-nav-img' src={data_p}  alt='avatar'/>

                            </div>
                            { this.addFunctions() }
                        </div>
                    </nav>

                </div>
            </div>
        );
    }
}

export default withCookies(Header);