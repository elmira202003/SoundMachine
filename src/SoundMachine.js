import React , {Component} from 'react';

const data=[
        {id:'Beep' , letter: 'Q' , src:'http://www.downloadfreesound.com/wp-content/uploads/2013/08/Blip_6.wav'},
        {id:'Alert Beep' , letter: 'W' , src:'http://www.downloadfreesound.com/wp-content/uploads/2013/08/Beep_7.wav'},
        {id:'Click' , letter: 'E' , src:'http://orteil.dashnet.org/cookieclicker/snd/click6.mp3'},
        {id:'Wrong Answer' , letter: 'A' , src:'http://www.superluigibros.com/downloads/sounds/SNES/SMRPG/wav/smrpg_wrong.wav'},
        {id:'Error' , letter: 'S' , src:'http://bheltborg.dk/Windows/Media/Speech%20Misrecognition.wav'},
        {id:'Nokia tone' , letter: 'D' , src:'http://onj3.andrelouis.com/phonetones/unzipped/Nokia/C6-00/error_tone.wav'},
        {id:'Iphone tone' , letter: 'Z' , src:'http://onj3.andrelouis.com/phonetones/unzipped/Apple-iPhone3GS/UISounds/wav/SIMToolkitNegativeACK.wav'},
        {id:'Push Button' , letter: 'X' , src:'http://www.cs.tlu.ee/~rinde/media/soundid/klipid/nupp_alla_01_01.mp3'},
        {id:'Alert Button' , letter: 'C' , src:'http://www.utc.fr/si28/ProjetsUpload/P2006_si28p004/flash_puzzle/sons/rush/tap7.wav'}
]

const onStyle = {transform: "scale(0.95)", boxShadow: "1px 1px 4px 4px cyan, -1px -1px 4px 4px cyan"};
const offStyle = {transform: "scale(1)", boxShadow: "none"};

class SoundPad extends Component {
    constructor(props){
        super(props);
        this.state={
            playing: false
        }
    }

    componentDidMount(){
        document.addEventListener('keydown' , this.handlekeyDown);
        window.focus();
    }

    componentWillUnmount(){
        document.removeEventListener('keydown' , this.handlekeyDown);
    }

    handlePlay= ()=>{
      this.audio.play();
      this.audio.volume = this.props.volume;
      this.audio.currentTime = 0;
      this.props.updateDisplay(this.props.id);
      this.setState({playing: true});
      setTimeout(() => {
        this.setState({playing: false})
                     }, 100);
    }

    handlekeyDown = e =>{
      if(this.props.power){
        if(e.keyCode === this.props.letter.charCodeAt() ){
          this.handlePlay();
        }
      }  
    }
    
    handleClick = ()=>{
      if(this.props.power){
        this.handlePlay();
      }
    }

    render(){

      const style = !this.props.power ? {background: '#476b68'} : this.state.playing ? onStyle : offStyle;
        
      return(
          <div>
            <button style={style}
              className='sound-pad' 
              id={this.props.id}
              onClick={this.handleClick}
            >
              <h1>
                {this.props.letter}
              </h1>
              <audio className='clip' 
                ref={ref => this.audio= ref}
                src={this.props.src} 
                id={this.props.letter}> 
              </audio>
            </button>
          </div>
      )
    }
}

class SidePanel extends React.Component {
    constructor(props){
      super(props);
    }
    
    render () {
      
      const style = this.props.power ? {background: "#0ad82c"} : {background: "#063d0f", boxShadow: "none"};
      
      return (
        <div className="side-panel">
          <div className="label">Sound Machine </div>
          <div style={this.props.colorStyle} className="displayy" id="displayy">{this.props.currentSound}</div>
          <div>
            <p>Power</p>
            <button style={style} onClick={this.props.togglePower}></button>
          </div>
          <div>
            <p>Volume</p>
            <input value={this.props.volumeInput} 
                   type="range"
                   min="1" 
                   max="100" 
                   onChange={this.props.changeVolume}>
            </input>
          </div>
          <div className="speakers">
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
          </div>
        </div>
      )
    } 
}

class SoundMachine extends Component {
    constructor(props){
      super(props);
      this.state={        
        currentSound: 'Click or Press key!',
        power: true,
        volumeInput: 50,
        volume: 0.5
      }
      this.updateDisplay = this.updateDisplay.bind(this);
      this.togglePower = this.togglePower.bind(this);
      this.changeVolume = this.changeVolume.bind(this);
    }

    updateDisplay (id) {
      this.setState({currentSound: id});
    }
  
    togglePower () {
      const message = !this.state.power && 'Welcome';
      this.setState({power: !this.state.power, 
                   currentSound: message});
      setTimeout(()=> {
        this.setState({ currentSound: ''});
                      }, 1500);
    }
  
    changeVolume (e) {
      const volume = e.target.value / 100;
      const message = "Volume: " + e.target.value;
      this.setState({volume: volume, 
                   volumeInput: e.target.value,
                   currentSound: message})
    }

    render(){

        const colorStyle = this.state.power ? {background: '#1ec8ce'} : {background: '#476b68'};
        
        return(
          <div id='sound-machine'>    
            <div id='sound-pads'>
              {data.map((d , i) => (
                <SoundPad
                  key={i}
                  id={d.id}
                  letter={d.letter}
                  src={d.src}
                  updateDisplay={this.updateDisplay}
                  power= {this.state.power}
                  volume={this.state.volume}
                />
              ))}
            </div>
            <SidePanel volumeInput={this.state.volumeInput}
              volume= {this.state.volume}
              togglePower={this.togglePower}
              changeVolume={this.changeVolume}
              currentSound={this.state.currentSound}   
              power={this.state.power}
              colorStyle={colorStyle}
            />
          </div>
        )
    }
} 

export default SoundMachine;
