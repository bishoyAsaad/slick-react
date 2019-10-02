import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as Style from './style.js';
class Slick extends Component {
    constructor(props){
        super(props);
        this.state = {
            width : 0,
            height: 0,
            slide : 0,
            last: null,
            settings:this.props.settings
        }
        this.children = this.children.bind(this);
        this.rail = React.createRef();
        this.dotsContainer = React.createRef();
        this.container = React.createRef();
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.select = this.select.bind(this);
        this.dots = this.dots.bind(this);
        this.refresh = this.refresh.bind(this);
        this.currentPage = this.currentPage.bind(this);
        this.customPaging = this.customPaging.bind(this)
    }
    componentDidMount () {
        window.addEventListener("resize", this.refresh);
        if(this.props.settings.responsive)
            for (let i = 0; i < this.props.settings.responsive.length; i++) {
                var settings = this.props.settings.responsive[i];
                if(settings.breakPoint>window.outerWidth)
                    this.setState({settings:settings.settings})
            }
    }
    componentDidUpdate () {
        if(this.state.height!=this.rail.current.offsetHeight)
            this.setState({height:this.rail.current.offsetHeight})
        if(this.state.width!=this.rail.current.offsetWidth)
            this.setState({width:this.rail.current.offsetWidth})
        let last;
        if(this.props.children!=null)
        {
            last = Math.floor((this.props.children.length - (this.state.settings.slides * this.state.settings.rows)) / this.state.settings.rows);
            if(this.state.settings.rows>1 && this.state.settings.slides%2==0) last = last + 1;
            if(this.state.settings.column) last = Math.floor((this.props.children.length - (this.state.settings.rows*this.state.settings.slides)) / this.state.settings.slides) + 1;
            if(last<0) last = 0;
        }
        if(this.state.last!=last){
            this.setState({last:last});
            if(this.props.children.length>this.state.settings.slides)
                if(ReactDom.findDOMNode(this).getElementsByClassName('dot').length>0)
                    ReactDom.findDOMNode(this).getElementsByClassName('dot')[0].classList.add('current');
            this.setState({slide:0});
        }
    }
    refresh () {
        this.setState({last:this.state.last}, this.currentPage)
    }
    children () {
        let width = this.state.width/this.state.settings.slides;
        if(width==null) width = this.state.width/2;
        var style = {
            justifyContent: 'start',
            alignItems: 'center',
            padding: 'auto',
            height: '100%',
            margin: '0',           
            transition: 'transform ' + this.state.settings.timing + 's',
        }
        let columnChildStyle = {
            height: '100%',
            flex:'0 0 '+ this.state.width/this.state.settings.slides + 'px',
            width: this.state.width/this.state.settings.slides + 'px',
            maxWidth: this.state.width/this.state.settings.slides + 'px'
        }
        let rowChildStyle = {
            height: 100 / this.state.settings.rows + '%',
        }
        let direction = {
            transform : 'translateX('+ -this.state.slide*this.state.width/this.state.settings.slides +'px)',
            height: '100%',
            maxWidth : width + 'px',
            width: width + 'px',
            flex: '0 0 ' + width + 'px',
        }
        if(this.state.settings.column){
            direction = {
                transform : 'translateY('+ -this.state.slide*this.state.height/this.state.settings.rows +'px)',
                height: 100 / this.state.settings.rows + '%',
                width: '100%',
                maxWidth: '100%',
                flexDirection: 'row',
                display: 'flex',
            }
        }
        let children = [];
        if(this.props.children!=null) {
            if(this.state.settings.column) {
                for (let i = 0; i < this.props.children.length; i+=this.state.settings.slides) {
                    let insideChildren = [];
                    for (let c = i; c < i + this.state.settings.slides; c++) {
                        let child = this.props.children[c];
                        insideChildren.push(<div key={i+c} style={columnChildStyle}>{child}</div>)
                    }
                    children.push(<div key={i} style={{...style,...direction}}> {insideChildren} </div>);
                }
            }
            else {
                for (let i = 0; i < this.props.children.length; i+=this.state.settings.rows) {
                    let insideChildren = [];
                    for (let c = i; c < i + this.state.settings.rows; c++) {
                        let child = this.props.children[c];
                        insideChildren.push(<div key={i+c} style={rowChildStyle}>{child}</div>)
                    }
                    children.push(<div key={i} style={{...style,...direction}}> {insideChildren} </div>);
                }
            }
        }
        else children = (<div></div>) ;
        return children;
    }
    customPaging(i) {
        return this.props.customPaging(i,this);
    }
    dots () {
        let dots = [];
        let dotStyle;
        if(this.state.settings.dotsNumbered)
            dotStyle = {
                width: '1.8em',
                height: '1.8em'
            }
        else 
            dotStyle = {
                padding: '0.5em'
            }
        let dotCustomStyle = Style.dotStyle;
        if(this.props.style!=null) dotCustomStyle = this.props.style.dotStyle;
        if(this.props.children!=null){
            for (let i = 0; i < this.props.children.length/(this.state.settings.slides * this.state.settings.rows); i++) {
                dots.push(
                    <div key={i+1} style={this.props.customPaging? this.props.style.dotStyle:Style.dotContainer}>
                        {
                            this.props.customPaging!=null?
                            this.customPaging(i+1)
                            :
                            <button className='dot' style={{...dotCustomStyle, ...dotStyle}} onClick={(event) => this.select(event,i)}>{this.state.settings.dotsNumbered?i+1:''}</button>
                        }
                    </div>
                );
            }
        }
        if(dots.length==1) return '';
        return dots;
    }
    currentPage () {
        let elements = ReactDom.findDOMNode(this).getElementsByClassName('current');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('current');   
        }
        let element = ReactDom.findDOMNode(this).getElementsByClassName('dot')[Math.round(this.state.slide / this.state.settings.slides)];
        if (this.state.settings.column)
        element = ReactDom.findDOMNode(this).getElementsByClassName('dot')[Math.floor(this.state.slide / this.state.settings.rows)];
        if(this.state.slide == this.state.last)
        element = ReactDom.findDOMNode(this).getElementsByClassName('dot')[ReactDom.findDOMNode(this).getElementsByClassName('dot').length - 1];
        console.log(Math.round(this.state.slide / this.state.settings.slides))
        if(element)
        element.classList.add('current');
    }
    next () {
        if(this.state.settings.column){
            if(this.state.slide + this.state.settings.step > this.state.last) {
                this.setState({slide:this.state.last}, this.currentPage);
            }
            else {
                this.setState({slide:this.state.slide + this.state.settings.step}, this.currentPage);
            }
        }
        else {
            let step = (this.state.slide + this.state.settings.step) > this.state.last ? this.state.last - this.state.slide : this.state.settings.step;
            this.setState({slide:this.state.slide + step}, this.currentPage);
        }
    }
    prev () {
        if(this.state.settings.column){
            if(this.state.slide - this.state.settings.step < 0) {
                this.setState({slide:0}, this.currentPage);
            }
            else
                this.setState({slide:this.state.slide - this.state.settings.step}, this.currentPage);
        }
        else {
            let step = (this.state.slide - this.state.settings.step) < 0 ? this.state.slide : this.state.settings.step;
            this.setState({slide:this.state.slide - step}, this.currentPage);
        }
    }
    select (event,i) {
        let elements = ReactDom.findDOMNode(this).getElementsByClassName('current');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('current');
        }
        let element = event.target;
        if(this.props.customPaging!=null) {
            if(element.classList.contains('dot')) element.classList.add('current');
            else element.closest('.dot').classList.add('current');
        }
        else
        element.classList.add('current');
        if(this.state.settings.column){
            if(i*this.state.settings.rows>this.state.last) this.setState({slide:this.state.last});
            else this.setState({slide:i*this.state.settings.rows});
        }
        else {
            if(i*this.state.settings.slides>this.state.last) this.setState({slide:this.state.last});
            else this.setState({slide:i*this.state.settings.slides});
        }
        
    }
    render () {

        let rightButtonStyle = Style.buttonStyle;
        if(this.props.style!=null) rightButtonStyle = this.props.style.rightButtonStyle;
        let leftButtonStyle = Style.buttonStyle;
        if(this.props.style!=null) leftButtonStyle = this.props.style.leftButtonStyle;
        let width = 0;
        if(this.dotsContainer.current!=null) width = this.dotsContainer.current.offsetWidth;
        let containerWidth = 0;
        if(this.container.current!=null) containerWidth = this.container.current.offsetWidth;
        width = Math.floor(100-50/containerWidth*100);
        if(!this.state.settings.dotsPosition) width = 100;
        let direction = ['column','row'];
        if(this.state.settings.dotsPosition) direction = ['row','column'];
        if(this.state.width==0) this.refresh();

        return (
            <div ref = {this.container} style={{...Style.container,flexDirection:direction[0]}}>
                <div style={{...Style.containerStyle,width:width+'%'}}>
                    {this.state.settings.buttons?
                        <div style={Style.buttonContainer}>
                            <button onClick={this.prev} style={rightButtonStyle}>&lt;</button>
                        </div>:''
                    }
                    <div  style={Style.windowStyle}>
                        <div ref = {this.rail} style={this.state.settings.column? {...Style.columnStyle,...Style.slideStyle}:{...Style.slideStyle}}>
                            {this.children()}
                        </div>
                    </div>
                    {this.state.settings.buttons?
                        <div style={Style.buttonContainer}>
                            <button onClick={this.next} style={leftButtonStyle}>&gt;</button>
                        </div>:''
                    }
                </div>
                {this.state.settings.dots?
                <div ref = {this.dotsContainer} style={{...Style.dotsContainer,flexDirection:direction[1]}}>
                    {this.dots()}
                </div> : ''}
            </div>
        )
    }
}

Slick.defaultProps = {
    settings:{
        slides: 2,
        step: 2,
        timing: 1,
        dots: true,
        dotsNumbered: true,
        rows: 1
    }
}

export default Slick