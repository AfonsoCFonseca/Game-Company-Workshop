class InputBlock extends React.Component{

  constructor( props ){
    super( props )

    this.onValueChange = this.onValueChange.bind( this )

    this.state = {
      inputValue: props.inputValue,
    }
  }


  static getDerivedStateFromProps( props, state ) {

      return {
          inputValue: props.inputValue
      }
  }


  inputRender(){

    if( this.props.inputTile == null )
      return <input placeholder={ this.props.placeholder } value={ this.state.inputValue } onChange={ this.onValueChange } />
    else{
      return (
        <div className='inputDivInner'>
          <p>{ this.props.inputTile }</p>
          <input
            value={ this.state.inputValue }
            className={ this.props.typeDiv == "small" ? "small" : "" }
            onChange={ this.onValueChange } />
          { this.props.multiplier ? <p className='inputDivInnerPlus'>{ this.state.inputValue * this.props.multiplier } $ x per month</p> : null }
        </div> )
    }

  }

  onValueChange( e ){
    var value = e.target.value

    if( this.props.numbers ){

      if( this.props.limit && value >= 0 && value <= this.props.limit ){
        this.props.valueReceived( value )
      }
      else if( value >= 0 && value <= 4 ){
        this.props.valueReceived( value )
      }
    }
    else this.props.valueReceived( value )

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        { this.props.size == null ?
            this.inputRender() :
            <textarea placeholder={ this.props.placeholder } onChange={ e => this.props.valueReceived( e.target.value ) } /> 
        }
      </div>
    )
  }

}
