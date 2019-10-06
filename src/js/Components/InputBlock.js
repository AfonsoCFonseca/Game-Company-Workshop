class InputBlock extends React.Component{

  constructor( props ){
    super( props )

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        <input onValue={ e => console.log( e )}></input>
      </div>
    )
  }

}
