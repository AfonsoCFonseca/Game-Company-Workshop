class DropdownBlock extends React.Component{

  constructor( props ){
    super( props )

    this.renderOption = this.renderOption.bind( this )
  }

  renderOption(){

    var newArrayEntries = this.props.dataEntries.slice();
    let options

    if( this.props.placeholder ){
      newArrayEntries.unshift( this.props.placeholder )
    }
    
    if( this.props.locked == null ){
      options = newArrayEntries.map( ( entry, i ) => {
        if( i == 0) return ( <option defaultValue disabled key={`dataEntry_${entry}`}>{entry}</option> )
        return ( <option key={`dataEntry_${entry}`}>{entry}</option> )
      })
    }
    else {
      options = newArrayEntries.map( ( entry, i ) => {
        if( entry == this.props.locked ) return ( <option selected key={`dataEntry_${entry}`}>{entry}</option> )
        else return ( <option key={`dataEntry_${entry}`}>{entry}</option> )
      })
    }

    return options

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        <select
          placeholder={ this.props.placeholder }
          disabled={ this.props.locked ? true : false }
          className="dropdownList"
          onChange={ event  => this.props.valueReceived( event.target.value )} >
          {this.renderOption()}
        </select>
      </div>
    )
  }

}
