import React from 'react';
import { render } from 'react-dom';
import Slick from './components/Slick';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const root = document.getElementById('root');

const settings = {
  slides: 3,
  step: 3,
  timing: 1,
  dots: true,
  dotsNumbered: true,
  buttons: true,
  dotsPosition: 0,
  column: false,
  rows: 1
}
const settings1 = {
  slides: 3,
  step: 4,
  timing: 0.6,
  dots: true,
  dotsNumbered: false,
  dotsPosition: 1,
  buttons: false,
  column: true,
  rows: 4,
  responsive: [
    {
      breakPoint: 600,
      settings: {
        slides: 2,
        step: 2,
        timing: 0.6,
        dots: false,
        dotsNumbered: false,
        dotsPosition: 1,
        buttons: true,
        column: false,
        rows: 2,
      }
    }
  ]
}
const style = {
  rightButtonStyle : {
    backgroundColor: 'red',
    zIndex: '1',
    borderRadius: '100%',
    display: 'inline-block',
    margin: 'auto',
    padding: '0.5em',
    textAlign: 'center',
    textDecoration: 'none',
    border: '0',
    outline: '0',
  },
  leftButtonStyle : {
    backgroundColor: 'red',
    zIndex: '1',
    borderRadius: '100%',
    display: 'inline-block',
    margin: 'auto',
    padding: '0.5em',
    textAlign: 'center',
    textDecoration: 'none',
  },
  dotStyle : {
    backgroundColor: 'blue',
    border: '0'
  }
}
function click(e) {
  num = e.currentTarget.value;
}
var num = 40;
function Card(props) {
  return <div className="h-100 col-12 p-1">
    <div className="bg-primary rounded col-12 h-100 text-white text-center align-items-center">{props.children}</div>
  </div>;
}
class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      num: 3
    }
  }
  click(e) {
    this.setState({num: Number(e.currentTarget.value)});
  }

  render() {
    return(
    <div style={{display:'flex',flexWrap: 'wrap',alignItems:'start',height:'80%'}}>
    <div style={{width:'40%',height:'40%',padding:'1%'}}>
      <Slick settings={settings} style={style}>
          {[...Array(this.state.num).keys()].map((val)=>{
            return (<Card key={val}>{val+1}</Card>)
            })}
      </Slick>
      </div><div style={{width:'40%',height:'100%'}}>
      <Slick settings={settings1}>
        {[...Array(this.state.num).keys()].map((val)=>{
            return (<Card key={val}>{val+1}</Card>)
            })}
      </Slick>
      </div>
      <button value="3" onClick={this.click.bind(this)}>3</button>
      <button value="8" onClick={this.click.bind(this)}>8</button>
      <button value="9" onClick={this.click.bind(this)}>9</button>
      <button value="40" onClick={this.click.bind(this)}>40</button>
    </div>
  )}
}
render(<Main/>, root);
