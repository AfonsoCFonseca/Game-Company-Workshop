class Module_2Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      <div className='module'>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "sentMoneyYear2", value ) }
          size='large'>
           <Description 
              title='Where to spend the money'
              description={ descriptionSpentMoney } />
        </InputBlock>

        <TextField title='Focus' textValue={ focusDescription }/>

        <TextField title='Second Game' textValue={ secondGameDescription }/>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
           <Description 
              title='Game Title'/>
        </InputBlock>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "gameDescription2", value ) }
          size='large'>
           <Description 
              title='Game genre, style, mechanics'/>
        </InputBlock>

      </div>
    )

  }

}
