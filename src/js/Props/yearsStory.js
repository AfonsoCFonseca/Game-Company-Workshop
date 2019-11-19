
var createStory = function( state, parentComponent ){

 	var company = state.company

 	var title = ""
console.log( state )
 	switch( state.year ){
 		case 1:
 			if( state.middleEvent == true ) return year1MiddleEventStory( company, parentComponent)
 			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year1Story( company, parentComponent )
 			title = '1 Year have passed'

		case 2:
			if( state.middleEvent == true ) return year2MiddleEventStory( company, parentComponent )
			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year2Story( company, parentComponent )
 			title = "2 Years have passed"

		case 3:
			if( state.middleEvent == true ) return year3MiddleEventStory( company, parentComponent )
			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			return year3Story( company, parentComponent )

		default:
			console.log( "failed loading the years")
 	}

 	return({
 		title,
 		description: getDescriptionStory()
 	})

}


////////////////////////////////// OPTIONAL CARDS //////////////////////////////////

var startingCardIntroduction = `Starting you professional life can be hard and complex. The purpose of this
workshop is to help you understand a bit better what it takes to start a videogame company, as well as creating a vision for your products and manage
your future team.`

var startingCardHowTo = `This web application simulates one year of your company life for each thirty minutes of real life. You
will start the event with 2500$, some of the choices will be yours, others will pre-determined, be honest, give original answers and enjoy the workshop.` 

var startingCardStory = `You are about to start your company. To do so, write down the name for the company and a small description
of something unique with it`

let endingCardDescription = `Congratulations. Your company is up and running for three years.
Below you can see the overview of the comapany since the beginning.`


////////////////////////////////// YEAR 1 //////////////////////////////////

var gameCompanyDescription = `To make great games, you need to start a company first. Your company is what gives soul to your games and your team.
	For that, start by establishing and vision and goals.`

var descriptionPlatform = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	Maecenas mauris dolor, lobortis id ipsum vitae, dapibus tincidunt est. Pellentesque mattis
	pretium nisi, sed rutrum lectus faucibus a. Morbi pretium mi tortor. Fusce ac vestibulum diam,
	tempus gravida metus. Pellentesque dictum purus ut lectus tempor fermentum. `

var firstGameDescription = `Your company is pretty fresh and still needs some money to start betting in big ideias for games.
	Start by creating a game small but addictive, choosing a hot genre ( Moba's, autochess ) but with a original twist.
	The game needs to be an assure hit to bring some money and investment to the company`

var team1YearDescription = `Pick one of the options below for starting your team. Dont forget that what you choose will reflect on your games
	If you go for a designer and a developer, your game will have a great UX/UI design and some unique style but i'll have a few bugs.
	If you go for two developers, you'll choose a bug free game but it will lack the design and an unique touch`

var environment1YearDescription = `From now on you'll have an office to maintain. You can set the rules and see if it makes sense, from the
	working scheduel, to behaviour inside the office, you are the one to have the last word. Can people work remotely? Can the team make breaks and play videogames?
	Tell some of the rules you would like to settle`

var teamBuilding1YearDescription = `Team bulding means activities that you and your team do, not related with company work, normaly used to enhance social
	relations and create bounds between the members. For instances, a board game on monday nights, going to the cinema every month or camping every two month... Just think of some fun
	activities that you and your team would do outside the office.`

var vision1YearDescription = `To make things more fun, pick one of the choices down below. Your choice for the vision of the games you are creating
	will affect some inputs and choices you'll have to make in the next years`


let intro1Focus = "You are in front of your computer and ready to start think about the game that your company will make."
let focusYear1First = `${intro1Focus} You know that you wanna do something different for the consoles.
Think of a mobile game that you love and try to make similar game but for a console`

let focusYear1Second = `${intro1Focus} You wanna do something different, so you are making your main game mechanics based on sound`

let focusYear1Thrid = `${intro1Focus} You are feeling pretty confident and relaxed, so you decided that this game will be something pretty relaxing.
Something like ( Journey, Everything or Katamari )`

var focusYear1 = [
	focusYear1First,
	focusYear1Second,
	focusYear1Thrid
]

////////////////////////////////// MAIN EVENT

 var year1Story = function( company, pC ){

 	var otherVision = getOtherVisionFromArray( company.year1.vision )

	var text = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'> Your company had a great start! You released your first game successfully and got your team really committed </p>
		<p class='descriptionModal'>In a meeting with your team, one of the members started questioning if the company vision "${company.year1.vision || ""}" made sense.</br>
		He thinks you should go for a "${ otherVision }" perspective and change your first decision for the company</br>
		</br>
		Remember, you should listen to the team but you have the final decision</p>
		<p class='descriptionModal-type2'>What do you do?</p>
	</div>`

	var firstChoice = `You change your mind and went with this new "${ otherVision }" as vision for your company. The other member
	saw this happenning and felt unsure about your decision, that led him to quit ${ company.name }`

	var secondChoice = `You choose to remain with your vision for the company. You know what is better for you and for your team to pursuit.`

	var year1 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year1 = {
						endEvent: "changeVision",
						visionChanged: otherVision
					}
					pC.editCompanyState( "year1", year1 )
					pC.recapTheYear( firstChoice, 1 )

				}
			}>Change Vision</button>
		<button
			onClick={ () => {
					year1 = {
						endEvent: "dontChange"
					}
					pC.editCompanyState( "year1", year1 )
					pC.recapTheYear( secondChoice, 1 )

				}
			}>Stay with your ideia</button>
	</React.Fragment>

 	return {
 		title: "1 Year have passed",
 		description: text,
 		buttons,
 	}

}

////////////////////////////////// MID YEAR EVENT

var year1MiddleEventStory = function( company, pC ){

	let year1 = {}
  year1.middleEvent = {}

	var text1 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>You can see some progression in your game but you have the feeling that your team
    can do better and be more productive. They are commited but unorganized.</p>
		<p class='descriptionModal-type2'> What do you do? </p>
		<p class='descriptionModal'>1.Raise the salary of the team, and maybe, they'll be happier and more focused<br/>
    2.Start doing regular meetings with them, to increase effectiveness and productivity</p>
	</div>`

	var buttons1 = <React.Fragment>
	<button
		onClick={  () => {
			year1.middleEvent = {
				event: 1,
    			chose: "salary",
			}
			pC.closeMiddleEvent( "year1", year1 )
			}
		}>Raise 100$ Salary</button>
	<button
		onClick={ () => {
			year1.middleEvent = {
				event: 1,
    			chose: "meetings",
			}
			pC.closeMiddleEvent( "year1", year1 )
			}
		}>Start doing meetings</button>
	</React.Fragment>

	var text2 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>Beta versions normaly give you some good feedback from the users. But for making one, you always have to loose
		time building it and compromise conclusion of the game, on the release day.</p>
		<p class='descriptionModal-type2'> What do you choose? </p>
		<p class='descriptionModal'>1.Take a few days to make a beta version and get feedback?<br/>
    2.Keep doing the normal development?</p>
	</div>`

	var buttons2 = <React.Fragment>
	<button
		onClick={  () => {
			year1.middleEvent = {
				event: 2,
    			chose: "beta",
			}
			pC.closeMiddleEvent( "year1", year1 )
			}
		}>Beta Version</button>
	<button
		onClick={ () => {
			year1.middleEvent = {
				event: 2,
    			chose: "ignore",
			}
			pC.closeMiddleEvent( "year1", year1 )
			}
		}>Ignore</button>
	</React.Fragment>

	var version = getRandomInt( 1, 2 )
	var description = version == 1 ? text1 : text2
	var buttons = version == 1 ? buttons1 : buttons2

	return {
 		title: "Middle Year Event",
 		description: description,
 		buttons: buttons,
 	}

}



////////////////////////////////// YEAR 2 //////////////////////////////////

 var descriptionSpentMoney = `Making the right decision on the right time is everything. Check what went bad on your recap of the last 2 years
and focus on that. Choose wisely when thinking where to spend the company money. Investing in growing your team is always a good move.
 Check if you need a new department, like UX/UI Design, new artists, SFX, more developers or someone to promote your game
 and take care of marketing.`

 var focusOption1 = `This year of work taught you a lot but i ve learn a lot from games too... All your life you ve played simulation games.
 From Sims and Simcity, to goat simulator. You know, for sure, that this type of game can teach a lot to people. So you decide to make that genre on your next game`

 var focusOption2 = `You are RTS ( real time strategy ) lover. You played everything Age of empires, Warcraft III, Rome total war... You name it.
 The ideia of making RTS game doesn't leave your mind, so you decided that your second game will be an RTS... And you wanna try something new on the genre`

 var focusOption3 = `The last year was pretty stressfull and that made you take great pleasure in gory games. After a day of work you just want to
 relax on the sofa and play some Doom. With that in mind, you decided that your next game will take any kind of genre but will, for sure, be a bloody gory game`

var officeSpaceYear2Description = `If you wanna get bigger, you'll need to rent a bigger office. You have two suggestions, one
is a small but cosy office in the building where other startups work and you know it would be good for networking. The other suggestion is
a much bigger office, isolated and more expansive`

var biggerTeamYear2Description = `The team keeps getting bigger and you should start to think in some standard rules,
so everything is well organized inside the office and with the games development. Tell some of the ideias or rules you wanna
apply to your company`

 var focusDescription = [
 	focusOption1,
 	focusOption2,
 	focusOption3
 ]

 function getDescriptionUnfocusTeam( value ){
   var descriptionForUnfocusTeam = ""
 	    if( value == "Small but with other start-ups near" )
      descriptionForUnfocusTeam = "The office it's small and cosy, but with your team getting used to work together, they started to getting noisy."+
      "It's hard to get focused and develop. Approach the team, in an original way, asking them for being more quiet"
    else if( value == "Bigger but isolated" )
      descriptionForUnfocusTeam = "The office it's gigantic.. and someone of the team tought it would be cool to bring there own PS4 and television"+
    "to play videogames on his break. But the problem it's that the rest of the team gets unfocused watching him play. Approach him, in an original way, asking him to stop that."
    return descriptionForUnfocusTeam
 }

 function getDescriptionYear2( vision ){

 	var standard = "Now is a good time to start to think in releasing a new game. Do you think your first game went well?"

 	if( vision == "Simple but addictive games" ){
 		return standard + " But don't forget that your game must be 'Simple but Addictive'. Normaly that goes for mobile games with 1 single mechanic or movement"+
 		"like Super Mario Run"
 	}
 	else if( vision == "Focus on the story" ){
		return standard + " Keep in mind that your chose for the vision of the company 'Focus on the Story', so your next game must have something related"+
		"to that. A real Life event or some book/movie you love "
 	}
 	else if( vision == "Online Competetive" ){
		return standard + " But remember, your game needs to be an 'Competitive Online Game'. You can do the same as the others.. repeat the formula, like mobas and battleroyales"+
		"or you can be original and give something different a try"
 	}
 	return standard + " But don't forget that your game must be 'Simple but Addictive'. Normaly that goes for mobile games with 1 single mechanic or movement"+
 		"like Super Mario Run"
 }

 var gameUniqueFeatureyear2 = `Make something unique for this game, a story related with Real life event,
  an unique feature for the community, like a steam workshop or interactive playthrough for streamers and his subscribers`

////////////////////////////////// MAIN EVENT

 var year2Story = function( company, pC ){

	var text = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>On a networking event, you've talked with a lot of people, about your company, the futures of games, new trends..
			The way you talked caught the attention of two investors.</p>
		<p class='descriptionModal'>
			One offers your 100K for 20% of the company<br/>
			The other offers you 500K for 53% of the company</p>
		<p class='descriptionModal-type2'>What do you decide?</p>
	</div>`

	var firstChoice = `You raised 100k on a Seed round for 20% of the company. It was a wise choice.. You are, no doubt, growing
	and it's better to give one step at a time..`

	var secondChoice = `You raised 500k on a Seed round for 53%, it's a huge round of investment but comprimised your company by giving more than
	a half to an investor. It was a bold move and it can cost you future decisions on the company`

	var year2 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year2 = {
						endEvent: "100k"
					}
					pC.editCompanyState( "year2", year2 )
					pC.recapTheYear( firstChoice, 2 )

				}
			}>100k for 20%</button>
		<button
			onClick={ () => {
					year2 = {
						endEvent: "500k"
					}
					pC.editCompanyState( "year2", year2 )
					pC.recapTheYear( secondChoice, 2 )

				}
			}>500k for 53%</button>
	</React.Fragment>

 	return {
 		title: '2 Years have passed',
 		buttons,
 		description: text
 	}

 }

////////////////////////////////// MID YEAR EVENT

var year2MiddleEventStory = function( company, pC ){

	let year2 = {}

	var text1 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>A developer from your team approached you</p>
		<p class='descriptionModal'>He said that he likes what he's doing but he prefered to manage the developer team. He got the feeling
		that sometimes the team don't know what they are doing</p>
		<p class='descriptionModal-type2'> What do you do? </p>
	</div>`

	var buttons1 = <React.Fragment>
	<button
		onClick={  () => {
			year2.middleEvent = {
				event: 1,
    			chose: "lead",
			}
			pC.closeMiddleEvent( "year2", year2 )
			}
		}>Make him Lead Developer</button>
	<button
		onClick={ () => {
			year2.middleEvent = {
				event: 1,
    			chose: "ignore",
			}
			pC.closeMiddleEvent( "year2", year2 )
			}
		}>Reject</button>
	</React.Fragment>

	var text2 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>One of the developers want ask you something</p>
		<p class='descriptionModal-type2'>He seems a bit embarrassed</p>
		<p class='descriptionModal'>He have an offer from another company to make a small feature for them. He assured you that he'll stay commited
		to ${ company.name } and only makes this feature when he's out of the office</div>`

	var buttons2 = <React.Fragment>
	<button
		onClick={  () => {
			year2.middleEvent = {
				event: 2,
    			chose: "accept",
			}
			pC.closeMiddleEvent( "year2", year2 )
			}
		}>Sure</button>
	<button
		onClick={ () => {
			year2.middleEvent = {
				event: 2,
    			chose: "reject",
			}
			pC.closeMiddleEvent( "year2", year2 )
			}
		}>Sorry but no</button>
	</React.Fragment>

	var version = getRandomInt( 1, 2 )
	var description = version == 1 ? text1 : text2
	var buttons = version == 1 ? buttons1 : buttons2

	return {
 		title: "Middle Year Event",
 		description: description,
 		buttons: buttons,
 	}

}


///////////////////////////////// YEAR 3 //////////////////////////////////

//Resources
//https://medium.com/seed-digital/how-to-business-model-canvas-explained-ad3676b6fe4a

var modelCanvasExplanation = `Everything is going perfect with the company and you started to figure it out how to go to market with
your games. And for that, your created a Canvas... And you know, if you fill the canvas for your third game, it will be a sure hit on the market
Every big company used this canvas and it's named Business Modal Canvas. It's purpose is to quickly and easily define your product / game`



var description3YearValuePropositions = `Here you have to describe the purpose of your game. What it as to offer to your client/player. What does the player have to win with your game?
Trains logic or reaction? Learn to strategy in a online game? Working together in a co-op game? In a nutshell, why would someone want to have this problem solved?
What does your game offers, that can be converted in a value to the player?`

var description3YearCustomerSegments = `In the customer Segment your think of your target player and try to break them in small parts. For gender, age, interests or habits.
This way you can start to check the market for what does this group of targets look for, what type of genre, story or commitment to the game`

var description3YearCustomerRelationships = `The Customer Relationship is what bounds and sticks the player to your game, is what makes the player go back to it the day after... If you are talking of a PvP ( Player vs Player) game, probably the competitive games,
if you are developing an MMORPG, level system are the thing to look. If the game is a solid Single Player
, it can be focus on the "Collectathon" or the Story. Try to think and explorer what the player really looks forward when playing a game. Think of your self playing that type of game. What do you want from it?`

var description3YearChannels = `Channels is what makes the player find your game. What channel does your game is mentioned? through facebook? Ads on mobile applications? A Brand activision?
It's important to have this figured it out. If this fails, your game will not be mentioned and will not have the credit it deserves. Normaly the channels to approach is studied on marketing campaigns`

var description3YearKeyActivities = `The Key Activities is what resources does your company need to create and mantain the game your are building.
When creating a game you have to worry about desigining, development, marketing... And after creating a game, you need to figure it out how you will maintain it.
Probably you will need patches, testing, updating.. If you think in realeasing DLCs and new features, you need to invest on the story and testing.
What is the activities your game need to offer the value proposition to your players?`

var description3YearKeyResources = `What resources you need to make your game doable. You need staff/team, computers, internet, office space, workshops, electricity... Think of every resource you need
if you want your company to make a game`

var description3YearKeyPartners = `Your partners are third parties company that help you build the game. The best example for this is to think what platform you will be releasing your game, if it's a mobile app, your partners
will be Apple or Google ( AppStore or PlayStore ), if you choose a PC game, than Steam, Epic Game Laucher, Humble Bundle Store will be your partners.
The Partners are external companies that help you create, maintain and distribute your product/game`

var description3YearCostStructure = `Your product have costs being created ( Key Activities ), you need to worry about sustaining a valueable product once it goes live ( patches, updates, server, DataBases )
How much do you pay for your partnerships? 2 Years from now, what do you think you will have to pay for your server? For this answer, i dont want you to think precise costs but to write what are the costs you need to
worry about when your game is created and goes live`

var description3YearRevenueStream = `The Revenue Streams is one of the thinks that makes the wheels turn and keep to product moving. This is what makes your income grow, what let's the company
keep going forward and what pays the games that you are making. Where does your game makes money? what way? Through selling the game itself? By microtransactions or maybe Ads revenue? There's a lot of ways
to bring revenue to the company.. Always keep one think in mind, the revenue that comes from the game needs to be equal or bigger to the costs related to his development.`

var teamDescriptionYear3 = `You need to put someone taking care oh Human Resources Department, but for that you need to have your
values for the company and people you want to hire`

var teamValuesInterviewYear3 = `What do you value the most for future members of the team? ` 

var team2QuestionsToMake = `Tell two questions you would like to ask in an interview. The questions must be simple, direct and related to
the company environment`

 var year3Story = function( company, pC ){

	var text = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>The company is running for 3 straight years, now it's time for expand your business.</p>
		<p class='descriptionModal-type2'>
			You have two propositions
		</p>
		<p class='descriptionModal'>
			Go to a moch larger office in Londom and run this company from there<br/>
			Open a new small studio, in Hungary, called ${ company.name } 2.0, to focus on other game ideias that you have
		</p>
	</div>`

	var firstChoice = `You decided to open a new studio. In Hungary you can start from scratch new ideias and explore, new games,
	mechanics, platforms and ways to do revenue`

	var secondChoice = `London it's a great city for game's development. You are sure that you'll learn a lot there and make a lot of 
	new projects and contacts`

	var year3 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year3 = {
						endEvent: "newStudio"
					}
					pC.editCompanyState( "year3", year3 )
					pC.recapTheYear( firstChoice, 3 )

				}
			}>New Studio</button>
		<button
			onClick={ () => {
					year3 = {
						endEvent: "goToLondon"
					}
					pC.editCompanyState( "year3", year3 )
					pC.recapTheYear( secondChoice, 3 )

				}
			}>Go to London</button>
	</React.Fragment>

 	return {
 		title: '3 Years have passed',
 		buttons,
 		description: text
 	}

 }

 var year3MiddleEventStory = function( company, pC ){

 	let year3 = {}

	var text1 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>Your second game was a hit and your game community keeps asking for a DLC.</p>
		<p class='descriptionModal'>You can try to take some of your team members of the actual game to work in this dlc</p>
		<p class='descriptionModal-type2'>What do you do?</p>
	</div>`

	var buttons1 = <React.Fragment>
	<button
		onClick={  () => {
			year3.middleEvent = {
				event: 1,
    			chose: "dlc1dev",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>DLC ( 1 Dev, 1 Artist )</button>
	<button
		onClick={ () => {
			year3.middleEvent = {
				event: 1,
    			chose: "dlc2dev",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>DLC ( 2 Developer, 1 Artist )</button>
	<button
	onClick={ () => {
		year3.middleEvent = {
			event: 1,
			chose: "ignore",
		}
		pC.closeMiddleEvent( "year3", year3 )
		}
	}>Don't do the DLC</button>
	</React.Fragment>

	var text2 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>You first game have a lot of people playing nowdays, nevertheless, someone found something about your code</p>
		<p class='descriptionModal'>On a community forum someone posted a hack that can expose some data from your database.</p>
		<p class='descriptionModal-type2'>What measures do you take?</p>
	</div>`

	var buttons2 = <React.Fragment>
	<button
		onClick={  () => {
			year3.middleEvent = {
				event: 2,
    			chose: "close",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>Close Your First Game</button>
	<button
		onClick={ () => {
			year3.middleEvent = {
				event: 2,
    			chose: "1devCorrect",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>1 Developer to Fix</button>
	<button
		onClick={ () => {
			year3.middleEvent = {
				event: 2,
    			chose: "nothing",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>Do nothing</button>
	</React.Fragment>

	var version = getRandomInt( 1, 2 )
	var description = version == 1 ? text1 : text2
	var buttons = version == 1 ? buttons1 : buttons2

	return {
 		title: "Middle Year Event",
 		description: description,
 		buttons: buttons,
 	}


 }


////////////////////////////////// Others //////////////////////////////////

function getSalaryForTeam ( team = null, year ){

	var developers = 0
	var designers = 0
   	var totalSalary = 0

	if( team ){
		developers = team.developers || 0
		designers = team.designers || 0
	}


   	if( year == 1 ){

   		var salaryDev = developers * 1000
   		var salaryDesign = designers * 900

   	}

   	totalSalary = salaryDesign + salaryDev

   	return totalSalary


   }



var recapScreen = function( state, pC ){

	var { title, description, toSendBack } = createRecapBasedOnChoices( state )

	var code
	var validationCode
	if( state.year == 1 ) validationCode = "1991"
	else if( state.year == 2 ) validationCode = "JAN"
	else if( state.year == 3 ) validationCode = "JAN17"

	var buttons = <React.Fragment>
		<input placeholder="Password" type="text" name="name" onChange={ e => code = e.target.value } />
		<button
			onClick={  () => {
				if( code == validationCode )
					pC.changeYear('next', toSendBack )
				}
			}> Continue </button>
	</React.Fragment>

	return {
 		title,
 		description,
 		buttons,
 	}

}
