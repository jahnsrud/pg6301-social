import React from 'react';
import Timeline from "./components/Timeline";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            welcome: "..."
        }
    }

    render() {
        return (
            <div>
                <p>Server says: {this.state.welcome}</p>
                <Timeline/>

            </div>
        );
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({welcome: res.express}))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch("/api/welcome");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }


        return body;

    };

}

export default App;