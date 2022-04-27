import React, {Component} from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './calendar.css';

let months = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];

class Calendarik extends Component {
    state = {
        date: new Date(),
        visibility: false
    }

    _onPress = (newDate) => {
        const name = 'date';
        this.setState({
            [name]: newDate
        });
    };

    // qnowDate = this.state.date.getDate();
    // qnowMonth = this.state.date.getMonth();
    // qnowYear = this.state.date.getFullYear();


    render() {
        // const [date, setDate] = useState(new Date());

        let nowDate = this.state.date.getDate();
        let nowMonth = this.state.date.getMonth();
        let nowYear = this.state.date.getFullYear();

        let prp = 'vis-'+this.props.show;
        console.log(prp);


        return (
            <div className={"app " + prp}>
                <div className='calendar-container'>
                    <Calendar onChange={this._onPress} value={this.state.date} />
                </div>
                <p className='text-center'>
                    <span className='bold'>Выбранная дата:</span>{' '}
                    {nowDate}{' '}{months[nowMonth]}{' '}{nowYear}
                </p>
            </div>
        );
    }
}

export default Calendarik;