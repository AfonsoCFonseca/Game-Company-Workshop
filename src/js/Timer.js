class Timer extends React.Component {
//1800000 30 minutos
  constructor( props ){
    super( props )

    this.timer30Minutes = 6 * 3 //60 * 30
    this.actualTimer = 0
    // 20 80
    this.middleYearEvent = getRandomInt( (this.timer30Minutes/ 2) - 2 , (this.timer30Minutes/ 2) + 5 )

    this.state = {
      year: props.year,
      isTimerPaused: false,
    }

    this.startTime = this.startTime.bind( this )
    this.doTheMath = this.doTheMath.bind( this )
    this.drawYearTiles = this.drawYearTiles.bind( this )
  }

  componentDidMount(){
    this.startTime()
  }

  startTime(){

     if ( this.actualTimer < this.timer30Minutes ) {

        setTimeout( () => {

          if( this.state.isTimerPaused == false ){
            this.actualTimer++;
            this.doTheMath()
          }
           this.startTime();

        }, 1000);

    }
    else this.resetTimer()

  }

  resetTimer(){

    this.actualTimer = 0
    this.props.nextYear()
    this.startTime()

  }

  doTheMath(){
    let valueInPercentage = parseInt( ( this.actualTimer * 100 ) / this.timer30Minutes )
    let isTimerPaused = false

    $('.imageInnerFiller').animate({
        width: valueInPercentage + '%'
    })

    if( this.middleYearEvent == this.actualTimer ){
      this.props.middleEventTrigger()
    }

    var timerValue = giveMinutesAndSeconds( this.actualTimer )
    this.setState({ 
      timerValue,
    })
  }

  static getDerivedStateFromProps( props, state ) {
    return {
      year: props.year,
      isTimerPaused: props.isTimerPaused,
    }
  }

  drawYearTiles(){

    return(
      <React.Fragment>
        <div className={ `twoYearsBatch ${ (this.state.year >= 1 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 2 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 3 ? 'filled' : '') }` }></div>
      </React.Fragment>
    )

  }

  render(){
    return(
      <div className='timer'>

        <div className='title'> { this.state.year }º Year of your Company</div>

        <div className='imageCounter'>
          <div className='imageInnerObject'>
            <div className='firstStep'>
            </div>

          </div>
          <div className='imageInnerFiller'>
          </div>
        </div>
        <div className='totalTimer'>
          { this.drawYearTiles() }
        </div>
        <div className='counter'>{ ( this.state.timerValue || "00:00" ) }</div>

      </div>
    )
  }

}
