import React, {Component, useState} from "react";
import Header from "../header/Header";
import Cookies from "universal-cookie";
import './record_by_id.css';
import {Button, Container, Modal, Row} from "react-bootstrap";

let months = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];

const CreateRecord = (props) => {
    const [showAuthor, setAuthorModalShow] = useState(false);
    const handleCloseAuthor = () => setAuthorModalShow(false);
    const handleShowAuthor = () => setAuthorModalShow(true);

    let list;

    list = props.history.map(record =>
        <div className={"card "}>
            <span className="comp-name">Запись №{record.id}</span>
            <div className="card-body">
                <p>Записан <span className="u">{record.user}</span> ({record.polis})</p>
                <p>К <span className="u">{record.doctor}</span> ({record.spec})</p>
                <p><span className="u">{new Date(record.date).getDate()} {months[new Date(record.date).getMonth()]} {new Date(record.date).getFullYear()} {record.time}</span></p>
                <p><span className="u">Заключение:</span>
                    {record.description == '' ?
                        <div className="fa-ul ">
                            &lt;&lt;Пусто&gt;&gt;
                        </div> :
                        <><br/>{record.description}</>
                    }
                </p>

            </div>
        </div>
    );

    return(
        <>
            <p>Записан <span className={'u b'} variant="primary" onClick={handleShowAuthor}>
                {props.user_name}
                </span> ({props.polis})</p>
            <Container>
                <Row>
                    <Modal show={showAuthor} onHide={handleCloseAuthor} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>История пациента</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {list}
                        </Modal.Body>
                    </Modal>
                </Row>
            </Container>
        </>
    );
}


class RecordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: '',
            text: '',
            user_id: 0,
            history: [],
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }

        this.handleChange = this.handleChange.bind(this);
        this.callCloseRecord = this.callCloseRecord.bind(this);
        this.getUserHistory = this.getUserHistory.bind(this);
    }

    async getRecord() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        let s = document.URL;
        let res = s.split('/').pop();

        if (a){
            return await fetch('/api/doctor/record/'+Number(res), {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + a,
                    'Content-Type': 'application/json'
                }),
            }).then(response => response.json());
        }
    }

    //record/{id}/close
    closeRecord(cre) {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        let s = document.URL;
        let res = s.split('/').pop();

        if (a){
            return fetch('/api/doctor/record/'+this.state.record.id+'/close', {
                method: 'put',
                headers: new Headers({
                    'Authorization': 'Bearer ' + a,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(cre)
            }).then(response => response.json());
        }
    }

    getHistory() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        if (a){
            return fetch('/api/doctor/user/'+this.state.user_id+'/history', {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + a,
                    'Content-Type': 'application/json'
                })
            }).then(response => response.json());
        }
    }

    async componentDidMount() {
        document.title = "Главная"
        let prs = await this.getRecord();
        this.setState({record: prs});
        this.setState({user_id: prs.user_id});
    }

    handleChange(event){
        this.setState({text: event.target.value});
    }

    callCloseRecord(){
        let description = this.state.text;

        const token = this.closeRecord({
            description
        });
    }

    async getUserHistory() {
        const res = await this.getHistory();
        this.setState({history: res});
    }

    render() {
        let record = this.state.record;
        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className="container">
                        <h3>Выберите специалиста для записи</h3>
                        <div className={"card "}>
                            <span className="comp-name">Запись №{record.id}</span>
                            <div className="card-body">
                                <a onClick={async () => {await this.getUserHistory()}} id={'unic_id'}><CreateRecord history={this.state.history} user_name={record.user} polis={record.polis} /></a>
                                <p>К <span className="u">{record.doctor}</span> ({record.spec})</p>
                                <p><span className="u">{new Date(record.date).getDate()} {months[new Date(record.date).getMonth()]} {new Date(record.date).getFullYear()} {record.time}</span></p>
                            </div>
                            <input type={'text'} className={'text'} onChange={this.handleChange}/>
                            <a href={'/future_records'} onClick={this.callCloseRecord}
                               className={"btn btn-primary btn-lg spec-b red"} >Закрыть</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecordPage;