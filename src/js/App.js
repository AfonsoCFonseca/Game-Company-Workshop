class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      goingDev: true,
      isPaused: true,
      moduleShow: false,
      company: {
        name: '',
        income: 0,
        equity: 100,
        team: null,
      }
    }

    this.prepareNextYear = this.prepareNextYear.bind( this )
    this.changeYear = this.changeYear.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
    this._handleKeyDown = this._handleKeyDown.bind( this )
    this.stopTime = this.stopTime.bind( this )
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
          if( key == B_KEY ) this.setState({ goingDev: !this.state.goingDev })
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

  changeYear(){
    let year = this.state.year

    this.setState({
      year: ( year < 6 ? this.state.year + 2 : 6 ),
      isPaused: false,
      moduleShow: false,
    })

  }
  

  stopTime(){
    console.log("||PAUSED||")
    this.setState({isPaused: !this.state.isPaused})
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

    var { title, description } = createStory( this.state )
    return ( 
      <Modal 
        numberButtons='2'
        title={title}
        description={description}>
        <button onClick={ this.changeYear }>Confirm</button>
      </Modal>
    )

  }

  renderModule(){

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
      case 6:
        return <Module_6Year editCompanyState={ this.editCompanyState }/>
        break;
      default:
        console.log( "retornou null" )
        return null;

    }

  }

  render(){
  
    return(
      <React.Fragment>
        <Toolbar 
          company={ this.state.company } 
        />

        <Timer 
          year={ this.state.year }
          nextYear={ this.prepareNextYear }
          isTimerPaused={ this.state.isPaused }
        />

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
          /> :
            null 
        }
      </React.Fragment>
    )
  }

}
