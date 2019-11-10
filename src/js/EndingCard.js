const ClosingCard = ( props ) => {

	return(
		<div className='endingCard'>
			<div className='endingCard-inner'>
				<h3 className='title'>{ props.title }</h3>
				<div className='endingCard-text'>
					<p>{startingCardDescription}</p>
				</div>

				<input 
					className='endingCard-input'
					placeholder='Company Name'></input>
				<textarea 
					className='endingCard-textarea'
					placeholder='Small Description'></textarea>

				<button className='endingCard-button' onClick={ () => props.goNext() }>Start</button>
				<label className='endingCard-label'>When ready, press "Start"</label>

			</div>
		</div>
	)

}