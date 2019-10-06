class Footer extends React.Component {

  constructor( props ){
    super( props )
  }



  render(){
    return(
      <div className='footer'>
        <button onClick={ this.props.goNext }>next</button>
      </div>
    )
  }

}
