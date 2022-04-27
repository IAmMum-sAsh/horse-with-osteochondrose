import React, {Component} from "react";
import './main_page.css';
import Header from "../header/Header";
import Cookies from "universal-cookie";
import Calendar from "../my_calendar_component/calendar";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specs: [],
            data_p: 'gerb.png',
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }
    }

    async getSpecs() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        return await fetch('/api/specs', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + a,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());
    }

    async componentDidMount() {
        document.title = "Главная"
        let prs = await this.getSpecs();
        console.log(prs);
        this.setState({specs: prs});
    }

    renderSpecs(){
        // const list = this.state.specs.map(specs => <a className="spec-b">{specs.id} - {specs.name}</a>);
        const list = this.state.specs.map(specs => <a href={"/specs/"+specs.id} className="btn btn-primary btn-lg spec-b" id={specs.id}
                                                           data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing Order">{specs.name}</a>);
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
                        <h3>Выберите специальность для записи</h3>
                        {this.renderSpecs()}
                    </div>

                </div>
            </div>
        );
    }
}

export default MainPage;