var createRecapBasedOnChoices = function( state ){

		switch( state.year ){
			case 1:
				return year1Recap( state )
				break;
			case 2:
				return year2Recap( state )
				break;
			case 3:
				return year3Recap( state )
				break;
	}

}


function year1Recap( state ){

	var companyYear = state.company.year1

	var bill = {
		game: 0,
		expanses: 0,
	}

	//SALARIES
	var plus = 0
	if( companyYear.middleEvent && companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "salary" )
		plus = 100

	salaries = countSalary( state.company.team, plus)
	var total =  salaries.total * 24
	var developersSalary = salaries.developersSalary * 24
	var artistsSalary = salaries.artistsSalary * 24

	// GAME REVENUE
	var gameRevenue = 41534
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
	// finalTotal += ( investment + gameRevenue )
	finalTotal -= developersSalary
	finalTotal -= artistsSalary
	finalTotal -= infrastructures

	var expanses = parseInt( total ) + parseInt( infrastructures )
	bill.expanses = expanses
	bill.game = gameRevenue

	var vision = companyYear.endEvent == "changeVision" ? companyYear.visionChanged : companyYear.vision
	var toSendBack = {
		vision,
		finalTotal,
		bill,
		developerLeft: ( companyYear.endEvent == "changeVision" ? true : false )
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

	var textOfTheYear = `<b>End Event: </b>${companyYear.recapOfYearText}. Your game went well ,sellings were great ( however you were not profitable, yet ) and
	you've learn a lot about your team and how to work with them.<br/><b>Middle Event: </b> ${middleEvent}`

	// HTML DOM
	var title = "1 Year have passed"
	var description = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>
			${textOfTheYear}
		</p>
	</div>
	<div class='recap'>
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


function year2Recap( state ){
	
	var companyYear = state.company.year2

	var bill = {
		game: 0,
		investment: 0,
		expanses: 0,
	}

//Investment
	var equity = 0
	var investment = 0
	if( companyYear.endEvent == "100k" ){
		equity = 80 // 20
		investment = 100000
	}
	else if( companyYear.endEvent == "500k" ){
		equity = 47 // 53
		investment = 500000
	}
	bill.investment = investment

//SALARIES
	salaries = countSalary( state.company.team, 100 )
	var totalSalary =  salaries.total * 24

	var salariesObj = {
		Developers: salaries.developersSalary * 24,
		Artist: salaries.artistsSalary * 24,
		Designers: salaries.designersSalary * 24,
		SFX: salaries.sfxSalary * 24,
		Marketing: salaries.marketingSalary * 24
	}

	function drawTeamExpansives( ){

		var elements = ""
		for( var x in salariesObj ){
			if( salariesObj[x] == 0 ) continue 

			if( salariesObj[x] ){
				elements += `<div class='recap-numbers'>${x} <label>-${salariesObj[x]}</label></div>`
			}

		}

		return elements 
	}


//INFRASTRUCTURE
	var infrastructures = 500 // 200
	infrastructures *= 24

//OFFICE
	var office = 2000
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		office = 1500

	office *= 24

//GAME
	var gameRevenue = 21252
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		gameRevenue += 2000

	if( companyYear.middleEvent ){ 
		if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "lead")
			gameRevenue += 2000

		if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "accept" )
			gameRevenue += 2000
	}

	gameRevenue += makeMathWithTeamSelection(  )

	function makeMathWithTeamSelection( ){
		//salaries
		var total = 10000 
		if( salaries.developersSalary < 3 ) 
			total -= 2000
		if( salaries.artistsSalary < 1 && salaries.artistsSalary > 3 ) 
			total -= 2000
		if(  salaries.designersSalary < 1 && salaries.designersSalary > 2 )
			total -= 1000
		if( salaries.sfxSalary != 1 ) 
			total -= 1000
		if( salaries.marketingSalary != 1 ) 
			total -= 2000

		return gameRevenue + total

	}


//TOTAL
	var finalTotal = office + gameRevenue + infrastructures +
		 totalSalary + state.company.income + investment

	var expanses = office + infrastructures + totalSalary
	bill.expanses = expanses

	bill.game = gameRevenue

	// HTML DOM
	//Falta middle eventr
	var middleEvent = ""
	if( companyYear.middleEvent ){
		if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
			if( companyYear.middleEvent.chose == "lead" ) middleEvent = `You made one of the developers lead programmer and helped a lot. He organized the sprints and developments and the game sold better because of the quality of the code.`
			if( companyYear.middleEvent.chose == "ignore" ) middleEvent = `Ignoring the proposal of one of the developers to became a Lead programmer made him unfocused and uninterested on the job he's doing.`
		}
		if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
			if( companyYear.middleEvent.chose == "accept" ) middleEvent = `You accepted that one of the developers start working for other company at the same time. The responsabilty 
					he took made him work harder and make a better game for ${ state.company.name }. Your game sold better because of that choice.`
			if( companyYear.middleEvent.chose == "reject" ) middleEvent = ` Ignoring the proposal of one of the developers to make a feature for other company made him unfocused and uninterested on the job he's doing.`
		}
	}

	var textOfTheYear  = `<b>End Event: </b>${companyYear.recapOfYearText} <br/> <b>Middle Event: </b>${ middleEvent }`


	var toSendBack = {
		finalTotal,
		equity,
		bill,
	}

	var description = `
		<div class='descriptionDiv'>
			<p class='descriptionModal'>
				${textOfTheYear}
			</p>
		</div>
		<div class='recap'>
			<div class='recap-numbers'>
				Your cash: <label>${state.company.income}</label>
			</div>
			<div class='recap-numbers'>
				Investment <label>+${investment}</label>
			</div>
			<div class='recap-numbers'>
				Game1 <label>+${gameRevenue}</label>
			</div>
			${ drawTeamExpansives() }
			<div class='recap-numbers'>
				Office <label>-${office}</label>
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
		title: "2 Years have passed",
		description,
		toSendBack,
	}
}


function year3Recap( state ){
	var companyYear = state.company.year3

	var bill = {
		game: 0,
		expanses: 0,
	}

	//GAME REVENUE
	var gameRevenue = 51321;
	var finalTotal = state.company.income

	var investors = ""

	if( state.company.year2.endEvent && state.company.year2.endEvent == "500k" ){
		gameRevenue - 10000
		investors =`<b>Others: </b> The investors made you change a few things in your game and that made the game sold less. Since more then 50%
		of the company belongs to them, they can make this calls whenever they want`
	}

	//SALARIES
	salaries = countSalary( state.company.team, 100 )
	var totalSalary = salaries.total * 24

	var salariesObj = {
		Developers: salaries.developersSalary * 24,
		Artist: salaries.artistsSalary * 24,
		Designers: salaries.designersSalary * 24,
		SFX: salaries.sfxSalary * 24,
		Marketing: salaries.marketingSalary * 24
	}

	finalTotal -= totalSalary

	function drawTeamExpansives( ){

		var elements = ""
		for( var x in salariesObj ){
			if( salariesObj[x] == 0 ) continue 

			if( salariesObj[x] ){
				elements += `<div class='recap-numbers'>${x} <label>-${salariesObj[x]}</label></div>`
			}

		}

		return elements 
	}

	//INFRASTRUCTURES 
	var infrastructures = 800 // 200
	infrastructures *= 24

	totalSalary - infrastructures

	// FINAL TEXT
	var extraDlc = null
	var fine = null
	var middleEvent = ""
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
		if( companyYear.middleEvent.chose == "dlc1dev" ){
			middleEvent = `The dlc of your first game made some bucks but it lacked development`
			extraDlc = 4000
			finalTotal += extraDlc
		}
		if( companyYear.middleEvent.chose == "dlc2dev" ){
			middleEvent = `Making a dlc for you first game made the community really excited and made a few bucks with it`
			extraDlc = 7000
			finalTotal += extraDlc
		} 
		if( companyYear.middleEvent.chose == "ignore" ) middleEvent = `Your community was unhappy since you ignore them on the forums for the DLC's for your first game`
		
	}
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
		if( companyYear.middleEvent.chose == "close" ) middleEvent = `You closed your first game and left the community unsatisfied`
		if( companyYear.middleEvent.chose == "1devCorrect" ) middleEvent = `Making one of the developers fixing the backdoor on your first game saved you some future problems`
			if( companyYear.middleEvent.chose == "nothing" ){
				middleEvent = `Leaving the database from your first game exposed made you go to tribunal and pay a huge fine`
				fine = 50000
				finalTotal -= fine
			} 
	}


	function make3YearRenderEvent(){

		if( fine != null )
			return ( `<div class='recap-numbers'>
					Tribunal fine <label>-${fine}</label>
				</div>` )

		if( extraDlc != null ) 
			return ( `<div class='recap-numbers'>
					1º Game Dlc<label>+${extraDlc}</label>
				</div>` )

		return ""
	}	

	bill.game = gameRevenue
	var expanses = totalSalary + infrastructures
	if( fine != null ) expanses += fine
	bill.expanses = expanses

	var toSendBack = {
		finalTotal,
		bill
	}


	var textOfTheYear = `<b>End Event: </b>${companyYear.recapOfYearText}.<br/><b>Middle Event: </b> ${middleEvent}
	<br/>${investors}`

	// HTML DOM
	var title = "3 Years have passed"
	var description = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>
			${textOfTheYear}
		</p>
	</div>
	<div class='recap'>
		<div class='recap-numbers'>
			Your cash: <label>${state.company.income}</label>
		</div>
		<div class='recap-numbers'>
			Game1 <label>+${gameRevenue}</label>
		</div>
		${ drawTeamExpansives() }
		<div class='recap-numbers'>
			Infrastructures <label>-${infrastructures}</label>
		</div>
		${ make3YearRenderEvent() }
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
