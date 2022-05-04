import {withCookies} from "react-cookie";
import React, { Component } from 'react';
import Cookies from "universal-cookie";
import Header from "../header/Header";
import "./give_role.css"

class GiveRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specs: [],
            spec_id: 1,
            user_id: 0,
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }

        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeSP = this.handleChangeSP.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

        this.handleSubmitAdm = this.handleSubmitAdm.bind(this);
        this.handleSubmitDoc = this.handleSubmitDoc.bind(this);
    }

    async getSpecs() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/specs', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    //give_doctor/{user_id}/{spec_id}
    async giveDoc() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/admin/give_doctor/'+this.state.user_id+'/'+this.state.spec_id, {
            method: 'put',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    //give_admin/{id}
    async giveAdm() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/admin/give_admin/'+this.state.user_id, {
            method: 'put',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async componentDidMount() {
        document.title = "Главная"
        let prs = await this.getSpecs();
        this.setState({specs: prs});
    }

    renderSpecs(){
        // const list = this.state.specs.map(specs => <a className="spec-b">{specs.id} - {specs.name}</a>);
        const list = this.state.specs.map(spec => <option value={spec.id}>{spec.name}</option>);
        return (
            <select className='input' label="Специальность" value={this.state.spec_id} onChange={this.handleChangeSP}>
                {list}
            </select>
        );
    }



    handleChangeID(event) {
        this.setState({user_id: event.target.value});
    }

    handleChangeSP(event) {
        this.setState({spec_id: event.target.value});
    }

    // handleSubmit(event) {
    //     alert('Your favorite flavor is: ' + this.state.spec_id);
    //     event.preventDefault();
    // }

    handleSubmitAdm = async e => {
        e.preventDefault();

        const token = await this.giveAdm();
        window.location.reload();
    }


    handleSubmitDoc = async e => {
        e.preventDefault();

        const token = await this.giveDoc();
        window.location.reload();
    }

    render() {
        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className="container">
                        <h3>Введите id человека, которому хотите выдать права Доктора</h3>
                    </div>
                    <div className="form" noValidate>
                        <div className="input-container ic1">
                            <input
                                className="input" type="number" min="2" placeholder=" "
                                id="id"
                                label="ID"
                                name="user_id"
                                onChange={this.handleChangeID}
                                autoFocus
                            />
                            <div className="cut"></div>
                            <label htmlFor="ID" className="placeholder">ID</label>
                        </div>
                        <div className="input-container ic1">
                            {this.renderSpecs()}
                        </div>
                        <button
                            type="submit"
                            onClick={this.handleSubmitDoc}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            Выдать права
                        </button>
                    </div>
                    <div className="container">
                        <h3>Введите id человека, которого хотите повысить до Администратора</h3>
                    </div>
                    <div className="form" noValidate>
                        <div className="input-container ic1">
                            <input
                                className="input" type="number" min="2" placeholder=" "
                                id="id"
                                label="ID"
                                name="user_id"
                                onChange={this.handleChangeID}
                                autoFocus
                            />
                            <div className="cut"></div>
                            <label htmlFor="ID" className="placeholder">ID</label>
                        </div>
                        <button
                            type="submit"
                            onClick={this.handleSubmitAdm}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            Выдать права
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(GiveRole);