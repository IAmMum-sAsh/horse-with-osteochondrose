import React, {Component} from 'react';
import './free_time_window.css';

let months = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];

class FreeTimeWindow extends Component {
    state = {
        time_id: new Date(),
        visibility: false
    }

    _onPress = (newDate) => {
        const name = 'time_id';
        this.setState({
            [name]: newDate
        });
        this.props.updateData(newDate);
    };


    render() {
        // const [date, setDate] = useState(new Date());

        let nowDate = this.state.date.getDate();
        let nowMonth = this.state.date.getMonth();
        let nowYear = this.state.date.getFullYear();

        let prp = 'vis-'+this.props.show;

        return (
            <div className={"app " + prp}>
                <div className='calendar-container'>
                    <Calendar onChange={this._onPress} value={this.state.date} />
                </div>
            </div>
        );
    }
}

export default FreeTimeWindow;