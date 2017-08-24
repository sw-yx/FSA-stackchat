import React, { Component } from 'react';
import store, {newUser} from '../store';

export default class NameEntry extends Component {
    constructor () {
        super();
        this.state = store.getState();
    
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      componentDidMount () {
       this.unsubscribe = store.subscribe(() => {
          this.setState(store.getState());
        })
    
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }
    
      handleChange(newName) {
       const action = newUser(newName);
       store.dispatch(action);
      }
    
    //   handleSubmit(event) {
    //     event.preventDefault();
    //     const content = this.state.newMessageEntry;
    //     const channelId = this.props.channelId;
    
    //     const thunk = postMessages(content, channelId);
    //     store.dispatch(thunk);
    //   }
  
      
   render() {
       return(
        <form className="form-inline" onSubmit={(event) => event.preventDefault()}> 
            <label htmlFor="name">Your name:</label>
            <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="form-control"
            onChange={e => this.handleChange(e.target.value)}
            />
        </form>
       ) 
   }
}


