class Module_2Year extends React.Component {

  constructor( props ){
    super( props )

    this.focusPos = getRandomInt( 0, 2 )
    this.focusDescription = focusDescription[ this.focusPos ]
    this.dropdownGenre = null
    if( this.focusPos == 0 ) // 1 simiulation
      this.dropdownGenre = "Simulation"
    else if( this.focusPos == 1 )// 2 RTS
       this.dropdownGenre = "Real-time strategy (RTS)"


    this.getRadioOffice = this.getRadioOffice.bind( this )
    this.joinMembersTeam = this.joinMembersTeam.bind( this )
    
    var developers, artists
    if( props.company.team ){
      developers = props.company.team.developers 
      artists = props.company.team.artists 
    }

    this.getDescriptionYear2 = getDescriptionYear2( props.company.vision )

    
    this.state = {
      team: {
        developers: developers || 0,
        artists: artists || 0,
        designers: 0,
        sfx: 0,
        marketing: 0,
      },
      descriptionForUnfocusTeam: null,
    }
  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year2", { [name]: value })
  }

  getRadioOffice( value ){
    var descriptionForUnfocusTeam = getDescriptionUnfocusTeam( value )

    this.setState( {descriptionForUnfocusTeam })
    this.updateToParent( "officeChoice", value )

  }

  joinMembersTeam( value, depart ){
    var team = this.state.team
    team[depart] = value 
    this.setState({ team })
    this.props.editCompanyState( "team", team )
  }



  render() {

    return(
      <div className='module'>

        <TextField title='Focus' textValue={ this.focusDescription }/>

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
          valueReceived={ value => this.updateToParent( "biggerTeam", value ) }>
           <Description 
              title='Bigger Team'
              description={ biggerTeamYear2Description } />
        </InputBlock>

        <InputBlock 
          size='large'
          valueReceived={ value => this.updateToParent( "unfocusTeam", value ) }>
           <Description 
              title='Unfocused Team'
              description={ this.state.descriptionForUnfocusTeam }/>
        </InputBlock>

        <TextField title='Second Game' textValue={ this.getDescriptionYear2 }/>

        <RadioButtonBlock 
            valuesSent={ sequelGameArrayYear2 }
            valueReceived={ value => this.updateToParent({ "sequel": value }) }>
           <Description title='What will you pick?'/>
        </RadioButtonBlock>

        <InputBlock 
          valueReceived={ value => this.updateToParent( "gameNameYear2", value ) }>
          <Description title='Game Name' />
        </InputBlock>

        <DropdownBlock 
          dataEntries={ genres }
          locked={ this.dropdownGenre }
          placeholder='Pick a genre'
          valueReceived={ value => this.updateToParent( "genres", value ) }>
          <Description title={ 'Genre' }/>
        </DropdownBlock>

        <DropdownBlock 
          dataEntries={ platforms }
          placeholder='Pick a platform'
          valueReceived={ value => this.updateToParent( "platformYear2", value ) }>
          <Description title={ 'Platform' } />
        </DropdownBlock>

        <InputBlock 
          size='large'
          valueReceived={ value => this.updateToParent( "gameDescriptionyear2", value ) }>
           <Description title='Game Mechanics, Features or Story' />
        </InputBlock>

      </div>
    )

  }

}
