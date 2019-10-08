class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      goingDev: true,
      company: {
        name: ''
      }
    }

    this.goNext = this.goNext.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
    this._handleKeyDown = this._handleKeyDown.bind( this )
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



  goNext(){
    let year = this.state.year

    this.setState({
      year: ( year < 6 ? this.state.year + 2 : 6 )
    })
  }

  editCompanyState( name, value ){
    this.setState({
      'company' : {
        [ name ] : value
      }
    })
  }

  renderModule(){

    switch ( this.state.year ) {
      case 0:
        return <Module_0Year editCompanyState={ this.editCompanyState } />
        break;
      case 2:
        return <Module_2Year/>
        break;
      case 4:
        return <Module_4Year/>
        break;
      case 6:
        return <Module_6Year/>
        break;
      default:
      console.log( "retornou null" )
        return null;

    }

  }

  render(){
  
    return(
      <React.Fragment>
        <Timer 
          year={ this.state.year }
          nextYear={ this.goNext }
        />
        <div className='structure'>
          {this.renderModule()}
        </div>
        {
         this.state.goingDev ? 
          <Footer
            goNext={ this.goNext }
            logState={ () => console.log( this.state ) }
          /> :
            null 
        }
      </React.Fragment>
    )
  }

}
