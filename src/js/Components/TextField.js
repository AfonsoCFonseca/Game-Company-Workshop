const TextField = ({ textValue, title }) => {

	let text;
	if( textValue.typeof == "string" ){
		text = textValue
	}
	else {
		text = textValue[ getRandomInt( 0, textValue.length ) ]
	}

	return(
		<div className='textFieldDiv'>
			<h3>{ title }</h3>
			<p>{ text }</p>
		</div>
	)
}