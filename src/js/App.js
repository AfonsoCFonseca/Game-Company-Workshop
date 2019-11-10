class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      goingDev: true,
      isPaused: false,
      moduleShow: false,
      optionalScreen: true,
      middleEvent: false,
      company: {
        name: '',
        income: 2500,
        equity: 100,
        team: null,
      },
      year0:{
        middleEvent: null,
      }
    }

    this.prepareNextYear = this.prepareNextYear.bind( this )
    this.changeYear = this.changeYear.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
    this._handleKeyDown = this._handleKeyDown.bind( this )
    this.stopTime = this.stopTime.bind( this )
    this.updateCompanyNumberValues = this.updateCompanyNumberValues.bind( this )
    this.renderMiddleYearModal = this.renderMiddleYearModal.bind( this )
    this.editGeneralState = this.editGeneralState.bind( this )
    this.closeMiddleEvent = this.closeMiddleEvent.bind( this )
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown )
  }

  _handleKeyDown ( ev ) {

    const CONTROL_KEY = 17;
    const SHIFT_KEY = 16;
    const B_KEY = 66;
    var key;
    var isShift;

    if (window.event) {
      key = window.event.keyCode;
      isShift = !!window.event.shiftKey;
    } else {
      key = ev.which;
      isShift = !!ev.shiftKey;
    }
    if ( isShift ) {
      switch (key) {
        case 16:
          break;
        default:
          if( key == this ) B_KEY.setState({ goingDev: !this.state.goingDev })
          break;
      }
    }

  }

  prepareNextYear(){
    let year = this.state.year

    this.setState({
      moduleShow: true,
      isPaused: true,
    })

  }

  changeYear( type ){

    let year = this.state.year
    let nextYear
    let optionalScreen = false

    if( type == "next" ){
      if( year < 4 ){
        nextYear = this.state.year + 2
      }
      else {
        nextYear = 4
        optionalScreen = true
      }
    }
    else if( type == "previous")
      nextYear = ( year > 0 ? this.state.year - 2 : 0 )

    this.setState({
      year: nextYear,
      isPaused: false,
      moduleShow: false,
      optionalScreen
    })

  }

  stopTime(){
    this.setState({isPaused: !this.state.isPaused})
  }

  updateCompanyNumberValues( name, value ){
    var newValue = this.state.company[name] + value

    this.editCompanyState( name, newValue )
  }

  editGeneralState( name, value ){
    var actualState = this.state
    actualState[ name ] = value

    this.setState( actualState )
  }

  editCompanyState( name, value ){
    var company = {}
    if( this.state.company != null ){
      company = this.state.company
    }

    company[ name ] = value

    this.setState({ company })
  }

  renderStoryModal( ){

    var { title, description, buttons } = createStory( this.state, this )
    if( !buttons ) buttons = <button onClick={ this.changeYear( "next" ) }>Confirm</button>

    return (
      <Modal
        title={title}
        description={description}>
        { buttons }
      </Modal>
    )

  }

///////MIDDLE EVENT
  renderMiddleYearModal( ){
      this.setState({
        middleEvent: true,
        moduleShow: true,
        isPaused: true,
      })
  }

  closeMiddleEvent( eventName, eventToUpdate ){
    this.editGeneralState( eventName, eventToUpdate )

     this.setState({
      middleEvent: false,
      isPaused: false,
      moduleShow: false,
    })
  }

///////RENDER MODULE
  renderModule(){

    if( this.state.optionalScreen == true ){
      if( this.state.year == 4 ){
         return <ClosingCard 
          goNext={ () => this.setState({ optionalScreen: false }) } 
          title='Closing'/>
      }
      else{
         return <BeginningCard 
          goNext={ () => this.setState({ optionalScreen: false }) } 
          title='Company Form'/>
      }

    }

    switch ( this.state.year ) {
      case 0:
        return <Module_0Year editCompanyState={ this.editCompanyState } />
        break;
      case 2:
        return <Module_2Year editCompanyState={ this.editCompanyState } />
        break;
      case 4:
        return <Module_4Year editCompanyState={ this.editCompanyState }/>
        break;
      default:
        console.log( "retornou null" )
        return null;

    }

  }

  render(){

    return(
      <React.Fragment>
        { !this.state.optionalScreen ? <Toolbar company={ this.state.company } /> : null }
        { !this.state.optionalScreen ? <Timer
          year={ this.state.year }
          nextYear={ this.prepareNextYear }
          isTimerPaused={ this.state.isPaused }
          middleEventTrigger={ this.renderMiddleYearModal }
        /> : null }

        { this.state.moduleShow ? this.renderStoryModal() : null }

        <div className='structure'>
          {this.renderModule()}
        </div>
        {
         this.state.goingDev ?
          <Footer
            goNext={ this.prepareNextYear }
            logState={ console.log( this.state ) }
            pauseState= { this.stopTime }
            goPrevious={ this.changeYear }
          /> :
          null
        }
      </React.Fragment>
    )
  }

}
