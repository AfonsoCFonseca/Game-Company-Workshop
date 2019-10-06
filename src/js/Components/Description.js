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

  render(){

    return(
      <React.Fragment>
        <p>{this.props.title}</p>
        <div className="inputDescriptionDiv" onClick={ this.expandDiv }>
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
          <div className="descriptionInnerChild" style={{display: this.state.showDescription ? 'block' : 'none' }}>
            <p>{this.props.description}</p>
          </div>
        </div>
      </React.Fragment>
    )
  }


}
