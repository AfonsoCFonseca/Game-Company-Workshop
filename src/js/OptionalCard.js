const OptionalCard = ( props ) => {

	return(
		<div className='optionalCard'>
			<div className='optionalCard-inner'>
				<h3 className='title'>{ props.title }</h3>
				<div className='optionalCard-text'>
					<p>{startingCardDescription}</p>
				</div>

				<input 
					className='optionalCard-input'
					placeholder='Company Name'></input>
				<textarea 
					className='optionalCard-textarea'
					placeholder='Small Description'></textarea>

				<button className='optionalCard-button' onClick={ () => props.goNext() }>Start</button>
				<label className='optionalCard-label'>When ready, press "Start"</label>

			</div>
		</div>
	)

}