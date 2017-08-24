import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket'


const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WROTE_NEW_MESSAGE = 'WROTE_NEW_MESSAGE';
const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE'; 
const NEW_USER = 'NEW_USER';



export const gotMessagesFromServer = (arr) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: arr
    }
}

export const fetchMessages = () => {
    return (dispatch) => {
      return  axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => {
          // this.setState({ messages })
          let action = gotMessagesFromServer(messages);
          dispatch(action);
       
        //   window.scrollTo(0, document.body.scrollHeight);
        });
    };
}

export const postMessages = (content, channelId) => {
    return (dispatch, getState) => {
      return  axios.post('/api/messages', { content: content, channelId: channelId, name: getState().name })
        .then(res => res.data)
        .then(message => {
          dispatch(receivedMessage(message))
          socket.emit('new-message', message)

          
        });
    };
}

export const wroteNewMessage = (str) => {return {type: WROTE_NEW_MESSAGE, newMessageEntry: str}}
export const receivedMessage = (str) => {return {type: RECEIVED_NEW_MESSAGE, message: str}}
export const newUser = (str) => {return {type: NEW_USER, name: str}}

export const initialState = { 
    messages: [],
    newMessageEntry: '',
    name: ''
}

function reducer (state = initialState, action) {
    switch (action.type) {
      case GOT_MESSAGES_FROM_SERVER:
         return Object.assign({}, state, { messages: action.messages });

    case WROTE_NEW_MESSAGE:
        return Object.assign({}, state, { newMessageEntry: action.newMessageEntry });

    case RECEIVED_NEW_MESSAGE:
        return Object.assign({}, state, { messages: state.messages.concat(action.message), newMessageEntry: ''});
    
    case NEW_USER: 
        return Object.assign({}, state, {name: action.name});
        

      default:
         return state;
    }
  }

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// const store = createStore(reducer, 
    
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
    
    
export default store;