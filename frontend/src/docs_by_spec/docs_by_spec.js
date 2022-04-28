import React, {Component, useState} from "react";
import Header from "../header/Header";
import Cookies from "universal-cookie";
import Calendarik from "../calendar_component/calendar";
import './docs_by_spec.css';

class DocBySpec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docs: [],
            spec_id: 0,
            selectedDoctor: 0,
            isCalendar: false,
            date: new Date(),
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }
    }

    showCalendar = (value) => {
        this.setState({isCalendar: true});
        this.setState({selectedDoctor: value});
        console.log('> selectedDoctor ' + value);
    }
    hideCalendar = () => {
        this.setState({isCalendar: false});
        this.setState({selectedDoctor: 0});
        console.log('> selectedDoctor 0');
    }

    updateData = (value) => {
        this.setState({ date: value });
    }

    async getSpecs() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        let s = document.URL;
        let res = s.split('/').pop();

        const name = 'spec_id';

        this.setState({
            [name]: res
        });

        if (a){
            return await fetch('/api/specs/'+Number(res), {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + a,
                    'Content-Type': 'application/json'
                }),
            }).then(response => response.json());
        }
    }

    async componentDidMount() {
        document.title = "Главная"
        let prs = await this.getSpecs();
        this.setState({docs: prs});
    }

    renderSpecs(){
        const list = this.state.docs.map(doc => <button onClick={() => {this.showCalendar(doc.doctor_id)}}
                                                        className={"btn btn-primary btn-lg spec-b " + (doc.doctor_id === this.state.selectedDoctor ? "selected" : "UNselected")} id={doc.doctor_id} >{doc.username}</button>);
        return (
            <div className="">
                {list}
            </div>
        );

    }

    handleChange(id) {
        this.setState({ClickedButton: id})
        this.props.selectedtype.bind(this, id)()
    }

    render() {
        let calVis = 'vis-'+this.state.isCalendar;

        return (
            <div className="back-background">
                <div className='main-important'>
                    <Header />
                    <div className="container">
                        <h3>Выберите специалиста для записи</h3>
                        {this.renderSpecs()}
                        <Calendarik show={this.state.isCalendar} updateData={this.updateData} doctor_id={this.state.selectedDoctor} date={this.state.date}/>
                        <button onClick={this.hideCalendar} className={"btn btn-primary btn-lg spec-b red " + calVis} id={0}>Скрыть</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocBySpec;