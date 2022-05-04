import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Route, Switch, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./ErrorPage";
import SignUP from "./login_component/SignUP";
import Login from "./login_component/Login";
import InfoPage from "./info_page/InfoPage";
import MainPage from "./main_page/MainPage";
import UserRecords from "./user_records/user_records";
import DocBySpec from "./docs_by_spec/docs_by_spec";
import GiveRole from "./give_role/give_role";
import FutureRecords from "./future_records/future_records";
import RecordPage from "./record_by_id/record_by_id";

class App extends Component {
    render()
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={InfoPage}/>

                    <Route exact path={'/about'} component={MainPage}/>
                    <Route exact path={'/records'} component={UserRecords}/>
                    <Route exact path={'/specs/**'} component={DocBySpec}/>

                    <Route exact path={'/signup'} component={SignUP}/>
                    <Route exact path={'/login'} component={Login}/>
                    {/*<Route exact path={'/my_calendar'} component={MyCalendar}/>*/}

                    <Route exact path={'/give_role'} component={GiveRole}/>

                    <Route exact path={'/future_records'} component={FutureRecords}/>
                    <Route exact path={'/record/**'} component={RecordPage}/>


                    <Route>
                        <ErrorPage code={404} description={'Страница не найдена.'}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
