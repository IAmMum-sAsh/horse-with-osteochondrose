import {withCookies} from "react-cookie";
import React, { Component } from 'react';
import Cookies from "universal-cookie";
import Header from "../header/Header";

class GiveRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specs: [],
            spec_id: 0,
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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

    async componentDidMount() {
        document.title = "Главная"
        let prs = await this.getSpecs();
        this.setState({specs: prs});
    }

    renderSpecs(){
        // const list = this.state.specs.map(specs => <a className="spec-b">{specs.id} - {specs.name}</a>);
        const list = this.state.specs.map(spec => <option value={spec.id}>{spec.name}</option>);
        return (
            <select value={this.state.spec_id} onChange={this.handleChange}>
                {list}
            </select>
        );
    }



    handleChange(event) {
        this.setState({spec_id: event.target.value});
    }

    // handleSubmit(event) {
    //     alert('Your favorite flavor is: ' + this.state.spec_id);
    //     event.preventDefault();
    // }

    render() {
        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className="container">
                        <h3>Выберите специальность для записи</h3>
                        {this.renderSpecs()}
                    </div>

                </div>
            </div>
            // <form onSubmit={this.handleSubmit}>
            //     <label>
            //
            //     </label>
            //     <input type="submit" value="Submit" />
            // </form>
        );
    }
}

export default withCookies(GiveRole);