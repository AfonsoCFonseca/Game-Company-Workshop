class RadioButtonBlock extends React.Component {
	
	constructor( props ){
		super( props )

		this.state = {
			selectedOption: null,
		}

		this.handleOptionChange = this.handleOptionChange.bind( this )
	}


	handleOptionChange(changeEvent) {

		this.setState({
			selectedOption: changeEvent.target.value
		});
		this.props.valueReceived( changeEvent.target.value )
	}

	renderOptions(){

		var options = this.props.valuesSent.map( option => {

			return(
				<div key={ `radio ${ option }` } className="radio">
			      <label>
			        <input type="radio" value={ option } 
	                  checked={ this.state.selectedOption === option } 
	                  onChange={ this.handleOptionChange } />
			        { option }
			      </label>
			    </div>
			)

		})

		return( 
			<div className="radioButtonDiv">
			 	{ options }
			</div> 
		)

	}

	render(){
		return(
		<div className="inputDiv">	
			{ this.props.children }
			{ this.renderOptions() }
		</div>
		)
	}
}