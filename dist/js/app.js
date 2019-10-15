class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 2,
      goingDev: true,
      isPaused: true,
      moduleShow: false,
      company: {
        name: '',
        income: getRandomInt( 2000, 2500 ),
        equity: 100,
        team: null,
      }
    }

    this.prepareNextYear = this.prepareNextYear.bind( this )
    this.changeYear = this.changeYear.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
    this._handleKeyDown = this._handleKeyDown.bind( this )
    this.stopTime = this.stopTime.bind( this )
    this.updateCompanyNumberValues = this.updateCompanyNumberValues.bind( this )
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown )
  }

  _handleKeyDown ( ev ) {

    const CONTROL_KEY = 17;
    const SHIFT_KEY = 16;
    const B_KEY = 66;
    var key;
    var isShift;
    
    if (window.event) {
      key = window.event.keyCode;
      isShift = !!window.event.shiftKey;
    } else {
      key = ev.which;
      isShift = !!ev.shiftKey;
    }
    if ( isShift ) {
      switch (key) {
        case 16:
          break;
        default:
          if( key == B_KEY ) this.setState({ goingDev: !this.state.goingDev })
          break;
      }
    }

  }



  prepareNextYear(){
    let year = this.state.year

    this.setState({
      moduleShow: true,
      isPaused: true,
    })
  }

  changeYear(){

    let year = this.state.year

    this.setState({
      year: ( year < 6 ? this.state.year + 2 : 6 ),
      isPaused: false,
      moduleShow: false,
    })

  }

  stopTime(){
    console.log("||PAUSED||")
    this.setState({isPaused: !this.state.isPaused})
  }

  updateCompanyNumberValues( name, value ){
    var newValue = this.state.company[name] + value

    this.editCompanyState( name, newValue )
  }

  editCompanyState( name, value ){
    var company = {}
    if( this.state.company != null ){
      company = this.state.company
    }

    company[ name ] = value

    this.setState({ company })
  }

  renderStoryModal( ){

    var { title, description, buttons } = createStory( this.state, this )
    if( !buttons ) buttons = React.createElement("button", {onClick:  this.changeYear}, "Confirm")

    return ( 
      React.createElement(Modal, {
        title: title, 
        description: description}, 
         buttons 
      )
    )

  }

  renderModule(){

    switch ( this.state.year ) {
      case 0:
        return React.createElement(Module_0Year, {editCompanyState:  this.editCompanyState})
        break;
      case 2:
        return React.createElement(Module_2Year, {editCompanyState:  this.editCompanyState})
        break;
      case 4:
        return React.createElement(Module_4Year, {editCompanyState:  this.editCompanyState})
        break;
      case 6:
        return React.createElement(Module_6Year, {editCompanyState:  this.editCompanyState})
        break;
      default:
        console.log( "retornou null" )
        return null;

    }

  }

  render(){
  
    return(
      React.createElement(React.Fragment, null, 
        React.createElement(Toolbar, {
          company:  this.state.company}
        ), 

        React.createElement(Timer, {
          year:  this.state.year, 
          nextYear:  this.prepareNextYear, 
          isTimerPaused:  this.state.isPaused}
        ), 

         this.state.moduleShow ? this.renderStoryModal() : null, 

        React.createElement("div", {className: "structure"}, 
          this.renderModule()
        ), 
        
         this.state.goingDev ? 
          React.createElement(Footer, {
            goNext:  this.prepareNextYear, 
            logState:  () => console.log( this.state ), 
            pauseState:  this.stopTime}
          ) :
            null
        
      )
    )
  }

}
;class Description extends React.Component{

  constructor( props ){
    super( props )

    this.state = {
      showDescription: false,
    }

    this.expandDiv = this.expandDiv.bind( this )
  }


  expandDiv(){

    this.setState({
      showDescription: !this.state.showDescription
    })

  }

  renderDescriptionDiv(){
    return ( this.props.description == null ? React.createElement("p", null, this.props.title) : 
      React.createElement("div", {className: "inputDescriptionDiv"}, 
        React.createElement("p", {className: "withDescriptionTitle"}, this.props.title), 
        React.createElement("i", {className: "fa fa-info-circle", "aria-hidden": "true", onClick:  this.expandDiv}), 
        React.createElement("div", {className: "descriptionInnerChild", style: {display: this.state.showDescription ? 'block' : 'none'}}, 
          React.createElement("p", null, this.props.description)
        )
      )
    )
  }

  render(){

    return(
      React.createElement(React.Fragment, null, 
         this.renderDescriptionDiv() 
      )
    )
  }


}
;class DropdownBlock extends React.Component{

  constructor( props ){
    super( props )
  }

  renderOption(){

    let options = this.props.dataEntries.map( entry => {
      return ( React.createElement("option", {key: `dataEntry_${entry}`}, entry) )
    })

    return options

  }

  render(){

    return(
      React.createElement("div", {className: "inputDiv"}, 
        this.props.children, 
        React.createElement("select", {
          className: "dropdownList", 
          onChange:  event  => this.props.valueReceived( event.target.value )}, 
          this.renderOption()
        )
      )
    )
  }

}
;class InputBlock extends React.Component{

  constructor( props ){
    super( props )

  }

  inputRender(){

    if( this.props.inputTile == null )
      return React.createElement("input", {onChange:  e => this.props.valueReceived( e.target.value )})
    else{
      return ( 
        React.createElement("div", {className: "inputDivInner"}, 
          React.createElement("p", null,  this.props.inputTile), 
          React.createElement("input", {className:  this.props.typeDiv == "small" ? "small" : "", onChange:  e => this.props.valueReceived( e.target.value )})
        ) )
    }

  }

  render(){

    return(
      React.createElement("div", {className: "inputDiv"}, 
        this.props.children, 
         this.props.size == null ? 
            this.inputRender() :
            React.createElement("textarea", {onChange:  e => this.props.valueReceived( e.target.value )})
        
      )
    )
  }

}
;class Modal extends React.Component {
	
	constructor( props ){
		super( props )

		this.innerStyle={
			width: this.props.width || '450px',
			height: this.props.height || 'auto',
		}

	}


	render(){

		return(
			React.createElement("div", {className: "modal"}, 
				React.createElement("div", {className: "modalInner", style:  this.innerStyle}, 
					React.createElement("div", {className: "header"}, 
						React.createElement("h3", {className: "titleModal"}, " ",  this.props.title, " ")
					), 
					React.createElement("div", {className: "body", dangerouslySetInnerHTML: {__html: this.props.description}}
						
					), 
					React.createElement("div", {className: "footer center"}, 
						this.props.children
					)
				)
			)
		)

	}

};class RadioButtonBlock extends React.Component {
	
	constructor( props ){
		super( props )

		this.state = {
			selectedOption: null,
		}

		this.handleOptionChange = this.handleOptionChange.bind( this )
	}


	handleOptionChange(changeEvent) {

		this.setState({
			selectedOption: changeEvent.target.value
		});
		this.props.valueReceived( changeEvent.target.value )
	}

	renderOptions(){

		var options = this.props.valuesSent.map( option => {

			return(
				React.createElement("div", {key:  `radio ${ option }`, className: "radio"}, 
			      React.createElement("label", null, 
			        React.createElement("input", {type: "radio", value:  option, 
	                  checked:  this.state.selectedOption === option, 
	                  onChange:  this.handleOptionChange}), 
			         option 
			      )
			    )
			)

		})

		return( 
			React.createElement("div", {className: "radioButtonDiv"}, 
			 	 options 
			) 
		)

	}

	render(){
		return(
		React.createElement("div", {className: "inputDiv"}, 	
			 this.props.children, 
			 this.renderOptions() 
		)
		)
	}
};const TextField = ({ textValue, title }) => {

	let text;
	if( typeof textValue === "string" ){
		text = textValue
	}
	else {
		text = textValue[ getRandomInt( 0, textValue.length ) ]
	}

	return(
		React.createElement("div", {className: "textFieldDiv"}, 
			React.createElement("h3", null,  title ), 
			React.createElement("div", {className: "textFieldDiv"}, 
				React.createElement("p", null,  text )
			)
		)
	)
};class Footer extends React.Component {

  constructor( props ){
    super( props )
  }



  render(){
    return(
      React.createElement("div", {className: "footer"}, 
        React.createElement("button", {onClick:  this.props.goNext}, "next"), 
        React.createElement("button", {onClick:  this.props.logState}, "Log"), 
        React.createElement("button", {onClick:  this.props.pauseState}, " Pause")
      )
    )
  }

}
;class Module_0Year extends React.Component {

  constructor( props ){
    super( props )

    this.takeInputValueFromRadioButton = this.takeInputValueFromRadioButton.bind( this )
  }


  takeInputValueFromRadioButton( value ){

    if( value.indexOf( 'Developers' ) !== -1 ){
      this.props.editCompanyState( "team", {
        'developers': 2,
      })
    }
    else{
      this.props.editCompanyState( "team", {
        'developers': 1,
        'artists': 1,
      })
    }
    
  }

  render() {

    return(

      React.createElement("div", {className: "module"}, 

        React.createElement(TextField, {title: "Company", textValue:  gameCompanyDescription }), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "name", value )}, 
           React.createElement(Description, {title: "Company Name"})
        ), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "companyDescription", value ), 
          size: "large"}, 
           React.createElement(Description, {title: "Description ( Optional )"})
        ), 

        React.createElement(RadioButtonBlock, {
            valuesSent:  teamArrayYear0, 
            valueReceived:  this.takeInputValueFromRadioButton}, 
           React.createElement(Description, {title: "Team", description:  team0YearDescription })
        ), 

        React.createElement(TextField, {title: "First Game", textValue:  secondGameDescription }), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "gameName1", value )}, 
           React.createElement(Description, {title: "Game Name"})
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  genres, 
          valueReceived:  value => this.props.editCompanyState( "genres", value )}, 
          React.createElement(Description, {title:  'Genre', description:  descriptionPlatform })
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  platforms, 
          valueReceived:  value => this.props.editCompanyState( "platform", value )}, 
          React.createElement(Description, {title:  'Platform' })
        )

      )

    )

  }

}
;class Module_2Year extends React.Component {

  constructor( props ){
    super( props )

    this.focusDescription = focusDescription[ getRandomInt( 0, 2 ) ]
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 

        React.createElement(TextField, {title: "Focus", textValue:  this.focusDescription}), 


        React.createElement(InputBlock, {
          inputTile:  "Developers", 
          typeDiv: 'small', 
          valueReceived:  value => this.props.editCompanyState( "sentMoneyYear2", value )}, 
           React.createElement(Description, {
              title: "Where to spend the money", 
              description:  descriptionSpentMoney })
        ), 
        React.createElement(InputBlock, {
          inputTile:  "Designers", 
          typeDiv: 'small', 
          valueReceived:  value => this.props.editCompanyState( "gameTitle2", value )}
        ), 
        React.createElement(InputBlock, {
          inputTile:  "SFX Studio", 
          typeDiv: 'small', 
          valueReceived:  value => this.props.editCompanyState( "gameTitle2", value )}
        ), 
        React.createElement(InputBlock, {
          inputTile:  "Marketing", 
          typeDiv: 'small', 
          valueReceived:  value => this.props.editCompanyState( "gameTitle2", value )}
        ), 

        React.createElement(TextField, {title: "Second Game", textValue:  secondGameDescription }), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "gameTitle2", value )}, 
           React.createElement(Description, {
              title: "Game Title"})
        ), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "gameDescription2", value ), 
          size: "large"}, 
           React.createElement(Description, {
              title: "Game genre, style, mechanics"})
        )

      )
    )

  }

}
;class Module_4Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        "YEAR 5", 
        React.createElement("input", {onValue:  e => console.log( e )})
      )
    )

  }

}
;class Module_6Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        "YEAR 8",  
        React.createElement("input", {onValue:  e => console.log( e )})
      )
    )

  }

}
;const genres = [
  'Platform games',
  'Shooter games',
  'Fighting games',
  'Beat em up games',
  'Stealth game',
  'Survival games',
  'Battle royale',
  'Rhythm games',
  'Action-adventure',
  'Survival horror',
  'Metroidvania',
  'Adventure',
  'Role-playing',
  'Action RPG',
  'MMORPG',
  'Roguelikes',
  'First-person party-based RPG',
  'Construction and management simulation',
  'Life simulation',
  'Vehicle simulation',
  'Auto battler (auto chess)',
  'Multiplayer online battle arena (MOBA)',
  'Real-time strategy (RTS)',
  'Real-time tactics (RTT)',
  'Tower defense',
  'Turn-based strategy (TBS)',
  'Turn-based tactics (TBT)',
  'Racing',
  'Sports game',
  'Sports-based fighting',
  'MMO',
  'Party game',
  'Logic game',
  'Idle gaming',
]

const platforms = [
  'PC',
  'Nintendo Switch',
  'PS4',
  'VR',
  'Mobile',
  'Xbox One',
  'NES ( Going full retro )',
  'Nintendo DS / 3DS'
]

const teamArrayYear0 = [
  '1 Developer, 1 Artist',
  '2 Developers'
];
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

	var buttons = React.createElement(React.Fragment, null, 
		React.createElement("button", {
			onClick:   () => { 
					 pC.updateCompanyNumberValues( "equity", -20 );
					 pC.updateCompanyNumberValues( "income", 40000 );
					 pC.changeYear()
				}
			}, "Accept the offer"), 
		React.createElement("button", {
			onClick:  () => { 
					 pC.updateCompanyNumberValues( "equity", -30 );
					 pC.updateCompanyNumberValues( "income", 30000 );
					 pC.changeYear()
				}
			}, "Counter Proposal")
	)

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


   } ;class Timer extends React.Component {
//1800000 30 minutos
  constructor( props ){
    super( props )

    this.timer30Minutes = 6 * 3 //60 * 30
    this.actualTimer = 0

    this.state = {
      year: props.year,
      isTimerPaused: false,
    }

    this.startTime = this.startTime.bind( this )
    this.doTheMath = this.doTheMath.bind( this )
    this.drawYearTiles = this.drawYearTiles.bind( this )
  }

  componentDidMount(){
    this.startTime()
  }

  startTime(){

     if ( this.actualTimer < this.timer30Minutes ) {

        setTimeout( () => {

          if( this.state.isTimerPaused == false ){
            this.actualTimer++;
            this.doTheMath()
          }
           this.startTime();

        }, 1000);

    }
    else this.resetTimer()

  }

  resetTimer(){

    this.actualTimer = 0
    this.props.nextYear()
    this.startTime()

  }

  doTheMath(){
    var valueInPercentage = parseInt( ( this.actualTimer * 100 ) / this.timer30Minutes )

    $('.imageInnerFiller').animate({
        width: valueInPercentage + '%'
    })

    var timerValue = giveMinutesAndSeconds( this.actualTimer )
    this.setState({ timerValue })
  }

  static getDerivedStateFromProps( props, state ) {
    return {
      year: props.year,
      isTimerPaused: props.isTimerPaused,
    }
  }

  drawYearTiles(){

    return(
      React.createElement(React.Fragment, null, 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 2 ? 'filled' : '') }`}), 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 4 ? 'filled' : '') }`}), 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 6 ? 'filled' : '') }`}), 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 8 ? 'filled' : '') }`})
      )
    )

  }

  render(){
    return(
      React.createElement("div", {className: "timer"}, 

        React.createElement("div", {className: "title"}, "Year ",  this.state.year, " of your Company"), 

        React.createElement("div", {className: "imageCounter"}, 
          React.createElement("div", {className: "imageInnerObject"}, 
            React.createElement("div", {className: "firstStep"}
            )

          ), 
          React.createElement("div", {className: "imageInnerFiller"}
          )
        ), 
        React.createElement("div", {className: "totalTimer"}, 
           this.drawYearTiles() 
        ), 
        React.createElement("div", {className: "counter"},  this.state.timerValue)

      )
    )
  }

}
;class Toolbar extends React.Component {
	
	constructor( props ){
		super( props )

		this.state = {
			equity: props.company.equity || 100,
			income: props.company.income || 0,
			games: props.company.games || 0,
			companyName: props.company.name || "", 
			team: props.company.team || "", 
		}
	}

	static getDerivedStateFromProps( props, state ) {

	    return {
	      	equity: props.company.equity,
			income: props.company.income,
			games: props.company.games,
			companyName: props.company.name,
			team: countTeam( props.company.team ),
	    }
	}

	substringTheCompanyName( str ){
		if( str.length > 16 )
			return str.substring( 0, 16 ) + '...'
		else return str
	}

	render(){

		return(
			React.createElement("div", {className: "toolBar"}, 
				React.createElement("div", {className: "left"}, 
					React.createElement("p", {style: {marginLeft: '10px'}}, " ", React.createElement("b", null,  this.substringTheCompanyName( this.state.companyName), " "))
				), 
				React.createElement("div", {className: "right"}, 
					React.createElement("p", null, "Income: ", React.createElement("b", null,  this.state.income)), 
					React.createElement("p", null, "Equity: ", React.createElement("b", null,  this.state.equity, "%")), 
					React.createElement("p", null, "Team: ", React.createElement("b", null,  this.state.team))
				)
			)
		)
	}
};function giveMinutesAndSeconds( seconds ){
    var dateObj = new Date( seconds * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    return  minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
}

function giveMinutesSecondsAndHours( seconds ){
	var dateObj = new Date( seconds * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    return hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
}


function getRandomInt( min = 1, max ){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function countTeam( teamObj ){
    var contador = 0
    for( var x in teamObj ){
        contador += teamObj[x]
    }
    return contador
};ReactDOM.render(
  React.createElement(PageContent, null),
  document.getElementById('content')
);
