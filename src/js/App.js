class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.backup = null

    this.state = {
      year: 2,
      goingDev: true,
      isPaused: false,
      moduleShow: false,  // Ecra de Eventos
      optionalScreen: false, // Ecra de entrada e final
      middleEvent: false, // Trigger para o middle Event
      recapEvent: false, // Recap Event após o modulo final
      company: {
        name: '',
        income: 2500,
        equity: 100,
        team: null,
        year1:{
          middleEvent: null,
        },
        year2:{
          middleEvent: null,
        },
        year3:{
          middleEvent: null,
        }
      },
      bill: {},
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
    this.exportToImage = this.exportToImage.bind( this )
    this.startCompany = this.startCompany.bind( this )
    this.recapTheYear = this.recapTheYear.bind( this )
    this.changeOfLastYear = this.changeOfLastYear.bind( this )
    this.startDoingBackups = this.startDoingBackups.bind( this )

  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown )

    this.backup = new Backup( this.state );
    this.startDoingBackups()
  }

  startDoingBackups(){
    var timer = 60000 //minute
    //var timer = 300000 //5 minutes
    //var timer = 6000 //6 seconds

    setInterval( _ => {
      console.log( "Doing backup... ")
      this.backup.addBackUp( this.state )
    }, timer )
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
        case B_KEY:
          this.setState({ goingDev: !this.state.goingDev })
          break;
        default:
      /*    if( key == this ) B_KEY.setState({ goingDev: !this.state.goingDev })*/
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

  changeYear( type, toSendBack ){

    let year = this.state.year
    let nextYear
    let optionalScreen = false

    if( type == "next" ){
      if( year <= 2 ){
        nextYear = this.state.year + 1
      }
      else {
        nextYear = 2
        optionalScreen = true
      }
    }
    else if( type == "previous")
      nextYear = ( year > 0 ? this.state.year - 1 : 0 )

    if( toSendBack ) this.changeOfLastYear( toSendBack )

    this.setState({
      year: nextYear,
      isPaused: false,
      moduleShow: false,
      recapEvent: false,
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

    actualState = objInsideChecker( actualState, name, value )
    this.setState( actualState )
  }

  editCompanyState( name, value ){
    var company = this.state.company || {}
    var replace = name == "team" ? true : false 
    company = objInsideChecker( company, name, value, replace )
    this.setState({ company })
  }

  renderStoryModal( ){

    var { title, description, buttons } = createStory( this.state, this )
    if( !buttons ) buttons = <button onClick={ ( ) => this.changeYear( "next", null ) }>Confirm</button>

    return (
      <Modal
        title={title}
        description={description}>
        { buttons }
      </Modal>
    )

  }

  changeOfLastYear( toSendBack ){
    switch( this.state.year ){
      case 1:
        this.editCompanyState( "vision", toSendBack.vision )
        this.editCompanyState( "income", toSendBack.finalTotal )
        var bill = this.state.bill
        bill.year1 = toSendBack.bill
        this.setState({ bill })
        if( toSendBack.developerLeft == true ){
          var team = this.state.company.team
          team.developers -= 1
          this.editCompanyState( "team", team )
        }
        break;
      case 2:
        this.editCompanyState( "income", toSendBack.finalTotal )
        this.editCompanyState( "equity", toSendBack.equity )
        var bill = this.state.bill
        bill.year2 = toSendBack.bill
        this.setState({ bill })
        break;
      case 3:
        this.editCompanyState( "income", toSendBack.finalTotal )
        var bill = this.state.bill
        bill.year3 = toSendBack.bill
        this.setState({ bill })
        break;
      default: console.log( "failed year")
    }

  }

///////RECAP SCREEN
  recapTheYear( recapOfYearText, year ){
    this.setState({ recapEvent: true })
    this.editCompanyState( 'year' + year , { "recapOfYearText": recapOfYearText } )
  }

///////STARTING APP

 startCompany( title, description ){
  this.setState({
    optionalScreen: false
  })
  this.editCompanyState( "name", title )
  this.editCompanyState( "description", description )
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
    this.editCompanyState( eventName, eventToUpdate )

     this.setState({
      middleEvent: false,
      isPaused: false,
      moduleShow: false,
    })
  }

///////RENDER MODULE
  exportToImage(){

  var node = document.getElementById('endingCard-overview');

  domtoimage.toPng(node)
    .then(function (dataUrl) {
        download( dataUrl, "dlDataUrlBin.jpeg", "image/jpeg");
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

  }

///////RENDER MODULE
  renderModule(){

    if( this.state.optionalScreen == true ){
      if( this.state.year == 2 ){
         return <EndingCard
          sendEverything={ this.state }
          exportToImage={ this.exportToImage } />
      }
      else{
         return <BeginningCard
          goNext={ this.startCompany } />
      }

    }

    switch ( this.state.year ) {
      case 1:
        return <Module_1Year editGeneralState={ this.editGeneralState }
          editCompanyState={ this.editCompanyState } />
        break;
      case 2:
        return <Module_2Year editGeneralState={ this.editGeneralState }
          company={ this.state.company }
          editCompanyState={ this.editCompanyState } />
        break;
      case 3:
        return <Module_3Year editGeneralState={ this.editGeneralState }
          company={ this.state.company }
          editCompanyState={ this.editCompanyState }/>
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
            logState={ () => console.log( this.state ) }
            pauseState= { this.stopTime }
            goPrevious={ this.changeYear }
            backup={ () => this.backup.getLastBackup() }
          /> :
          null
        }
      </React.Fragment>
    )
  }

}
