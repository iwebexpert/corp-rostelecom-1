import React, {Component} from 'react';

export class Counter extends Component {
    state = {
        counter: 0,
    }

    interval = null;

    handleButtonClick = (event) => {
        const action = +event.target.dataset.action;
        this.setState({
            counter: this.state.counter + action,
        });
    }

    componentDidMount(){
        console.log('componentDidMount');

        this.interval = setInterval(() => {
            console.log('Get data...');
        }, 1000);
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
        clearInterval(this.interval);
    }

    render(){
        console.log('render');
        return <div>
            <h1>Counter: {this.state.counter}</h1>
            <button data-action="1" onClick={this.handleButtonClick}>+1</button>
            <button data-action="-1" onClick={this.handleButtonClick}>-1</button>
            </div>;
    }
}