class Module_2Year extends React.Component {

  constructor( props ){
    super( props )

    this.focusDescription = focusDescription[ getRandomInt( 0, 2 ) ]

    this.getRadioOffice = this.getRadioOffice.bind( this )
    this.figureConditionsForGenres = this.figureConditionsForGenres.bind( this )
    this.getRadioSequel = this.getRadioSequel.bind( this )
    this.joinMembersTeam = this.joinMembersTeam.bind( this )
    
    var developers, artists
    if( props.company.team ){
      developers = props.company.team.developers 
      artists = props.company.team.artists 
    }
    
    this.state = {
      team: {
        developers: developers || 0,
        artists: artists || 0,
        designers: 0,
        sfx: 0,
        marketing: 0,
      }
    }
  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year2", { [name]: value })
  }

  getRadioOffice( value ){
    console.log( value )
  }

  getRadioSequel( value ){

  }

  joinMembersTeam( value, depart ){
    var team = this.state.team
    team[depart] = value 
    this.setState({ team })
   // this.props.editCompanyState( "gameTitle2", value )
  }

  figureConditionsForGenres(){
    return (
      <DropdownBlock 
          dataEntries={ genres }
          placeholder='Pick a genre'
          valueReceived={ value => this.updateToParent( "genres", value ) }>
          <Description title={ 'Genre' }/>
      </DropdownBlock>
    )
  }

  render() {

    return(
      <div className='module'>

        <TextField title='Focus' textValue={ this.focusDescription }/>

        /*Impacto mais dinheiro*/
        <RadioButtonBlock 
            valuesSent={ officeSpaceArrayYear2 }
            valueReceived={ this.getRadioOffice }>
           <Description title='Office' description={ officeSpaceYear2Description }/>
        </RadioButtonBlock>

        <InputBlock 
          inputTile={ "Developers" }
          typeDiv={'small'}
          numbers={true}
          multiplier={1000}
          inputValue={ this.state.team.developers }
          valueReceived={ value =>  this.joinMembersTeam( value, "developers") }>
           <Description 
              title='Where to spend the money'
              description={ descriptionSpentMoney } />
        </InputBlock>
        <InputBlock 
          inputTile={ "Artists" }
          typeDiv={'small'}
          numbers={true}
          multiplier={900}
          inputValue={ this.state.team.artists }
          valueReceived={ value =>  this.joinMembersTeam( value, "artists") }>
        </InputBlock>
        <InputBlock 
          inputTile={ "Designers" }
          typeDiv={'small'}
          numbers={true}
          multiplier={900}
          inputValue={ this.state.team.designers }
          valueReceived={ value =>  this.joinMembersTeam( value, "designers") }>
        </InputBlock>
        <InputBlock 
          inputTile={ "SFX Studio" }
          typeDiv={'small'}
          numbers={true}
          multiplier={800}
          inputValue={ this.state.team.sfx }
          valueReceived={ value =>  this.joinMembersTeam( value, "sfx") }>
        </InputBlock>
        <InputBlock 
          inputTile={ "Marketing" }
          typeDiv={'small'}
          numbers={true}
          multiplier={850}
          inputValue={ this.state.team.marketing }
          valueReceived={ value =>  this.joinMembersTeam( value, "marketing") }>
        </InputBlock>

        <InputBlock 
          size='large'
          valueReceived={ value => this.props.editCompanyState( "biggerTeam", value ) }>
           <Description 
              title='Bigger Team'
              description={ biggerTeamYear2Description } />
        </InputBlock>

        /*Influenciado*/
        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "unfocusTeam", value ) }>
           <Description 
              title='Unfocused Team'/>
        </InputBlock>

        <TextField title='Second Game' textValue={ secondGameDescription }/>

        <RadioButtonBlock 
            valuesSent={ sequelGameArrayYear2 }
            valueReceived={ this.getRadioSequel }>
           <Description title='What will you pick?'/>
        </RadioButtonBlock>

        <InputBlock 
          valueReceived={ value => this.updateToParent( "gameName", value ) }>
          <Description title='Game Name' />
        </InputBlock>

        { this.figureConditionsForGenres() }

        <InputBlock 
          size='large'
          valueReceived={ value => this.updateToParent( "gameDescription", value ) }>
           <Description title='Description' />
        </InputBlock>

      </div>
    )

  }

}
