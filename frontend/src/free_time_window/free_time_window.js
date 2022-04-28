import React, {Component} from 'react';
import './free_time_window.css';
import Cookies from "universal-cookie";

class FreeTimeWindow extends Component {
    state = {
        empty_records: [],
        time_id: new Date(),
        doctor_id: this.props.doctor_id,
        date: this.props.date,
        visibility: true
    }

    async getEmptyRecords(cre) {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/doctors/'+this.props.doctor_id, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(cre)
        }).then(response => response.json());
    }

    async recordFetch(cre) {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        console.log('> > > > ' + cre + ' ' + this.props.doctor_id);

        return fetch('/api/doctors/' + this.props.doctor_id + '/record', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(cre)
        }).then(response => response.json());
    }

    async componentDidMount() {
        document.title = "Главная"
        let porDate = new Date(this.props.date);
        let mon;
        if ((porDate.getMonth()+1).toString().length == 1) mon = '0'+String(porDate.getMonth()+1);
        else mon = String(porDate.getMonth()+1);
        let date = String(porDate.getFullYear()) +'-' + mon + '-' + String(porDate.getDate());
        let prs = await this.getEmptyRecords({
            date
        });
        this.setState({empty_records: prs});
        console.log('***** Empty Record Response *****' + this.state.empty_records + ' --------- ' + {
            date
        }.date);
    }

    async record(time_id){
        let porDate = new Date(this.props.date);
        let mon;
        if ((porDate.getMonth()+1).toString().length == 1) mon = '0'+String(porDate.getMonth()+1);
        else mon = String(porDate.getMonth()+1);
        let date = String(porDate.getFullYear()) +'-' + mon + '-' + String(porDate.getDate());
        let prs = await this.recordFetch({
            date,
            time_id
        });
        console.log('***** Record Response *****' + prs);
    }

    renderSpecs(){
        //href="/records"
        const list = this.state.empty_records.map(rec => <a onClick={() => {this.record(rec.id)}} className="btn btn-primary btn-lg spec-b time" id={rec.id}>{rec.time}</a>);
        return (
            <div className="">
                {list}
            </div>
        );

    }


    render() {
        let prp = 'vis-'+this.props.show;

        // console.log(this.state.date + ' ' + this.state.doctor_id)
        // console.log(this.props.date + ' ' + this.props.doctor_id)

        return (
            <div className={"app " + prp}>
                <div className='calendar-container'>
                    {this.renderSpecs()}
                </div>
            </div>
        );
    }
}

export default FreeTimeWindow;