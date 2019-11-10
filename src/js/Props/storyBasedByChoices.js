var createRecapBasedOnChoices = function( state ){

		switch( state.year ){
			case 0:
				return year0Recap()
				break;
			case 2: 
				return year2Recap()
				break;
			case 4: 
				return year4Recap()
				break;
	}

}

	// var text = `<p class='descriptionModal'>Since you've started to work with a team, the game is developing
	// faster since the beggining but you can't shake the feeling that the company could do a lot better, the team
	// is unorganized and not that commited as you expected.</p>
	// <p class='descriptionModal-type2'> What do you do? </p>
	// <p class='descriptionModal'>You can raise the salary of the team, and maybe they'll be happier and more focused or
	// you can start to make meetings with them, so the game is more right on track.</p>`


function year0Recap(){
	return {
		title: "year 0", 
		description: "description 0"
	}
}	


function year2Recap(){
	return {
		title: "year 2", 
		description: "description 2"
	}
}


function year4Recap(){
	return {
		title: "year 4", 
		description: "description 4"
	}
}