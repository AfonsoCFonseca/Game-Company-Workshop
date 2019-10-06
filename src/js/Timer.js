class Timer extends React.Component {
//1800000 30 minutos
  constructor( props ){
    super( props )

    this.timer30Minutes = 60 * 30
    this.actualTimer = 0

    this.state = {
      year: props.year,
      progress: 10,
    }

    this.incr = this.incr.bind( this )
    this.startTime = this.startTime.bind( this )
  }

  componentDidMount(){
    this.incr()
    this.startTime()
  }

  startTime(){

console.log(  this.actualTimer )
console.log(  this.timer30Minutes )
     if ( this.actualTimer < this.timer30Minutes) {
        setInterval(() => {
            this.actualTimer++;
            console.log("A PASSAR AQUI")
            this.startTime();

        }, 1000);
    }


  }

  resetTimer(){

  }

  incr(){
    setTimeout(() => {
      this.setState({
        progress: ( this.state.progress < 100 ? this.state.progress + 2 : 100 )
      })
      this.incr()
    }, 2000 )
  }

  static getDerivedStateFromProps(props, state) {
    return {
      year: props.year
    }
  }

  render(){
    return(
      <div className='timer'>

        <div className='title'>Year { this.state.year } of your Company</div>

        <div className='imageCounter'>
          <div className='imageInnerObject'>
            <div className='firstStep'>
            </div>

          </div>
          <div className='imageInnerFiller' style={{ width: this.state.progress + "%" }}>
          </div>
        </div>

        <div className='counter'>10:10</div>

      </div>
    )
  }

}
