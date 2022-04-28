import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Route, Switch, BrowserRouter} from "react-router-dom";
// import Layout from '../containers/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./ErrorPage";
import SignUP from "./login_component/SignUP";
import Login from "./login_component/Login";
import MyCalendar from "./my_calendar_component/calendar";
import Calendarik from "./calendar_component/calendar";
import InfoPage from "./info_page/InfoPage";
import MainPage from "./main_page/MainPage";
import UserRecords from "./user_records/user_records";
import DocBySpec from "./docs_by_spec/docs_by_spec";

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
                    <Route exact path={'/my_calendar'} component={MyCalendar}/>
                    <Route exact path={'/calendar'} component={Calendarik}/>

                    <Route>
                        <ErrorPage code={404} description={'Страница не найдена.'}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
