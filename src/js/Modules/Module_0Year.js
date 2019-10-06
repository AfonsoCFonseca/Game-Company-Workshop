class Module_0Year extends React.Component {

  constructor( props ){
    super( props )

  }

  render() {

    return(

      <div className='module'>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "name", value ) }>
           <Description title='Company Name' />
        </InputBlock>
        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "companyDescription", value ) }
          size='large'>
           <Description title='Description ( Optional )'/>
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
