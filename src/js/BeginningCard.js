class BeginningCard extends React.Component {

	constructor( props ){
		super( props )

		this.title = "";
		this.description;

		this.state ={
			missingTitle: false
		}
	}

	checkInit(){
		if( this.title != "" )
			this.props.goNext( this.title, this.description )
		else {
			this.setState({
				missingTitle: true
			}) 
		}
	}

	render(){

		return(
			<div className='beginningCard'>
				<div className='beginningCard-inner'>
					<h3 className='title'>{ this.props.title }</h3>
					<div className='beginningCard-text'>
						<p>{startingCardDescription}</p>
					</div>

					<input 
						onChange={ event => this.title = event.target.value }
						className={`beginningCard-input ${ this.state.missingTitle ? "missingTitle" : ""}`}
						placeholder='Company Name'></input>
					<textarea 
						onChange={ event => this.description = event.target.value }
						className='beginningCard-textarea'
						placeholder='Small Description'></textarea>

					<button className='beginningCard-button' onClick={ () => this.checkInit() }>Start</button>
					<label className='beginningCard-label'>When ready, press "Start"</label>

				</div>
			</div>
		)

	}

}