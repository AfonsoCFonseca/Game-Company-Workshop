class Description extends React.Component{

  constructor( props ){
    super( props )

    this.state = {
      showDescription: false,
    }

    this.expandDiv = this.expandDiv.bind( this )
  }


  expandDiv(){

    this.setState({
      showDescription: !this.state.showDescription
    })

  }

  renderDescriptionDiv(){
    return ( this.props.description == null ? <p>{this.props.title}</p> : 
      <div className="inputDescriptionDiv">
        <p className='withDescriptionTitle'>{this.props.title}</p>
        <i class="fa fa-info-circle" aria-hidden="true" onClick={ this.expandDiv }></i>
        <div className="descriptionInnerChild" style={{display: this.state.showDescription ? 'block' : 'none' }}>
          <p>{this.props.description}</p>
        </div>
      </div>
    )
  }

  render(){

    return(
      <React.Fragment>
        { this.renderDescriptionDiv() }
      </React.Fragment>
    )
  }


}
