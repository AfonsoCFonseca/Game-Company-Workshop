class Timer extends React.Component {
//1800000 30 minutos
  constructor( props ){
    super( props )

    this.timer30Minutes = 6 * 3 //60 * 30
    this.actualTimer = 0

    this.state = {
      year: props.year,
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

            this.actualTimer++;
            this.startTime();
            this.doTheMath()

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
    var valueInPercentage = parseInt( ( this.actualTimer * 100 ) / this.timer30Minutes )

    $('.imageInnerFiller').animate({
        width: valueInPercentage + '%'
    })

    var timerValue = giveMinutesAndSeconds( this.actualTimer )
    this.setState({ timerValue })
  }

  static getDerivedStateFromProps( props, state ) {
    return {
      year: props.year
    }
  }

  drawYearTiles(){

    return(
      <React.Fragment>
        <div className={ `twoYearsBatch ${ (this.state.year >= 2 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 4 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 6 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 8 ? 'filled' : '') }` }></div>
      </React.Fragment>
    )

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
          <div className='imageInnerFiller'>
          </div>
        </div>
        <div className='totalTimer'>
          { this.drawYearTiles() }
        </div>
        <div className='counter'>{ this.state.timerValue }</div>

      </div>
    )
  }

}
