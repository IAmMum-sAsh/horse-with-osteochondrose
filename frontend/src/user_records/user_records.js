import React, {Component} from "react";
import Header from "../header/Header";
import Cookies from "universal-cookie";
import "./user_records.css";
import Calendar from "../my_calendar_component/calendar";

let months = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];


class UserRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }
    }



    async getRecords() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/records', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async componentDidMount() {
        document.title = "Главная"
        let prs = await this.getRecords();
        console.log(prs);
        this.setState({records: prs});
    }

    renderSpecs(){
        // const list = this.state.specs.map(specs => <a className="spec-b">{specs.id} - {specs.name}</a>);

        const list = this.state.records.map(record =>
            <div className="card">
                <span className="comp-name"><span className="dot"></span>Запись №{record.id}</span>
                <div className="card-body">
                    <p>Записан <span className="u">{record.user}</span> ({record.polis})</p>
                    <p>К <span className="u">{record.doctor}</span> ({record.spec})</p>
                    <p><span className="u">{new Date(record.date).getDate()} {months[new Date(record.date).getMonth()]} {new Date(record.date).getFullYear()} {record.time}</span></p>
                </div>

            </div>
        );
        return (
            <div className="fa-ul">
                {list}
            </div>
        );

    }

    render() {
        const { data_p } = this.state;
        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className="container">
                        <h3>Ваши записи</h3>
                        {this.renderSpecs()}
                    </div>

                </div>
            </div>
        );
    }
}
export default UserRecords;