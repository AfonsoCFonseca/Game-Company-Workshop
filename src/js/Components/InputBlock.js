class InputBlock extends React.Component{

  constructor( props ){
    super( props )

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        { this.props.size == null ? 
                  <input onChange={ e => this.props.valueReceived( e.target.value ) } /> :
                  <textarea onChange={ e => this.props.valueReceived( e.target.value ) } /> }
      </div>
    )
  }

}
