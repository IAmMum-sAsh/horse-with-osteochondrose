import * as React from 'react';
import * as RN from 'react-native-web';
import {Component} from "react";
import {withCookies} from "react-cookie";

class Calendar extends Component {
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November', 'December'];
    weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    state = {
        activeDate: new Date(),
        today: new Date(),
        changedMonth : new Date().getMonth()
    }

    generateMatrix() {
        let someDate = new Date();
        for (let m = 0; m < 12; m++) {
            someDate.setMonth(m);
            console.log(someDate.getMonth() + ' ' + this.months[someDate.getMonth()])
        }


        let matrix = [];
        matrix[0] = this.weekDays;

        let year = this.state.activeDate.getFullYear();
        let month = this.state.activeDate.getMonth();

        let firstDay = new Date(year, month, 1).getDay();

        let maxDays = this.nDays[month];
        if (month == 1) {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        let counter = 1;
        for (let row = 1; row < 7; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay-1) {
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    matrix[row][col] = counter++;
                }
                else if (row > 1 && counter > maxDays) {
                    counter=1;
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;

    }

    _onPress = (item) => {
        this.setState(() => {
            if (!item.match && item != -1) {
                this.state.activeDate.setDate(item);
                return this.state;
            }
        });
    };

    changeMonth = (n) => {
        this.setState(() => {
            this.state.activeDate.setMonth(
                this.state.activeDate.getMonth() + n
            )
            return this.state;
        });
    }


    render() {
        let month = this.state.activeDate.getMonth();
        let maxDays = this.nDays[month];
        console.log('na kalendare' + this.state.activeDate.getMonth())

        let matrix = this.generateMatrix();
        let counter = -10;
        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                if (item == this.state.today.getDate()){
                    counter=0;
                }//(item+maxDays-this.state.today.getDate() <= 35)&&(this.state.activeDate.getMonth()==this.state.nowMonth)
                return (
                    <RN.Text
                        style={{
                            flex: 1,
                            height: 35,
                            lineHeight: 35,
                            textAlign: 'center',
                            backgroundColor: rowIndex == 0 ? 'teal' : counter>=0&&counter++<=7&&colIndex!=5&&colIndex!=6 ? '#00FA9A': 'white',
                            color : colIndex == 6 || colIndex == 5 ? 'red' : 'black',
                            fontWeight : item == this.state.activeDate.getDate() ? 'bold' : 'normal',
                            border: '1px solid black',
                        }}
                        onPress={() => this._onPress(item)}>
                        {item}
                    </RN.Text>
                );
            });
            return (
                <RN.View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                    {rowItems}
                </RN.View>
            )
        });

        return (
            <RN.View>
                <RN.Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center',
                    backgroundColor: 'teal',
                    border: '1px solid black',
                    width: '100%'
                }}>
                    {this.months[this.state.activeDate.getMonth()]} &nbsp;
                    {this.state.activeDate.getFullYear()}
                </RN.Text>
                {rows}
                <RN.Button title='Previous' onPress={() => this.changeMonth(-1)} color='teal'/>
                <RN.Button title='Next' onPress={() => this.changeMonth(1)} color='teal'/>
            </RN.View>
        );
    }
}
export default withCookies(Calendar)