class DropdownBlock extends React.Component{

  constructor( props ){
    super( props )
  }

  renderOption(){

    let options = this.props.dataEntries.map( entry => {
      return ( <option key={`dataEntry_${entry}`}>{entry}</option> )
    })

    return options

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        <select 
          className="dropdownList"
          onChange={ event  => this.props.valueReceived( event.target.value )} >
          {this.renderOption()}
        </select>
      </div>
    )
  }

}
