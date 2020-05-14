import React from 'react';
import firebase from '../firebase';
import '../Chatbox.css';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            chats: []
        }
    }

    scrollToBottom = () => {
        if (this.messagesEnd) {
             this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    componentDidMount() {

        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats = [];
            for (let chat in getChats) {
                if (getChats[chat].message !== '') {
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp,
                        email: getChats[chat].email
                    });
                }
            }
            const chats = ascChats;
            this.setState({ chats });
        });

        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }



        render() {
            return (
                /*             <div className="chatbox">
                                <ul className="chat-list">
                                    {this.state.chats.map(chat => {
                                        const postDate = new Date(chat.date);
                                        return (
                                            <li key={chat.id}>
                                                <em>{postDate.getDate() + '/' + (postDate.getMonth() + 1)}</em>
                                                <strong>{chat.user}:</strong>
                                                {chat.message}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div> */
                <div className="chatbox">

                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        const thisUser = firebase.auth().currentUser;
                        return (
                            <p key={chat.id} className={"chat-bubble " + (thisUser.email === chat.email ? "current-user" : "")}>
                                <strong>{chat.user}: </strong>
                                {chat.message}
                                <em className="date">{postDate.getDate() + '/' + (postDate.getMonth() + 1)}</em>
                                <div style={{ float: "left", clear: "both" }}
                                    ref={(elem) => { this.messagesEnd = elem; }}>
                                </div>
                            </p>

                        )
                    })}

                </div>

            );
        }
    }

    /* const Chatbox = props => (
        <ul>
            {
                props.items.map((item, index) => <li key={index}>{item}</li>)
            }
        </ul>
    ); */

    export default Chatbox;