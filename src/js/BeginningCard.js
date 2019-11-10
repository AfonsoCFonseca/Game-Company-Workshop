const BeginningCard = ( props ) => {

	return(
		<div className='beginningCard'>
			<div className='beginningCard-inner'>
				<h3 className='title'>{ props.title }</h3>
				<div className='beginningCard-text'>
					<p>{startingCardDescription}</p>
				</div>

				<input 
					className='beginningCard-input'
					placeholder='Company Name'></input>
				<textarea 
					className='beginningCard-textarea'
					placeholder='Small Description'></textarea>

				<button className='beginningCard-button' onClick={ () => props.goNext() }>Start</button>
				<label className='beginningCard-label'>When ready, press "Start"</label>

			</div>
		</div>
	)

}