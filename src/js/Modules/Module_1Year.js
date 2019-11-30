class Module_1Year extends React.Component {

  constructor( props ){
    super( props )

    this.getRadioTeamValue = this.getRadioTeamValue.bind( this )

    this.focusYear1 = focusYear1[ getRandomInt( 0, focusYear1.length - 1 ) ]

    this.updateToParent = this.updateToParent.bind( this )
  }


  getRadioTeamValue( value ){
    var teamChoice = {}

    if( value.indexOf( 'Developers' ) !== -1 ){
      teamChoice = {
        'developers': 2,
      }
    }
    else{
      teamChoice = {
        'developers': 1,
        'artists': 1,
      }
    }

    this.props.editCompanyState( "team", teamChoice )
    this.props.editCompanyState( 'year1', { "teamChoice": teamChoice } )

  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year1", { [name]: value })
  }

  render() {

    return(
      <div className='module'>
        <TextField title='Your Focus' textValue={ this.focusYear1 }/>

        <TextField title='First Game'/>

        <RadioButtonBlock
            valuesSent={ visionArrayYear1 }
            valueReceived={ value => this.updateToParent( "vision", value ) }>
           <Description title='Vision' description={ vision1YearDescription }/>
        </RadioButtonBlock>

        <InputBlock
          placeholder='Insert game name'
          valueReceived={ value => this.updateToParent( "gameName", value ) }>
          <Description title='Game Name' />
        </InputBlock>

        <DropdownBlock
          dataEntries={ genres }
          placeholder='Pick a genre'
          valueReceived={ value => this.updateToParent( "genres", value ) }>
          <Description title={ 'Genre' }/>
        </DropdownBlock>

        <DropdownBlock
          dataEntries={ platforms }
          placeholder='Pick a platform'
          valueReceived={ value => this.updateToParent( "platform", value ) }>
          <Description title={ 'Platform' } />
        </DropdownBlock>

        <InputBlock
          size='large'
          placeholder="Describe game mechanics, features or Story"
          valueReceived={ value => this.updateToParent( "gameDescription", value ) }>
           <Description title='Features Description' />
        </InputBlock>

        <InputBlock
          size='large'
          placeholder="A funny easter egg, social interactions or unlockables" 
          valueReceived={ value => this.updateToParent( "gameUniqueFeatureyear1", value ) }>
           <Description 
           description={gameUniqueFeatureyear1}
           title='Unique Feature' />
        </InputBlock>

        <TextField title='Team'/>

        <RadioButtonBlock
            valuesSent={ teamArrayYear1 }
            valueReceived={ this.getRadioTeamValue }>
           <Description title='Team' description={ team1YearDescription }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "environment", value ) }>
           <Description title='Company Environment' description={ environment1YearDescription }/>
        </InputBlock>

        <RadioButtonBlock
            valuesSent={ giveRecomendationArr }
            valueReceived={ value => this.updateToParent( "workshop", value ) }>
           <Description title='"WorkShoping"' description={ RadioRecomendationdDescription }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "teamBuilding", value ) }>
           <Description title='Team Building' description={ teamBuilding1YearDescription }/>
        </InputBlock>

      </div>
    )

  }

}
