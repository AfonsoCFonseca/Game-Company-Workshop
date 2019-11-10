const BeginningCard = ( props ) => {

	var title;
	var description;

	return(
		<div className='beginningCard'>
			<div className='beginningCard-inner'>
				<h3 className='title'>{ props.title }</h3>
				<div className='beginningCard-text'>
					<p>{startingCardDescription}</p>
				</div>

				<input 
					onChange={ event => title = event.target.value }
					className='beginningCard-input'
					placeholder='Company Name'></input>
				<textarea 
					onChange={ event => description = event.target.value }
					className='beginningCard-textarea'
					placeholder='Small Description'></textarea>

				<button className='beginningCard-button' onClick={ () => props.goNext( title, description ) }>Start</button>
				<label className='beginningCard-label'>When ready, press "Start"</label>

			</div>
		</div>
	)

}