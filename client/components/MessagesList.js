import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, {gotMessagesFromServer, fetchMessages} from '../store';
import ReactDOM from 'react-dom';


let unsubscribe;

export default class MessagesList extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
   unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })

    const thunk = fetchMessages();
    store.dispatch(thunk);
    this.scrollToBottom();
  }


  componentWillUnmount() {
    unsubscribe();
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }
  
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list" id="medialist">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </ul>
        <NewMessageEntry channelId={channelId}/>
        
      </div>
    );
  }
}
