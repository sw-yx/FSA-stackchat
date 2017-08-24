import React, { Component } from 'react';
import store, {wroteNewMessage, receivedMessage, postMessages} from '../store';
import socket from '../socket'

export default class NewMessageEntry extends Component {
  constructor () {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
   this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(msg) {
   const action = wroteNewMessage(msg);
   store.dispatch(action);
  }

  handleSubmit(event) {
    event.preventDefault();
    const content = this.state.newMessageEntry;
    const channelId = this.props.channelId;

    const thunk = postMessages(content, channelId);
    store.dispatch(thunk);
  }
  


  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice... you can also use emojis :wink:"
            value = {this.state.newMessageEntry}
            onChange={e => this.handleChange(e.target.value)}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
