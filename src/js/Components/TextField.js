const TextField = ({ textValue, title }) => {

	let text;
	if( textValue ){
		if( typeof textValue === "string" ){
			text = textValue
		}
		else {
			text = textValue[ getRandomInt( 0, textValue.length ) ]
		}
	}


	return(
		<div className='textFieldDiv'>
			<h3>{ title }</h3>
			{ textValue != null ? <div className='textFieldDiv'><p>{ text }</p> </div> : null }
		</div>
	)
}