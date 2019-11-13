class Module_0Year extends React.Component {

  constructor( props ){
    super( props )

    this.getRadioTeamValue = this.getRadioTeamValue.bind( this )

    this.focusYear0 = focusYear0[ getRandomInt( 0, focusYear0.length - 1 ) ]

    this.updateToParent = this.updateToParent.bind( this )
  }


  getRadioTeamValue( value ){
    let teamChoice = {}

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

    this.props.editCompanyState( 'year0', { "teamChoice": teamChoice } )
    this.props.editCompanyState( "team", teamChoice )
    
  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year0", { [name]: value })
  }

  render() {

    return(
      <div className='module'> 
        <TextField title='Your Focus' textValue={ this.focusYear0 }/>

        <InputBlock 
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
          valueReceived={ value => this.updateToParent( "gameDescription", value ) }>
           <Description title='Description' />
        </InputBlock>

        <RadioButtonBlock 
            valuesSent={ teamArrayYear0 }
            valueReceived={ this.getRadioTeamValue }>
           <Description title='Team' description={ team0YearDescription }/>
        </RadioButtonBlock>

        <InputBlock 
          size='large'
          valueReceived={ value => this.updateToParent( "environment", value ) }>
           <Description title='Company Environment' description={ environment0YearDescription }/>
        </InputBlock>

        <InputBlock 
          size='large'
          valueReceived={ value => this.updateToParent( "teamBuilding", value ) }>
           <Description title='Team Building' description={ teamBuilding0YearDescription }/>
        </InputBlock>

        <RadioButtonBlock 
            valuesSent={ visionArrayYear0 }
            valueReceived={ value => this.updateToParent( "vision", value ) }>
           <Description title='Vision' description={ vision0YearDescription }/>
        </RadioButtonBlock>

      </div>
    )

  }

}
