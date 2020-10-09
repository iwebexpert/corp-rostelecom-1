import React from 'react';
//import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
//import { Link } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


import { ChatForm } from 'components/ChatForm';

import './ChatList.scss';


export const ChatList = ({ chats, handleChatAdd, handleChatDel, handleChangeLocation, currentChatId }) => {
    return (
        <div className="chat-container">
            <div className="chat-form">
                <ChatForm onSend={handleChatAdd} />
            </div>
            <div className="chat-list">
                <List >
                    {chats.map((item, index) => (
                        <ListItem key={item.id} onClick={() => handleChangeLocation(index)} button selected={index == currentChatId}>
                            <ChatIcon color={item.fire ? "secondary" : "primary"} />
                            <ListItemText primary={item.title} key={item.id} />

                            <div className="chat-del">
                                {/* <IconButton aria-label="delete" onClick={(e) => handleChatDel(item.id, e)} key={item.id}>
                                        <DeleteIcon />
                                    </IconButton> */}
                            </div>
                        </ListItem>))}
                </List>
            </div>
        </div>
    )
};

// export class ChatList extends Component { 


//     render() {

//         const { chats, handleChatAdd, handleChatDel, handleChangeLocation, currentChatId } = this.props;

//         return (
//             <div className="chat-container">
//                 <div className="chat-form">
//                     <ChatForm onSend={handleChatAdd} />
//                 </div>
//                 <div className="chat-list">
//                     <List >
//                         {chats.map((item, index) => (
//                             <ListItem key={item.id} onClick={() => handleChangeLocation(index)} button selected={index == currentChatId}>
//                                 <ChatIcon color={item.fire ? "secondary" : "primary"} />
//                                 <ListItemText primary={item.title} key={item.id} />

//                                 <div className="chat-del">
//                                     {/* <IconButton aria-label="delete" onClick={(e) => handleChatDel(item.id, e)} key={item.id}>
//                                         <DeleteIcon />
//                                     </IconButton> */}
//                                 </div>
//                             </ListItem>))}
//                     </List>
//                 </div>
//             </div>
//         );
//     }
// }
