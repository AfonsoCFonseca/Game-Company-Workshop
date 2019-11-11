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
					<h3 className='title'>Start Your Videogame Company Now</h3>
					<div className='beginningCard-text'>

						<p className="beginningCard-label">Introduction</p>
						<p className='beginningCard-descrp'>{startingCardIntroduction}</p>

						<p className="beginningCard-label">How To</p>
						<p className='beginningCard-descrp'>{startingCardHowTo}</p>

						<p className="beginningCard-label">Story</p>
						<p style={{marginBottom : '25px'}} className='beginningCard-descrp'>{startingCardStory}</p>
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