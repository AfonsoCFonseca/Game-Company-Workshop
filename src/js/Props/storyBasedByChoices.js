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
	console.log( companyYear )

	//middleEvent event chose
	//middleEvent.event 1 salary or meetings
	//middleEvent.event 2 beta or ignore
	var plus = 0 
	if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "salary" )
		plus = 100
	salaries = countSalary( state.company.team, plus) 
	var total =  salaries.total * 24
	var developersSalary = salaries.developersSalary * 24
	var artistsSalary = salaries.artistsSalary * 24


	var toSendBack = {
		vision: companyYear.vision,
	}


	//endEvent
	var investment = 0
	var equity = 80
	if( companyYear.endEvent == "accept" ){
		investment = 40000
	}
	else{
		investment = 30000
	}

	//recapOfYearText
	//vision

	//if organization + 
	//if event beta 
	var gameRevenue = 40500
	if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "meetings" )
		gameRevenue += 2000
	if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "beta" )
		gameRevenue += 2000

	var infrastructures = "2400" // 100 per month

	var finalTotal = 0
	finalTotal += ( investment + gameRevenue )
	finalTotal -= developersSalary 
	finalTotal -= artistsSalary 
	finalTotal -= infrastructures 


	var title = "2 Years have passed"
	var description = `

	<div class='descriptionDiv'>
		<p class='descriptionModal'>
			${companyYear.recapOfYearText}
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