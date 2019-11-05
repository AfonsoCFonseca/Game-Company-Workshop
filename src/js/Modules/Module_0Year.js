class Module_0Year extends React.Component {

  constructor( props ){
    super( props )

    this.takeInputValueFromRadioButton = this.takeInputValueFromRadioButton.bind( this )
  }


  takeInputValueFromRadioButton( value ){

    if( value.indexOf( 'Developers' ) !== -1 ){
      this.props.editCompanyState( "team", {
        'developers': 2,
      })
    }
    else{
      this.props.editCompanyState( "team", {
        'developers': 1,
        'artists': 1,
      })
    }
    
  }

  render() {

    return(

      <div className='module'>

        <TextField title='Company' textValue={ gameCompanyDescription }/>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "name", value ) }>
           <Description title='Company Name' />
        </InputBlock>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "companyDescription", value ) }
          size='large'>
           <Description title='Description ( Optional )' />
        </InputBlock>

        <RadioButtonBlock 
            valuesSent={ teamArrayYear0 }
            valueReceived={ this.takeInputValueFromRadioButton }>
           <Description title='Team' description={ team0YearDescription }/>
        </RadioButtonBlock>

        <TextField title='First Game' textValue={ firstGameDescription }/>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "gameName1", value ) }>
           <Description title='Game Name' />
        </InputBlock>

        <DropdownBlock 
          dataEntries={ genres }
          placeholder='Pick a genre'
          valueReceived={ value => this.props.editCompanyState( "genres", value ) }>
          <Description title={ 'Genre' } description={ descriptionPlatform }/>
        </DropdownBlock>

        <DropdownBlock 
          dataEntries={ platforms }
          placeholder='Pick a platform'
          valueReceived={ value => this.props.editCompanyState( "platform", value ) }>
          <Description title={ 'Platform' } />
        </DropdownBlock>

      </div>

    )

  }

}
