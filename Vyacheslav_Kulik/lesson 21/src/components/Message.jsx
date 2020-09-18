import React, {Component} from 'react'


export default class Message extends Component {

    render(){
        //console.log(this.props.messages)
        const {text, author, time} = this.props.messages
        const location = (author === 'Bot') ? 'align-self-start' : 'align-self-end';
        const messageStyle = (author === 'Bot') ? 'messageStyleLeft' : 'messageStyleRight';
        return (
            <div className={messageStyle +' d-flex flex-column messageStyle'}>
               <div className={location}>
                   <b>{author}</b>

               </div>
                <div>
                    <span dangerouslySetInnerHTML={{__html: text}} />
                    <span className={'timeStyle'}>{time.format('HH:mm')}</span>
                </div>
            </div>
        )
    }

}
