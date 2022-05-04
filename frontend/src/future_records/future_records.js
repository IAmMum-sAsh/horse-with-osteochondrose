import React, {Component} from "react";
import Header from "../header/Header";
import Cookies from "universal-cookie";
import "./future_records.css";
import Calendarik from "../calendar_component/calendar";

let months = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];


class FutureRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_records: [],
            daily_records:[],
            selected_list: 'daily',
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }
    }

    async getAllRecords() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/doctor/all_records', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async getDailyRecords() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/doctor/record', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async componentDidMount() {
        document.title = "Главная"
        let prs = await this.getDailyRecords();
        this.setState({daily_records: prs});
        let prs2 = await this.getAllRecords();
        this.setState({all_records: prs2});
    }

    changeList(value){
        this.setState({selected_list: value});
    }



    renderRecords(){
        // const list = this.state.specs.map(specs => <a className="spec-b">{specs.id} - {specs.name}</a>);
        let recordList = [];
        if (this.state.selected_list == 'daily'){
            recordList = this.state.daily_records;
        }
        else{
            recordList = this.state.all_records;
        }
        const list = recordList.map(record =>
            <>
                <a href={"/record/"+record.id} className={"card "}>
                    <span className="comp-name">Запись №{record.id}</span>
                    <div className="card-body">
                        <p>Записан <span className="u">{record.user}</span> ({record.polis})</p>
                        <p>К <span className="u">{record.doctor}</span> ({record.spec})</p>
                        <p><span className="u">{new Date(record.date).getDate()} {months[new Date(record.date).getMonth()]} {new Date(record.date).getFullYear()} {record.time}</span></p>
                    </div>
                </a>
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
        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className="container">
                        <h3>Ваши записи</h3>
                        <button onClick={() => {this.changeList('daily')}} className={"btn btn-primary btn-lg spec-b " + (this.state.selected_list === 'daily' ? "Rselected" : "RUNselected")} id={0}>На сегодня</button>
                        <button onClick={() => {this.changeList('all')}} className={"btn btn-primary btn-lg spec-b " + (this.state.selected_list === 'all' ? "Rselected" : "RUNselected")} id={0}>Все</button>
                        {this.renderRecords()}
                    </div>

                </div>
            </div>
        );
    }
}
export default FutureRecords;