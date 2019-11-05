class DropdownBlock extends React.Component{

  constructor( props ){
    super( props )

  }

  renderOption(){

    var newArrayEntries = this.props.dataEntries.slice();

    if( this.props.placeholder ){
      newArrayEntries.unshift( this.props.placeholder )
    }
    
    let options = newArrayEntries.map( ( entry, i )=> {
      if( i == 0) return ( <option selected disabled key={`dataEntry_${entry}`}>{entry}</option> )
      return ( <option key={`dataEntry_${entry}`}>{entry}</option> )
    })

    return options

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        <select
          placeholder={ this.props.placeholder }
          className="dropdownList"
          onChange={ event  => this.props.valueReceived( event.target.value )} >
          {this.renderOption()}
        </select>
      </div>
    )
  }

}
