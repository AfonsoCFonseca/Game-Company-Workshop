class Footer extends React.Component {

  constructor( props ){
    super( props )
  }



  render(){
    return(
      <div className='footer'>
        <button onClick={ () => this.props.goPrevious( 'previous', null ) }>back</button>
        <button onClick={ this.props.goNext }>next</button>
        <button onClick={ this.props.logState }>Log</button>
        <button onClick={ this.props.pauseState }> Pause</button>
      </div>
    )
  }

}
