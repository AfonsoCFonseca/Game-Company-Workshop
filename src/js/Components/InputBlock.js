class InputBlock extends React.Component{

  constructor( props ){
    super( props )

  }

  inputRender(){

    if( this.props.inputTile == null )
      return <input onChange={ e => this.props.valueReceived( e.target.value ) } />
    else{
      return ( 
        <div className='inputDivInner'>
          <p>{ this.props.inputTile }</p>
          <input className={ this.props.typeDiv == "small" ? "small" : "" } onChange={ e => this.props.valueReceived( e.target.value ) } />
        </div> )
    }

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        { this.props.size == null ? 
            this.inputRender() :
            <textarea onChange={ e => this.props.valueReceived( e.target.value ) } /> 
        }
      </div>
    )
  }

}
