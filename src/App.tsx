import React from 'react';
import {
  // eslint-disable-next-line
  Treemap
} from 'recharts';

declare var Twitch:any;
import './App.css';
export class App extends React.Component {
  private _ticker: any;
  state = {
    votes:[]
  }
  componentDidMount() {
    if (!this._ticker) {
      this._ticker = setInterval(this.apiCall.bind(this), 500);
    }
    // new Twitch.Embed("twitch-embed", {
    //   width: 854,
    //   height: 480,
    //   channel: "cantwitchreach70"
    // });       <div id="twitch-embed"></div>

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

      // if (data.data.length === this.state.votes.length)
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
      // console.log("RES:", res);
      this.setState({votes:[{children:res}]});
      // let count = [];
      // let res = Object.keys(data).map((key, index) => {})
      // console.log('Success:', data);
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
          dataKey="value"
          isAnimationActive={true}
          aspectRatio={1}
          stroke="#f48c42"
          fill="#130c089e"
        />
      </div>
      </div>
    );
  }
}

export default App;
