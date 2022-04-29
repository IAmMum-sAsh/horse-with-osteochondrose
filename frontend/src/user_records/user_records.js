import React, {Component} from "react";
import Header from "../header/Header";
import Cookies from "universal-cookie";
import "./user_records.css";
import Calendarik from "../calendar_component/calendar";

let months = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];


class UserRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            isCalendar: false,
            selectedRecord: 0,
            selectedDoctor: 0,
            date: new Date(),
            time_id: 0,
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
        this.setState({records: prs});
    }


    showCalendar = (value1, value2) => {
        this.setState({isCalendar: true});
        this.setState({selectedRecord: value1});
        this.setState({selectedDoctor: value2});
    }
    hideCalendar = () => {
        this.setState({isCalendar: false});
        this.setState({selectedRecord: 0});
        this.setState({selectedDoctor: 0});
    }
    updateData = (value) => {
        this.setState({ date: value });
    }
    deleteRecord = (value) => {
        let prs = this.deleteFetch(value);
        window.location.reload();
    }

    async deleteFetch(value) {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');


        return fetch('/api/record/' + value, {
            method: 'delete',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            })
        }).then(response => response.json());
    }



    renderSpecs(){
        // const list = this.state.specs.map(specs => <a className="spec-b">{specs.id} - {specs.name}</a>);

        const list = this.state.records.map(record =>
            <>
            <div className={"card " + (record.id === this.state.selectedRecord ? "Rselected" : "RUNselected")}>
                <span className="comp-name">Запись №{record.id}</span>
                <div className="card-body">
                    <p>Записан <span className="u">{record.user}</span> ({record.polis})</p>
                    <p>К <span className="u">{record.doctor}</span> ({record.spec})</p>
                    <p><span className="u">{new Date(record.date).getDate()} {months[new Date(record.date).getMonth()]} {new Date(record.date).getFullYear()} {record.time}</span></p>
                </div>
                <button onClick={() => {this.showCalendar(record.id, record.doctor_id)}}
                        className={"btn btn-primary btn-lg spec-b "} >Перенести</button>
                <button onClick={() => {this.deleteRecord(record.id)}}
                        className={"btn btn-primary btn-lg spec-b red"} >Отменить</button>
            </div>
            </>
        );
        if(list.length == 0){
            return (
                <div className="fa-ul text-center">
                    &lt;&lt;Пусто&gt;&gt;
                </div>
            );
        }
        else{
            return (
                <div className="fa-ul">
                    {list}
                </div>
            );
        }


    }

    render() {
        let calVis = 'vis-'+this.state.isCalendar;
        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className="container">
                        <h3>Ваши записи</h3>
                        {this.renderSpecs()}
                        <Calendarik show={this.state.isCalendar} updateData={this.updateData} doctor_id={this.state.selectedDoctor} date={this.state.date} isUpdate={1} record_id={this.state.selectedRecord}/>
                        <button onClick={this.hideCalendar} className={"btn btn-primary btn-lg spec-b red " + calVis} id={0}>Скрыть календарь</button>
                    </div>

                </div>
            </div>
        );
    }
}
export default UserRecords;