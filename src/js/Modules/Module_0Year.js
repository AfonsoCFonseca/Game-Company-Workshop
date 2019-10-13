class Module_0Year extends React.Component {

  constructor( props ){
    super( props )
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
           <Description title='Description ( Optional )'/>
        </InputBlock>

        <TextField title='First Game' textValue={ secondGameDescription }/>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "gameName1", value ) }>
           <Description title='Game Name' />
        </InputBlock>

        <DropdownBlock 
          dataEntries={ genres }
          valueReceived={ value => this.props.editCompanyState( "genres", value ) }>
          <Description title={ 'Genre' } description={ descriptionPlatform }/>
        </DropdownBlock>

        <DropdownBlock 
          dataEntries={ platforms }
          valueReceived={ value => this.props.editCompanyState( "platform", value ) }>
          <Description title={ 'Platform' } />
        </DropdownBlock>

      </div>

    )

  }

}
