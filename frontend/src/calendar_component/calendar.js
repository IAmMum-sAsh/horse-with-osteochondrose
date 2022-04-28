import React, {Component, useState} from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import FreeTimeWindow from "../free_time_window/free_time_window";


const CreateRecord = (props) => {
    const [showAuthor, setAuthorModalShow] = useState(false);
    const handleCloseAuthor = () => setAuthorModalShow(false);
    const handleShowAuthor = () => setAuthorModalShow(true);

    console.log('> > > CreateRecords doc_id = ' + props.doctor_id)

    let selectedDate = props.date;
    selectedDate.setHours(0);
    selectedDate.setMinutes(0);
    let isRecordable = new Date() < selectedDate;
    let prp;
    if (props.visibility && isRecordable){
        prp = 'vis-true';
    }
    else prp = 'vis-false';

    return(
        <>
            <Button className={'btn btn-primary btn-lg spec-b ' + prp} variant="primary" onClick={handleShowAuthor}>
                Выбрать время
            </Button>
            <Container>
                <Row>
                    <Modal show={showAuthor} onHide={handleCloseAuthor} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Выберите время</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FreeTimeWindow doctor_id={props.doctor_id} date={props.date} /> {/*updateData={this.updateData}*/}
                        </Modal.Body>
                    </Modal>
                </Row>
            </Container>
        </>
    );


}

let months = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];

class Calendarik extends Component {
    state = {
        date: new Date(),
        doctor_id: this.props.doctor_id,
        visibility: this.props.show
    }

    _onPress = (newDate) => {
        const name = 'date';
        this.setState({
            [name]: newDate
        });
        this.props.updateData(newDate);
        console.log('> > calendars doc_id = ' + this.props.doctor_id)
    };


    render() {

        let nowDate = this.state.date.getDate();
        let nowMonth = this.state.date.getMonth();
        let nowYear = this.state.date.getFullYear();

        let prp = 'vis-'+this.props.show;

        return (
            <>
                <div className={"app " + prp}>
                    <div className='calendar-container'>
                        <Calendar onChange={this._onPress} value={this.state.date} />
                    </div>
                    <p className='text-center'>
                        <span className='bold'>Выбранная дата:</span>{' '}
                        {nowDate}{' '}{months[nowMonth]}{'('}{nowMonth+1}{') '}{nowYear}
                    </p>
                </div>
                <CreateRecord date={this.state.date} doctor_id={this.props.doctor_id} visibility={this.props.show}/>
            </>
        );
    }
}

export default Calendarik;