
var createStory = function( state, parentComponent ){

 	var { team, income, equity } = state.company

 	switch( state.year ){
 		case 0: 
 			return year0Story( income, equity,team, parentComponent ) 

		case 2: 
 			return year2Story( income, equity,team, parentComponent ) 

		case 4: 
 			return year4Story( income, equity,team, parentComponent ) 

		case 6: 
 			return year6Story( income, equity,team, parentComponent ) 

		default: 
			console.log( "failed loading the years")
 	}

 	return({
 		title: '2 Years have passed',
 		description: getDescriptionStory()
 	})

 }

////////////////////////////////// YEAR 0 //////////////////////////////////

var descriptionPlatform = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Maecenas mauris dolor, lobortis id ipsum vitae, dapibus tincidunt est. Pellentesque mattis
 pretium nisi, sed rutrum lectus faucibus a. Morbi pretium mi tortor. Fusce ac vestibulum diam,
 tempus gravida metus. Pellentesque dictum purus ut lectus tempor fermentum. `

var gameCompanyDescription = `To make great games, you need to start a company first. Your company is what gives soul to your games and your team.
 For that, start by establishing and vision and objectives.`

 var team0YearDescription = `Pick one of the options below for starting your team. Dont forget that what you choose will reflect on your games
 If you go for a designer and a developer, your game will have a great UX/UI design and some unique style but i'll have a few bugs.
 If you go for two developers, you'll choose a bug free game but it will lack the design and an unique touch`

////////////////////////////////// MAIN EVENT

 var year0Story = function( income, equity,team, pC ){

	var title = ""
	var text = ""

	var teamSalary = getSalaryForTeam( team, 0 )

	var buttons = <React.Fragment>
		<button 
			onClick={  () => { 
					 pC.updateCompanyNumberValues( "equity", -20 );
					 pC.updateCompanyNumberValues( "income", 40000 );
					 pC.changeYear()
				}
			}>Accept the offer</button>
		<button 
			onClick={ () => { 
					 pC.updateCompanyNumberValues( "equity", -30 );
					 pC.updateCompanyNumberValues( "income", 30000 );
					 pC.changeYear()
				}
			}>Counter Proposal</button>
	</React.Fragment>

	text = `<p class='descriptionModal'> Your company had a great start! You released your first game successfully and got your team really committed </p>
	<p class='descriptionModal-type2'> The company spent around ${ teamSalary } $ with the team Salaries </p>
	<p class='descriptionModal'>You caught the attention of some investors that are willing to negotiate with you.</br>
	They want to give you 40k $ for 20% of your company. Do you accept it? ( Don t forget that a counter proposal it s always an option. You can get
	a better evaluation of the company or the investors can turn their back on the deal ) </br>
	</br>
	What would you do?  </p>`

 	return {
 		title: '2 Years have passed',
 		description: text,
 		buttons,
 	}

 }

////////////////////////////////// MID YEAR EVENT





////////////////////////////////// YEAR 2 //////////////////////////////////

 var descriptionSpentMoney = `Making the right decision on the right time is everything. Check what went bad on your recap of the last 2 years
and focus on that. Choose wisely when thinking where to spend the company money. Investing in growing your team is always a good move.
 Check what if you need a new department, like UX/UI Design, new artists, SFX, more developers, someone to promote your game
 and take care of marketing.`

 var secondGameDescription = `Now is a good time to start to think in releasing a new game. Do you think your first game went well? If yes, you should go for a 
 second instalment? Or maybe if you want to change thinks a bit or your last game didnt went so well, you can try a new genre, a new story or a new platform.
 If you wanna go for something different, just try the random roll. ( click on the icon )`

 var focusOption1 = `This 2 years of work taught you a lot but i ve learn a lot from games too... All your life you ve played simulation games.
 From Sims and Simcity, to goat simulator. You know, for sure, that this type of game can teach a lot to people. So you decide to make that genre on your next game`

 var focusOption2 = `You are RTS ( real time strategy ) lover. You played everything Age of empires, Warcraft III, Rome total war... You name it.
 The ideia of making RTS game doesn t leave your mind. So you decided to make one for your second game. And you wanna try something new on the genre`

 var focusOption3 = `The last 2 years were pretty stressfull and that made you take great pleasure in gory games. After a day of work you just want to 
 relaxe on the sofa and play some Doom. With that in mind, you decided that your next game will take any kind of genre but will, for sure, be a bloody gory game`


 var focusDescription = [ 
 	focusOption1,
 	focusOption2, 
 	focusOption3 
 ]

////////////////////////////////// MAIN EVENT

 var year2Story = function( income, equity, team, pC ){

	var title = ""
	var text = ""

 	return {
 		title: '2 Years have passed',
 		description: text
 	}

 }

////////////////////////////////// MID YEAR EVENT








////////////////////////////////// YEAR 4 //////////////////////////////////

 
 var year4Story = function( income, equity, team, pC ){
console.log( income, equity,team )

	var title = ""
	var text = ""

 	return {
 		title: '2 Years have passed',
 		description: text
 	}

 }








////////////////////////////////// YEAR 6 //////////////////////////////////

 
 var year6Story = function( income, equity, team, pC ){
console.log( income, equity,team )

	var title = ""
	var text = ""

 	return {
 		title: '2 Years have passed',
 		description: text
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


   	if( year == 0 ){

   		var salaryDev = developers * 1000
   		var salaryDesign = designers * 900

   	}

   	totalSalary = salaryDesign + salaryDev

   	return totalSalary


   } 