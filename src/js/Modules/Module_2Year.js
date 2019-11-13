class Module_2Year extends React.Component {

  constructor( props ){
    super( props )

    this.focusDescription = focusDescription[ getRandomInt( 0, 2 ) ]
  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year2", { [name]: value })
  }

  render() {

    return(
      <div className='module'>

        <TextField title='Focus' textValue={ this.focusDescription }/>


        <InputBlock 
          inputTile={ "Developers" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "sentMoneyYear2", value ) }>
           <Description 
              title='Where to spend the money'
              description={ descriptionSpentMoney } />
        </InputBlock>
        <InputBlock 
          inputTile={ "Designers" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
        </InputBlock>
        <InputBlock 
          inputTile={ "SFX Studio" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
        </InputBlock>
        <InputBlock 
          inputTile={ "Marketing" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
        </InputBlock>

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
