import React, {Component} from "react";
import './main_page.css';
import Header from "../header/Header";
import Cookies from "universal-cookie";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_p: 'gerb.png',
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }
    }

    renderBtn() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');
        let b = cookies.get('username');

        if (a) {
            return <button onClick={e => {window.location='/projects'}}>Перейти к проектам</button>;
        }
    }

    render() {
        const { data_p } = this.state;
        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className='mheader'>
                        <div className='mcontainer'>
                            <div className="overlay">
                                <h1>БОРЩ</h1>
                                <h3>Система управления персоналом</h3>
                                <hr />
                                <div className="content__article">

                                    <p>Федеральное государственное бюджетное образовательное учреждение высшего образования
                                        <br/>«МИРЭА – Российский технологический университет»
                                    </p>
                                    <p><img src={data_p} alt="герб"/></p>
                                    <p>Институт информационных технологий (ИТ)<br/>Кафедра инструментального и прикладного программного обеспечения (ИиППО)</p>
                                    <p>Курсовая работа<br/>по дисциплине<br/>«Разработка серверных частей интернет-ресурсов»<br/>на тему «Веб-сервис по управлению персоналом»</p>
                                    <p className="right">Студента 3 курса<br/>группы ИКБО-01-19<br/>Витухиной Натальи Александровны</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;