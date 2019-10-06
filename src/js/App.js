class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      company: {
        name: ''
      }
    }

    this.goNext = this.goNext.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
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
    console.log( this.state )
    return(
      <React.Fragment>
        <Timer year={ this.state.year }/>
        <div className='structure'>
          {this.renderModule()}
        </div>
        <Footer
          goNext={ this.goNext }
        />
      </React.Fragment>
    )
  }

}
