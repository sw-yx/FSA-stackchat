import io from 'socket.io-client';
import store, {gotMessagesFromServer, wroteNewMessage, receivedMessage} from './store'


const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-message', (message) => {
    let action = receivedMessage(message);
    store.dispatch(action);
  })

});




export default socket;
