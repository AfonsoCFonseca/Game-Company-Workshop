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
	if( companyYear.middleEvent && companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "Salary Raised" )
		plus = 100

	salaries = countSalary( state.company.team, plus)
	var total =  salaries.total * 12
	var developersSalary = salaries.developersSalary * 12
	var artistsSalary = salaries.artistsSalary * 12

	// GAME REVENUE
	var gameRevenue = 20534
	if( companyYear.middleEvent ){
		if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "Start meetings" )
			gameRevenue += 3000
		if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "Make beta game" )
			gameRevenue += 3000
	}
	if( state.company.team && state.company.team.developers == 1 )
		gameRevenue += 3000

	var infrastructures = 2400 // 200 per month


	if( companyYear.workshop == "Game-Design Seminar" ||  companyYear.workshop == "SFX for Games Workshop" ){
		gameRevenue += 1050
	}

	// FINAL MATH
	var finalTotal = 0
	finalTotal -= developersSalary
	finalTotal -= artistsSalary
	finalTotal -= infrastructures
	finalTotal += gameRevenue

	var expanses = parseInt( total ) + parseInt( infrastructures )
	bill.expanses = expanses
	bill.game = gameRevenue

	var vision = companyYear.endEvent == "Changed Vision" ? companyYear.visionChanged : companyYear.vision
	var toSendBack = {
		vision,
		finalTotal,
		bill,
		developerLeft: ( companyYear.endEvent == "Changed Vision" ? true : false )
	}

	// FINAL TEXT
	var middleEvent = ""
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
		if( companyYear.middleEvent.chose == "Salary Raised" ) middleEvent = `Money it's not everything, making more meetings would be a better choice`
		if( companyYear.middleEvent.chose == "Start meetings" ) middleEvent = `Choosing meetings instead of a raise was a wise decision and brought better performance to the team`
	}
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
		if( companyYear.middleEvent.chose == "Make beta game" ) middleEvent = `Your beta version made your release less buggy and you sold better`
		if( companyYear.middleEvent.chose == "Ignore beta game" ) middleEvent = `Not making a beta version made your release more buggy and you sold less`
	}

	var textOfTheYear = `<b>End Event: </b>${companyYear.recapOfYearText}. Your game went well ,sellings were great ( however you were not profitable, yet )
	You've learn a lot about your team and how to work with them.<br/><b>Middle Event: </b> ${middleEvent}`

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
			Total <label>${ finalTotal }$</label>
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
	if( companyYear.endEvent == "100k Investment" ){
		equity = 80 // 20
		investment = 100000
	}
	else if( companyYear.endEvent == "400k Investment" ){
		equity = 47 // 53
		investment = 400000
	}
	bill.investment = investment

//SALARIES
	var plus = 100
	if( state.company.year1.middleEvent && companyYear.middleEvent.event == 1
		&& state.company.year1.middleEvent.chose == "Salary Raised" )
		plus = 200

	var salaries = countSalary( state.company.team, plus )
	var totalSalary = salaries.total * 12

	var salariesObj = {
		Developers: salaries.developersSalary * 12,
		Artist: salaries.artistsSalary * 12,
		Designers: salaries.designersSalary * 12,
		SFX: salaries.sfxSalary * 12,
		Marketing: salaries.marketingSalary * 12
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
	infrastructures *= 12

//OFFICE
	var office = 2000
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		office = 1500

	office *= 12

//GAME
	var gameRevenue = 31252
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		gameRevenue += 2000

	if( companyYear.middleEvent ){
		if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "Assign Lead Developer")
			gameRevenue += 2000

		if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "Accept working on other feature" )
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

		return total

	}

	var digitalMarketing = 0
	if( companyYear.marketingOrDesign == "Digital Marketing campaign on facebook ( 10$ x 90days = 900$)" ){
		digitalMarketing = 900
		gameRevenue += 1500
	}

	if( companyYear.marketingOrDesign == "A nice webpage and instagram posts ( 1500$ webpage and 300 x 15 insta-posts = 1800$ )" ){
		digitalMarketing = 1800
		gameRevenue += 3000
	}


  function drawChoiceDigitalMarketing(){
    if( digitalMarketing != 0 )
      return `<div class='recap-numbers'>
        Web Campaign <label>-${digitalMarketing}</label>
      </div>`
    else return ""
  }


//TOTAL
	var finalTotal = 0

	finalTotal += parseInt( investment)
	finalTotal += parseInt( gameRevenue)
	finalTotal += parseInt( state.company.income )
	finalTotal -= parseInt( infrastructures)
	finalTotal -= parseInt( totalSalary)
	finalTotal -= parseInt( office)
	finalTotal -= parseInt( digitalMarketing )

	bill.expanses = office + infrastructures + totalSalary + digitalMarketing
	bill.game = gameRevenue

	// HTML DOM
	//Falta middle eventr
	var middleEvent = ""
	if( companyYear.middleEvent ){
		if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
			if( companyYear.middleEvent.chose == "Assign Lead Developer" ) middleEvent = `You made one of the developers lead programmer and helped a lot. He organized the sprints and developments and the game sold better because of the quality of the code.`
			if( companyYear.middleEvent.chose == "Ignored Developer" ) middleEvent = `Ignoring the proposal of one of the developers to became a Lead programmer made him unfocused and uninterested on the job he's doing.`
		}
		if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
			if( companyYear.middleEvent.chose == "Accept working on other feature" ) middleEvent = `You accepted that one of the developers start working for other company at the same time. The responsabilty
					he took made him work harder and made a better game for ${ state.company.name }. Your game sold better because of that choice.`
			if( companyYear.middleEvent.chose == "Reject working on other feature" ) middleEvent = ` Ignoring the proposal of one of the developers to make a feature for other company made him unfocused and uninterested on the job he's doing.`
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
				Game <label>+${gameRevenue}</label>
			</div>
			${ drawTeamExpansives() }
			${ drawChoiceDigitalMarketing() }
			<div class='recap-numbers'>
				Office <label>-${office}</label>
			</div>
			<div class='recap-numbers'>
				Infrastructures <label>-${infrastructures}</label>
			</div>
			<hr/>
			<div class='recap-numbers total'>
				Total <label>${ finalTotal }$</label>
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
	var gameRevenue = 151321;
	var finalTotal = state.company.income

	var investors = ""

	if( state.company.year2.endEvent && state.company.year2.endEvent == "400k Investment" ){
		gameRevenue -= 10000
		investors =`<b>Others: </b> The investors made you change a few things in your game and that made the game sold less. Since more then 50%
		of the company belongs to them, they can make this calls whenever they want`
	}

	//SALARIES
	var plus = 150
	if( state.company.year1.middleEvent && companyYear.middleEvent.event == 1
		&& state.company.year1.middleEvent.chose == "Salary Raised" )
		plus = 250
	salaries = countSalary( state.company.team, plus )
	var totalSalary = salaries.total * 12

	var salariesObj = {
		Developers: salaries.developersSalary * 12,
		Artist: salaries.artistsSalary * 12,
		Designers: salaries.designersSalary * 12,
		SFX: salaries.sfxSalary * 12,
		Marketing: salaries.marketingSalary * 12
	}

	finalTotal -= parseInt( totalSalary )

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
	var infrastructures = 800
	infrastructures *= 12

	finalTotal -= parseInt( infrastructures )


	//TEAM INVESTMENT
	var teamExpanses = parseInt( companyYear.spentConfort || 0 )
	teamExpanses += parseInt( companyYear.spentMaintenance || 0 )
	teamExpanses += parseInt( companyYear.spentJobTraining || 0 )

	finalTotal -= parseInt( teamExpanses )

	if( companyYear.spentConfort > 1500 )
		gameRevenue += parseInt( companyYear.spentConfort * 1.2 )

	if( companyYear.spentMaintenance > 2500 )
		gameRevenue += parseInt( companyYear.spentConfort * 1.5 )

	if( companyYear.spentJobTraining > 2800 )
		gameRevenue += parseInt( companyYear.spentConfort * 1.4 )



	function drawTeamExpanses(){

		var mStr = ""

		if( companyYear.spentConfort > 0 ){
			mStr += `<div class='recap-numbers'>
				Team Confort <label>-${companyYear.spentConfort}</label>
			</div>`
		}
		if( companyYear.spentMaintenance > 0 ){
			mStr += `<div class='recap-numbers'>
				Job Training <label>-${companyYear.spentMaintenance}</label>
			</div>`
		}
		if( companyYear.spentJobTraining > 0 ){
			mStr += `<div class='recap-numbers'>
				Maintenance <label>-${companyYear.spentJobTraining}</label>
			</div>`
		}

		if( bootcampValue != null ){
			mStr += `<div class='recap-numbers'>
				Bootcamp <label>-${ bootcampValue }</label>
			</div>`
		}

	    return mStr
  }

	//Bootcamp & Gamejam
	var bootcampValue = null
	if( companyYear.bootcamp == "Organize the bootcamp every 3 months ( 3000$ x 4 )" ){
		bootcampValue = 12000
		finalTotal -= bootcampValue
		gameRevenue += 15000
	}
	if( companyYear.gamejam == "Let them do it" ){
		gameRevenue += 3000
	}


	// FINAL TEXT
	var extraDlc = null
	var fine = null
	var middleEvent = ""
	if( companyYear.middleEvent && companyYear.middleEvent.event == 1 ){
		if( companyYear.middleEvent.chose == "Dlc with 1 developer" ){
			middleEvent = `The dlc of your first game made some bucks but it lacked development`
			extraDlc = 4000
			finalTotal += extraDlc
		}
		if( companyYear.middleEvent.chose == "Dlc with 2 developers" ){
			middleEvent = `Making a dlc for you first game made the community really excited and made a few bucks with it`
			extraDlc = 7000
			finalTotal += extraDlc
		}
		if( companyYear.middleEvent.chose == "Ignored Dlc" ) middleEvent = `Your community was unhappy since you ignore them on the forums for the DLC's for your first game`

	}
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
		if( companyYear.middleEvent.chose == "Close first Game" ) middleEvent = `You closed your first game and left the community unsatisfied`
		if( companyYear.middleEvent.chose == "1 Developer fixing first game" ) middleEvent = `Making one of the developers fixing the backdoor on your first game saved you some future problems`
			if( companyYear.middleEvent.chose == "No fixes on first game" ){
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

	finalTotal += gameRevenue
	bill.game = parseInt( gameRevenue )
	var expanses = parseInt( totalSalary ) + parseInt( infrastructures ) + parseInt( teamExpanses )
	if( fine != null ) expanses += fine
	if( bootcampValue != null ) expanses += bootcampValue
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
			Game: <label>+${gameRevenue}</label>
		</div>
		${ drawTeamExpansives() }
		<div class='recap-numbers'>
			Infrastructures <label>-${infrastructures}</label>
		</div>
		${ drawTeamExpanses() }
		${ make3YearRenderEvent() }
		<hr/>
		<div class='recap-numbers total'>
			Total <label>${ finalTotal }$</label>
		</div>
	</div>`

	return {
		title,
		description,
		toSendBack
	}
}
