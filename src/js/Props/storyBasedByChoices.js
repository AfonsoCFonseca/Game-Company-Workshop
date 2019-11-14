var createRecapBasedOnChoices = function( state ){

		switch( state.year ){
			case 0:
				return year0Recap( state )
				break;
			case 2: 
				return year2Recap()
				break;
			case 4: 
				return year4Recap()
				break;
	}

}


function year0Recap( state ){

	var companyYear = state.company.year0

	//SALARIES
	var plus = 0 
	if( companyYear.middleEvent && companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "salary" )
		plus = 100

	salaries = countSalary( state.company.team, plus) 
	var total =  salaries.total * 24
	var developersSalary = salaries.developersSalary * 24
	var artistsSalary = salaries.artistsSalary * 24

	// INVESTEMENT END EVENT
	var investment = 0
	var equity = 80
	if( companyYear.endEvent == "accept" ){
		investment = 40000
	}
	else{
		investment = 30000
	}

	// GAME REVENUE
	var gameRevenue = 40500
	if( companyYear.middleEvent ){
		if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "meetings" )
			gameRevenue += 2000
		if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "beta" )
			gameRevenue += 2000
	}
	if( state.company.team && state.company.team.developers == 1 )
		gameRevenue += 2000

	var infrastructures = "2400" // 100 per month

	// FINAL MATH
	var finalTotal = 0
	finalTotal += ( investment + gameRevenue )
	finalTotal -= developersSalary 
	finalTotal -= artistsSalary 
	finalTotal -= infrastructures 

	var toSendBack = {
		vision: companyYear.vision,
		finalTotal,
		equity
	}

	// FINAL TEXT 
	var middleEvent = ""
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
		if( companyYear.middleEvent.chose == "salary" ) middleEvent = `Money it's not everything, you should have tried to make more meetings`
		if( companyYear.middleEvent.chose == "meetings" ) middleEvent = `Choosing meetings instead of a raise was a wise choice and brought better performance`
	}
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
		if( companyYear.middleEvent.chose == "beta" ) middleEvent = `Your beta version made your release less buggy and sold better`
		if( companyYear.middleEvent.chose == "ignore" ) middleEvent = `Not making a beta version  made your release more buggy and you sold less`
	}
	
	var textOfTheYear = `${companyYear.recapOfYearText}. Your game went well and you made some profit of it and
	you've learn a lot about your team and how to work with them. ${middleEvent}`

	// HTML DOM
	var title = "2 Years have passed"
	var description = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>
			${textOfTheYear}
		</p>
	</div>
	<div class='recap'>
		<div class='recap-numbers'>
			Investment <label>+${investment}</label>
		</div>
		<div class='recap-numbers'>
			Game1 <label>+${gameRevenue}</label>
		</div>
		<div class='recap-numbers'>
			Developers <label>-${developersSalary}</label>
		</div>
		<div class='recap-numbers'>
			Artist <label>-${artistsSalary}</label>
		</div>
		<div class='recap-numbers'>
			Infrastructures <label>-${infrastructures}</label>
		</div>
		<hr/>
		<div class='recap-numbers total'>
			Total <label>${ finalTotal }</label>
		</div>
	</div>`

	return {
		title,
		description,
		toSendBack
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