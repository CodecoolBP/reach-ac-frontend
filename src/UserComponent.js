import React from 'react';

class UserComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    setupWebSocket() {
        let webSocketInstance = this;
        let ws = new WebSocket('ws://localhost:8080/user');
        ws.onerror = function (event) {
            console.log('error!');
            console.log(event)
        };
        ws.onopen = function (event) {
            console.log('onopen!');
        };
        ws.onmessage = function (event) {
            console.log('onmessage!');
            webSocketInstance.handleData(event.data)
        };
        ws.onclose = function (event) {
            console.log('onclose');
            setTimeout(webSocketInstance.setupWebSocket, 1000);
        };
    }

    handleData(data) {
        console.log(data);
        let result = JSON.parse(data);
        this.state.users.push(result);
        // this.setState({users: result});
    }

    render() {
        this.setupWebSocket();
        return (
            <div>
                <div>{
                    this.state.users.toString()
                }</div>
            </div>
        );
    }
}

export default UserComponent;
