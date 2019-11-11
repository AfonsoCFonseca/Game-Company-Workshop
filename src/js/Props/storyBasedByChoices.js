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


function year0Recap(){

	var title = "2 Years have passed"
	var description = `<div class='recap'>
		<div class='recap-numbers'>
			Game1 <label>+10000</label>
		</div>
		<div class='recap-numbers'>
			Developers <label>-1000</label>
		</div>
		<div class='recap-numbers'>
			Artist <label>-1000</label>
		</div>
		<div class='recap-numbers'>
			Infrastructures <label>-1500</label>
		</div>
		<hr/>
		<div class='recap-numbers total'>
			Total <label>-1500</label>
		</div>
	</div>`

	return {
		title,
		description
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