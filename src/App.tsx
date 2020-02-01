import React from 'react';
import {
  // eslint-disable-next-line
  Treemap
} from 'recharts';
import './App.css';
export class App extends React.Component {
  private _ticker: any;
  state = {
    votes:[]
  }
  componentDidMount() {
    if (!this._ticker) {
      this._ticker = setInterval(this.apiCall.bind(this), 250);
    }
  }

  componentWillUnmount() {
    if (this._ticker) {
      clearInterval(this._ticker);
    }
  }

  apiCall() {
    fetch('http://localhost:1338/votes')
    .then((response) => response.json())
    .then((data) => {

      let voteOptions: any = {};
      for( var i=0; i < data.data.length; i++ ) {
        let vo = data.data[i];
        if( !voteOptions[vo] ){
            voteOptions[vo] = 1
        } else {
          voteOptions[vo]++;
        }
      }

      let res = Object.keys(voteOptions).map((key, index) => {
        return {name: key, value: voteOptions[key]}
      });
      this.setState({votes: {name:"Votes", children: res}});
      // let count = [];
      // let res = Object.keys(data).map((key, index) => {})
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    const {votes} = this.state;
    return (
      <div className="App">
      <div key="1" className="rechart-container">
      <h5 className="Survey-Description">Next Action</h5>
        <Treemap
          width={730}
          height={250}
          data={votes}
          dataKey="Value"
          isAnimationActive={false}
          aspectRatio={1}
          stroke="#f48c42"
          fill="#4a4440"
        />
      </div>
      </div>
    );
  }
}

export default App;
