class OptionalCard extends React.Component{

	constructor( props ){
		super( props )
	}

	render(){
		return(
			<div className='optionalCard'>
				<div className='optionalCard-inner'>
					<h3 className='title'>{ this.props.title }</h3>
					<div className='optionalCard-text'>
						<p>{startingCardDescription}</p>
					</div>

					<input className='optionalCard-input'>
						
					</input>
					<input className='optionalCard-input'>
						
					</input>

					<button className='optionalCard-button' onClick={ () => this.props.goNext() }>Start</button>
					<label className='optionalCard-label'>When ready, press "Start"</label>

				</div>
			</div>
			)
	}
}