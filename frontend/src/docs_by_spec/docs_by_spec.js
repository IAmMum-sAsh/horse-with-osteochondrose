import React, {Component} from "react";
import './docs_by_spec.css';
import Header from "../header/Header";
import Cookies from "universal-cookie";

class DocBySpec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docs: [],
            spec_id: 0,
            code: props.code ? props.code : '999',
            description: props.description ? props.description : 'Unknown error'
        }
    }

    async getSpecs() {
        const cookies = new Cookies();
        let a = cookies.get('accessToken');

        let s = document.URL;
        let res = s.split('/').pop();
        console.log(res);

        const name = 'spec_id';

        this.setState({
            [name]: res
        });

        return await fetch('/api/specs/'+Number(res), {
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
        this.setState({docs: prs});
    }

    renderSpecs(){
        // const list = this.state.specs.map(specs => <a className="spec-b">{specs.id} - {specs.name}</a>);
        const list = this.state.docs.map(doc => <a href={"/doctor/"+doc.doctor_id} className="btn btn-primary btn-lg spec-b" id={doc.doctor_id}
                                                      data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing Order">{doc.username}</a>);
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

export default DocBySpec;