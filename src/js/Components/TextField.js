const TextField = ({ textValue, title }) => {

	let text;
	console.log( textValue.typeof )
	if( typeof textValue === "string" ){
		text = textValue
	}
	else {
		text = textValue[ getRandomInt( 0, textValue.length ) ]
	}

	return(
		<div className='textFieldDiv'>
			<h3>{ title }</h3>
			<div className='textFieldDiv'>
				<p>{ text }</p> 
			</div>
		</div>
	)
}