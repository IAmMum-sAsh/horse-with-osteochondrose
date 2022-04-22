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
            user: cookies.get("username") || "",
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
        cookies.remove("username"); // remove the cookie
        cookies.remove("accessToken"); // remove the cookie
        cookies.remove("refreshToken"); // remove the cookie
        // this.setState({ user: cookies.get("user") });
    };

    async getRole() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = cookies.get('');

        return await fetch('/api/get_my_role', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async getName() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/get_name', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async getId() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/get_id', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async componentDidMount() {
        if (document.URL.includes('my_projects/') || document.URL.includes('projects/') || document.URL.includes('companies/')){
            this.setState({data_p: '../avatar.png'});
        }

        let prsRole = await this.getRole();
        this.setState({role: prsRole.role});
        let prsName = await this.getName();
        this.setState({name: prsName.name});
        let prsId = await this.getId();
        this.setState({id: prsId.id});
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

    renderGiveAdmin() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = this.state.role;
        let c = this.state.name;

        if (a && (b == "ROLE_ADMIN") && (c == "Sensei")) {
            return <a className='p-2 text-white' href='/give_admin'>Возвысить</a>;
        }
    }

    renderCreateCompany() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = this.state.role;

        if (a && (b == "ROLE_ADMIN")) {
            return <a className='p-2 text-white' href='/create_company'>Создать компанию</a>;
        }
    }

    renderCreateProject() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = this.state.role;

        if (a && (b == "ROLE_ADMIN")) {
            return <a className='p-2 text-white' href='/create_project'>Создать проект</a>;
        }
    }

    renderAcceptIntoCompany() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = this.state.role;

        if (a && ((b == "ROLE_MANAGER") || (b == "ROLE_ADMIN"))) {
            return <a className='p-2 text-white' href='/accept_into_company'>Принять в компанию</a>;
        }
    }

    renderSetWorkerOnProject() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = this.state.role;

        if (a && ((b == "ROLE_MANAGER") || (b == "ROLE_ADMIN"))) {
            return <a className='p-2 text-white' href='/set_worker_on_project'>Поставить работника на проект</a>;
        }
    }

    renderChangeProjectStatus() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = this.state.role;

        if (a && (b == "ROLE_ADMIN")) {
            return <a className='p-2 text-white' href='/change_project_status'>Изменить статус проекта</a>;
        }
    }

    addFunctions() {
        const cookies = new Cookies();
        let b = cookies.get('username');

        if (b) { //войдено
            return (
                <div className="dropdown-child">
                    {this.renderGiveManage()}
                    {this.renderGiveAdmin()}
                    {this.renderCreateCompany()}
                    {this.renderCreateProject()}
                    {this.renderAcceptIntoCompany()}
                    {this.renderSetWorkerOnProject()}
                    {this.renderChangeProjectStatus()}
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
            return <span className="user-span">для пользователя <span className="user-name">{this.state.name}</span> ID: {this.state.id}</span>;
        }
    }

    render() {
        const { data_p } = this.state;

        console.log(this.state.name + ' ' + this.state.role + ' ' + this.state.id)
        return (
            <div>
                {/*<AuthElement />*/}
                {/*<CheckAcsessComponent />*/}

                <div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm opana '>
                    <h5 className='my-0 mr-md-auto font-weight-bold'><a className='main-lbl p-2 text-dark' href='/'>БОРЩ</a>{this.renderName()}</h5>


                    <nav className='my-2 my-md-0 mr-md-3'>
                        {/*<a className='p-2 text-dark' href='/user/1'>Личный кабинет</a>*/}
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