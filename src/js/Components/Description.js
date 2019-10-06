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
    return ( this.props.description == null ? null : 
      <div className="inputDescriptionDiv" onClick={ this.expandDiv }>
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
        <div className="descriptionInnerChild" style={{display: this.state.showDescription ? 'block' : 'none' }}>
          <p>{this.props.description}</p>
        </div>
      </div>
    )
  }

  render(){

    return(
      <React.Fragment>
        <p>{this.props.title}</p>
        { this.renderDescriptionDiv() }
      </React.Fragment>
    )
  }


}
