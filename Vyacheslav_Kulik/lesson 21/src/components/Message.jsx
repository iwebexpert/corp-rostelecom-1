import React, {Component} from 'react'
import moment from "moment";


export default class Message extends Component {

    render(){
        //console.log(this.props.messages)
        const {text, author, time} = this.props.messages
        return (
            <div>
               <div>
                   <b>{author}</b>

               </div>
                <div>
                    <span dangerouslySetInnerHTML={{__html: text}} />
                </div>
                <div>
                    <span>{time.format('HH:mm')}</span>
                </div>
            </div>
        )
    }

}
