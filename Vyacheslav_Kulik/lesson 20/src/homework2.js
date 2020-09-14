import React from 'react'
import ReactDom from 'react-dom'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
        this.arrayForMessage =[]
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.arrayForMessage.push(`Massage №${this.state.count}`)
        this.setState(({ count }) => ({
            count: count + 1,
        }));
    }


    render() {
        console.log(this.arrayForMessage)
        return (
            <div>
                <button onClick={this.onClick}>Click</button>
                {this.arrayForMessage.map((value, index) => <div key={index}><span>{value}</span></div>)}
            </div>
        );
    }
}

ReactDom.render(
    <Button />,
    document.getElementById('root')
);