(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define('Slick',[],b):'object'==typeof exports?exports.Slick=b():a.Slick=b()})('undefined'==typeof self?this:self,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='./',b(b.s=2)}([function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0});b.container={width:'100%',height:'100%',display:'flex'};b.containerStyle={display:'flex',height:'100%'};b.dotsContainer={height:'100%',display:'inline-flex',justifyContent:'center',flexWrap:'wrap',margin:'auto 0'};b.dotContainer={padding:'0.2em'};b.dotStyle={borderRadius:'100%',border:'0',textAlign:'center'};b.windowStyle={display:'inline-flex',height:'auto',overflow:'hidden',width:'100%',maxWidth:'100%',padding:'0',height:'100%',boxSizing:'content-box'};b.columnStyle={flexWrap:'wrap'};b.slideStyle={display:'inline-flex',width:'100%',justifyContent:'flex-start',height:'100%'};b.buttonStyle={backgroundColor:'red',zIndex:'1',borderRadius:'100%',display:'inline-block',margin:'auto',width:'1.5em',height:'1.5em',textAlign:'center',textDecoration:'none',border:'0',outline:'0'};b.buttonContainer={display:'flex',padding:'0 1%'}},function(a){a.exports=require('react')},function(a,b,c){a.exports=c(3)},function(a,b,c){'use strict';var d=Math.floor;Object.defineProperty(b,'__esModule',{value:!0});var e=c(1),f=c.n(e),g=c(4),h=c.n(g),j=c(0),k=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};class i extends f.a.Component{constructor(a){super(a),this.state={width:0,height:0,slide:0,last:null,settings:this.props.settings},this.children=this.children.bind(this),this.rail=f.a.createRef(),this.dotsContainer=f.a.createRef(),this.container=f.a.createRef(),this.prev=this.prev.bind(this),this.next=this.next.bind(this),this.select=this.select.bind(this),this.dots=this.dots.bind(this),this.refresh=this.refresh.bind(this),this.currentPage=this.currentPage.bind(this),this.customPaging=this.customPaging.bind(this)}componentDidMount(){if(window.addEventListener('resize',this.refresh),this.props.settings.responsive)for(let b=0;b<this.props.settings.responsive.length;b++){var a=this.props.settings.responsive[b];a.breakPoint>window.outerWidth&&this.setState({settings:a.settings})}this.refresh()}componentDidUpdate(){this.state.height!=this.rail.current.offsetHeight&&this.setState({height:this.rail.current.offsetHeight}),this.state.width!=this.rail.current.offsetWidth&&this.setState({width:this.rail.current.offsetWidth});let a;null!=this.props.children&&(a=d((this.props.children.length-this.state.settings.slides*this.state.settings.rows)/this.state.settings.rows),1<this.state.settings.rows&&0==this.state.settings.slides%2&&++a,this.state.settings.column&&(a=d((this.props.children.length-this.state.settings.rows*this.state.settings.slides)/this.state.settings.slides)+1),0>a&&(a=0)),this.state.last!=a&&(this.setState({last:a}),this.props.children.length>this.state.settings.slides&&0<h.a.findDOMNode(this).getElementsByClassName('dot').length&&h.a.findDOMNode(this).getElementsByClassName('dot')[0].classList.add('current'),this.setState({slide:0}))}refresh(){this.setState({last:this.state.last},this.currentPage)}children(){let a=this.state.width/this.state.settings.slides;null==a&&(a=this.state.width/2);var b={justifyContent:'start',alignItems:'center',padding:'auto',height:'100%',margin:'0',transition:'transform '+this.state.settings.timing+'s'};let d={height:'100%',flex:'0 0 '+this.state.width/this.state.settings.slides+'px',width:this.state.width/this.state.settings.slides+'px',maxWidth:this.state.width/this.state.settings.slides+'px',alignItems:'center',display:'flex'},f={height:100/this.state.settings.rows+'%'},c={transform:'translateX('+-this.state.slide*this.state.width/this.state.settings.slides+'px)',height:'100%',maxWidth:a+'px',width:a+'px',flex:'0 0 '+a+'px'};this.state.settings.column&&(c={transform:'translateY('+-this.state.slide*this.state.height/this.state.settings.rows+'px)',height:100/this.state.settings.rows+'%',width:'100%',maxWidth:'100%',flexDirection:'row',display:'flex'});let g=[];if(!(null!=this.props.children))g=Object(e.createElement)('div',null);else if(this.state.settings.column)for(let a,f=0;f<this.props.children.length;f+=this.state.settings.slides){a=[];for(let b,g=f;g<f+this.state.settings.slides;g++)b=this.props.children[g],a.push(Object(e.createElement)('div',{key:f+g,style:d},b));g.push(Object(e.createElement)('div',{key:f,style:k({},b,c)},' ',a,' '))}else for(let a,d=0;d<this.props.children.length;d+=this.state.settings.rows){a=[];for(let b,g=d;g<d+this.state.settings.rows;g++)b=this.props.children[g],a.push(Object(e.createElement)('div',{key:d+g,style:f},b));g.push(Object(e.createElement)('div',{key:d,style:k({},b,c)},' ',a,' '))}return g}customPaging(a){return this.props.customPaging(a,this)}dots(){let a,b=[];try{if(this.props.style.dotStyle.width)var c=this.props.style.dotStyle.width;if(this.props.style.dotStyle.padding)var d=this.props.style.dotStyle.padding}catch(a){var c='1.8em',d='0.5em'}a=this.state.settings.dotsNumbered?{width:c,height:c}:{padding:d};let f=j.dotStyle;if(null!=this.props.style&&(f=this.props.style.dotStyle),null!=this.props.children)for(let c=0;c<this.props.children.length/(this.state.settings.slides*this.state.settings.rows);c++)b.push(Object(e.createElement)('div',{key:c+1,style:this.props.customPaging?this.props.style.dotStyle:j.dotContainer},null==this.props.customPaging?Object(e.createElement)('button',{className:'dot',style:k({},f,a),onClick:(a)=>this.select(a,c)},this.state.settings.dotsNumbered?c+1:''):this.customPaging(c+1)));return 1==b.length?'':b}currentPage(){let a=h.a.findDOMNode(this).getElementsByClassName('current');for(let b=0;b<a.length;b++)a[b].classList.remove('current');let b=h.a.findDOMNode(this).getElementsByClassName('dot')[Math.round(this.state.slide/this.state.settings.slides)];this.state.settings.column&&(b=h.a.findDOMNode(this).getElementsByClassName('dot')[d(this.state.slide/this.state.settings.rows)]),this.state.slide==this.state.last&&(b=h.a.findDOMNode(this).getElementsByClassName('dot')[h.a.findDOMNode(this).getElementsByClassName('dot').length-1]),b&&b.classList.add('current')}next(){if(this.state.settings.column)this.state.slide+this.state.settings.step>this.state.last?this.setState({slide:this.state.last},this.currentPage):this.setState({slide:this.state.slide+this.state.settings.step},this.currentPage);else{let a=this.state.slide+this.state.settings.step>this.state.last?this.state.last-this.state.slide:this.state.settings.step;this.setState({slide:this.state.slide+a},this.currentPage)}}prev(){if(this.state.settings.column)0>this.state.slide-this.state.settings.step?this.setState({slide:0},this.currentPage):this.setState({slide:this.state.slide-this.state.settings.step},this.currentPage);else{let a=0>this.state.slide-this.state.settings.step?this.state.slide:this.state.settings.step;this.setState({slide:this.state.slide-a},this.currentPage)}}select(a,b){let c=h.a.findDOMNode(this).getElementsByClassName('current');for(let d=0;d<c.length;d++)c[d].classList.remove('current');let d=a.target;null==this.props.customPaging?d.classList.add('current'):d.classList.contains('dot')?d.classList.add('current'):d.closest('.dot').classList.add('current'),this.state.settings.column?b*this.state.settings.rows>this.state.last?this.setState({slide:this.state.last}):this.setState({slide:b*this.state.settings.rows}):b*this.state.settings.slides>this.state.last?this.setState({slide:this.state.last}):this.setState({slide:b*this.state.settings.slides})}render(){let a=j.buttonStyle;null!=this.props.style&&(a=this.props.style.rightButtonStyle);let b=j.buttonStyle;null!=this.props.style&&(b=this.props.style.leftButtonStyle);let c=0;null!=this.dotsContainer.current&&(c=this.dotsContainer.current.offsetWidth);let f=0;null!=this.container.current&&(f=this.container.current.offsetWidth),c=d(100-100*(50/f)),this.state.settings.dotsPosition||(c=100);let g=['column','row'];return this.state.settings.dotsPosition&&(g=['row','column']),Object(e.createElement)('div',{ref:this.container,style:k({},j.container,{flexDirection:g[0]})},Object(e.createElement)('div',{style:k({},j.containerStyle,{width:c+'%'})},this.state.settings.buttons?Object(e.createElement)('div',{style:j.buttonContainer},Object(e.createElement)('button',{onClick:this.prev,style:a},'<')):'',Object(e.createElement)('div',{style:j.windowStyle},Object(e.createElement)('div',{ref:this.rail,style:this.state.settings.column?k({},j.columnStyle,j.slideStyle):k({},j.slideStyle)},this.children())),this.state.settings.buttons?Object(e.createElement)('div',{style:j.buttonContainer},Object(e.createElement)('button',{onClick:this.next,style:b},'>')):''),this.state.settings.dots?Object(e.createElement)('div',{ref:this.dotsContainer,style:k({},j.dotsContainer,{flexDirection:g[1]})},this.dots()):'')}}i.defaultProps={settings:{slides:2,step:2,timing:1,dots:!0,dotsNumbered:!0,rows:1}},b['default']=i},function(a){a.exports=require('react-dom')}])});
//# sourceMappingURL=Slick.js.map