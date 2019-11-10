class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      goingDev: true,
      isPaused: false,
      moduleShow: false,
      optionalScreen: false,
      middleEvent: false,
      recapEvent: false,
      company: {
        name: '',
        income: 2500,
        equity: 100,
        team: null,
      },
      year0:{
        middleEvent: null,
      }
    }

    this.prepareNextYear = this.prepareNextYear.bind( this )
    this.changeYear = this.changeYear.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
    this._handleKeyDown = this._handleKeyDown.bind( this )
    this.stopTime = this.stopTime.bind( this )
    this.updateCompanyNumberValues = this.updateCompanyNumberValues.bind( this )
    this.renderMiddleYearModal = this.renderMiddleYearModal.bind( this )
    this.editGeneralState = this.editGeneralState.bind( this )
    this.closeMiddleEvent = this.closeMiddleEvent.bind( this )
    this.exportToImage = this.exportToImage.bind( this )
    this.startCompany = this.startCompany.bind( this )
    this.recapTheYear = this.recapTheYear.bind( this )
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
          if( key == this ) B_KEY.setState({ goingDev: !this.state.goingDev })
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

  changeYear( type ){

    let year = this.state.year
    let nextYear
    let optionalScreen = false

    if( type == "next" ){
      if( year < 4 ){
        nextYear = this.state.year + 2
      }
      else {
        nextYear = 4
        optionalScreen = true
      }
    }
    else if( type == "previous")
      nextYear = ( year > 0 ? this.state.year - 2 : 0 )

    this.setState({
      year: nextYear,
      isPaused: false,
      moduleShow: false,
      optionalScreen
    })

  }

  stopTime(){
    this.setState({isPaused: !this.state.isPaused})
  }

  updateCompanyNumberValues( name, value ){
    var newValue = this.state.company[name] + value

    this.editCompanyState( name, newValue )
  }

  editGeneralState( name, value ){
    var actualState = this.state

    if( actualState[ name ] ){
      
      if( typeof value === 'object' ){
        for( var x in value ){
          actualState[ name ][x] = value[x]
        }
      }
      else actualState[ name ] = value
    }

    this.setState( actualState )
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
    if( !buttons ) buttons = React.createElement("button", {onClick:  this.changeYear( "next") }, "Confirm")

    return (
      React.createElement(Modal, {
        title: title, 
        description: description}, 
         buttons 
      )
    )

  }

///////RECAP SCREEN
  recapTheYear(){
    this.setState({ recapEvent: true })
  }

///////STARTING APP

 startCompany( title, description ){
  this.setState({ 
    optionalScreen: false 
  })
  this.editCompanyState( "name", title )
  this.editCompanyState( "description", description )
 }

///////MIDDLE EVENT
  renderMiddleYearModal( ){
      this.setState({
        middleEvent: true,
        moduleShow: true,
        isPaused: true,
      })
  }

  closeMiddleEvent( eventName, eventToUpdate ){
    this.editGeneralState( eventName, eventToUpdate )

     this.setState({
      middleEvent: false,
      isPaused: false,
      moduleShow: false,
    })
  }

///////RENDER MODULE
  exportToImage(){

  var node = document.getElementById('endingCard-overview');

  domtoimage.toPng(node)
    .then(function (dataUrl) {
        download( dataUrl, "dlDataUrlBin.jpeg", "image/jpeg");
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

  }

///////RENDER MODULE
  renderModule(){

    if( this.state.optionalScreen == true ){
      if( this.state.year == 4 ){
         return React.createElement(EndingCard, {
          sendEverything:  this.state, 
          exportToImage:  this.exportToImage})
      }
      else{
         return React.createElement(BeginningCard, {
          goNext:  this.startCompany, 
          title: "Company Form"})
      }

    }

    switch ( this.state.year ) {
      case 0:
        return React.createElement(Module_0Year, {editGeneralState:  this.editGeneralState, 
          editCompanyState:  this.editCompanyState})
        break;
      case 2:
        return React.createElement(Module_2Year, {editGeneralState:  this.editGeneralState, 
          editCompanyState:  this.editCompanyState})
        break;
      case 4:
        return React.createElement(Module_4Year, {editGeneralState:  this.editGeneralState, 
          editCompanyState:  this.editCompanyState})
        break;
      default:
        console.log( "retornou null" )
        return null;

    }

  }

  render(){

    return(
      React.createElement(React.Fragment, null, 
         !this.state.optionalScreen ? React.createElement(Toolbar, {company:  this.state.company}) : null, 
         !this.state.optionalScreen ? React.createElement(Timer, {
          year:  this.state.year, 
          nextYear:  this.prepareNextYear, 
          isTimerPaused:  this.state.isPaused, 
          middleEventTrigger:  this.renderMiddleYearModal}
        ) : null, 

         this.state.moduleShow ? this.renderStoryModal() : null, 

        React.createElement("div", {className: "structure"}, 
          this.renderModule()
        ), 
        
         this.state.goingDev ?
          React.createElement(Footer, {
            goNext:  this.prepareNextYear, 
            logState:  () => console.log( this.state ), 
            pauseState:  this.stopTime, 
            goPrevious:  this.changeYear}
          ) :
          null
        
      )
    )
  }

}
;class BeginningCard extends React.Component {

	constructor( props ){
		super( props )

		this.title = "";
		this.description;

		this.state ={
			missingTitle: false
		}
	}

	checkInit(){
		if( this.title != "" )
			this.props.goNext( this.title, this.description )
		else {
			this.setState({
				missingTitle: true
			}) 
		}
	}

	render(){

		return(
			React.createElement("div", {className: "beginningCard"}, 
				React.createElement("div", {className: "beginningCard-inner"}, 
					React.createElement("h3", {className: "title"},  this.props.title), 
					React.createElement("div", {className: "beginningCard-text"}, 
						React.createElement("p", null, startingCardDescription)
					), 

					React.createElement("input", {
						onChange:  event => this.title = event.target.value, 
						className: `beginningCard-input ${ this.state.missingTitle ? "missingTitle" : ""}`, 
						placeholder: "Company Name"}), 
					React.createElement("textarea", {
						onChange:  event => this.description = event.target.value, 
						className: "beginningCard-textarea", 
						placeholder: "Small Description"}), 

					React.createElement("button", {className: "beginningCard-button", onClick:  () => this.checkInit()}, "Start"), 
					React.createElement("label", {className: "beginningCard-label"}, "When ready, press \"Start\"")

				)
			)
		)

	}

};class Description extends React.Component{

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

    var newArrayEntries = this.props.dataEntries.slice();

    if( this.props.placeholder ){
      newArrayEntries.unshift( this.props.placeholder )
    }
    
    let options = newArrayEntries.map( ( entry, i )=> {
      if( i == 0) return ( React.createElement("option", {defaultValue: true, disabled: true, key: `dataEntry_${entry}`}, entry) )
      return ( React.createElement("option", {key: `dataEntry_${entry}`}, entry) )
    })

    return options

  }

  render(){

    return(
      React.createElement("div", {className: "inputDiv"}, 
        this.props.children, 
        React.createElement("select", {
          placeholder:  this.props.placeholder, 
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
};const EndingCard = ( props ) => {
	var everything = props.sendEverything
	var company = everything.company

	function makeTextForPdf(){
		return ( 
			React.createElement(React.Fragment, null, 

					React.createElement("div", {className: "yearCapDiv"}, 
						React.createElement("p", null, "2 Years")
					), 
					React.createElement("div", {className: "textIncome"}, 
						React.createElement("p", null, "First Game:"), 
						React.createElement("label", null, "$", company.income)
					), 
				React.createElement("hr", null), 

					React.createElement("div", {className: "yearCapDiv"}, 
						React.createElement("p", null, "4 Years")
					), 
					React.createElement("div", {className: "textIncome"}, 
						React.createElement("p", null, "First Game:"), 
						React.createElement("label", null, "$", company.income)
					), 
					React.createElement("div", {className: "textIncome"}, 
						React.createElement("p", null, "Investment"), 
						React.createElement("label", null, "$", company.income)
					), 
				React.createElement("hr", null), 

					React.createElement("div", {className: "yearCapDiv"}, 
						React.createElement("p", null, "6 Years")
					), 
					React.createElement("div", {className: "textIncome"}, 
						React.createElement("p", null, "First Game:"), 
						React.createElement("label", null, "$", company.income)
					), 
				React.createElement("hr", null), 

				React.createElement("div", {style: {marginTop : '20px'}, className: "textIncome"}, 
					React.createElement("p", null, "Total Income:"), 
					React.createElement("label", null, "$", company.income)
				)
			) 
		)
	}


	this.endingOverview = makeTextForPdf( )

	return(
		React.createElement("div", {className: "endingCard"}, 
			React.createElement("div", {className: "endingCard-inner"}, 
				React.createElement("h3", {className: "title"}, "The Company made 6 Years"), 
				React.createElement("div", {className: "endingCard-text"}, 
					React.createElement("p", null, endingCardDescription)
				), 

				React.createElement("div", {id: "endingCard-overview"}, 
					React.createElement("h3", {className: "title"}, "Company Overview"), 
					 this.endingOverview
				), 

				React.createElement("button", {className: "endingCard-button", onClick:  () => props.exportToImage()}, "Download Overview"), 
				React.createElement("label", {className: "endingCard-label"}, "Download your Workshop, click thhe button above ")

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
        React.createElement("button", {onClick:  () => this.props.goPrevious( 'previous' )}, "back"), 
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
    let year0 = {}

    if( value.indexOf( 'Developers' ) !== -1 ){
      year0 = {
        teamChoice: {
          'developers': 2,
        }
      }
    }
    else{
      year0 = {
        teamChoice: {
          'developers': 1,
          'artists': 1,
        }
      }
    }

    this.props.editGeneralState( 'year0', year0 )
    
  }

  render() {

    return(

      React.createElement("div", {className: "module"}, 

        React.createElement(RadioButtonBlock, {
            valuesSent:  teamArrayYear0, 
            valueReceived:  this.takeInputValueFromRadioButton}, 
           React.createElement(Description, {title: "Team", description:  team0YearDescription })
        ), 

        React.createElement(TextField, {title: "First Game", textValue:  firstGameDescription }), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "gameName1", value )}, 
           React.createElement(Description, {title: "Game Name"})
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  genres, 
          placeholder: "Pick a genre", 
          valueReceived:  value => this.props.editCompanyState( "genres", value )}, 
          React.createElement(Description, {title:  'Genre', description:  descriptionPlatform })
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  platforms, 
          placeholder: "Pick a platform", 
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

  //'https://www.gamasutra.com/blogs/SergioJimenez/20131106/204134/Gamification_Model_Canvas.php'

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        React.createElement(TextField, {title: "Getting the hang of it", textValue:  modelCanvasExplanation }), 

        React.createElement("div", {className: "businessModuleCanvas"}, 

          React.createElement("div", {className: "imgDiv"}, 
            React.createElement("img", {src: "/public/images/business_Model_Canvas_Template.jpg"}), 
            React.createElement("img", {src: "/public/images/maxresdefault.jpg"})
          ), 
          React.createElement("div", {className: "textDiv"}, 
            React.createElement("a", {href: "/public/images/business_Model_Canvas_Template.jpg", download: true}, "Business Modal Canvas ( empty )"), 
            React.createElement("a", {href: "/public/images/maxresdefault.jpg", download: true}, "Business Modal Canvas ( filled )")
          )
        ), 

         React.createElement(InputBlock, {
            size: "large", 
            valueReceived:  value => this.props.editCompanyState( "ValuePropositions", value )}, 
             React.createElement(Description, {
                title: "Value Propositions", 
                description:  description4YearValuePropositions })
        ), 


         React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "CustomerSegments", value )}, 
           React.createElement(Description, {
              title: "Customer Segments", 
              description:  description4YearCustomerSegments })
        ), 

         React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "CustomerRelationships", value )}, 
           React.createElement(Description, {
              title: "Customer Relationships", 
              description:  description4YearCustomerRelationships })
        ), 

        React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "Channels", value )}, 
           React.createElement(Description, {
              title: "Channels", 
              description:  description4YearChannels })
        ), 

        React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "KeyActivities", value )}, 
           React.createElement(Description, {
              title: "Key Activities", 
              description:  description4YearKeyActivities })
        ), 

        React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "KeyResources", value )}, 
           React.createElement(Description, {
              title: "Key Resources", 
              description:  description4YearKeyResources })
        ), 

        React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "KeyPartners", value )}, 
           React.createElement(Description, {
              title: "Key Partners", 
              description:  description4YearKeyPartners })
        ), 

        React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "CostStructure", value )}, 
           React.createElement(Description, {
              title: "Cost Structure", 
              description:  description4YearCostStructure })
        ), 

        React.createElement(InputBlock, {
          size: "large", 
          valueReceived:  value => this.props.editCompanyState( "RevenueStream", value )}, 
           React.createElement(Description, {
              title: "Revenue Stream", 
              description:  description4YearRevenueStream })
        )

      )
    )

  }

}
;const genres = [
  'Platform games',
  'Shooter games',
  'Beat em up games',
  'Stealth game',
  'Survival games',
  'Battle royale',
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
  'Multiplayer online battle arena (MOBA)',
  'Real-time strategy (RTS)',
  'Tower defense',
  'MMO',
  'Party game',
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
];var createRecapBasedOnChoices = function( state ){

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
};
var createStory = function( state, parentComponent ){

 	var { team, income, equity } = state.company

 	switch( state.year ){
 		case 0:
 			if( state.middleEvent == true ) return year0MiddleEventStory( income, equity,team, parentComponent)
 			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year0Story( income, equity,team, parentComponent )

		case 2:
 			return year2Story( income, equity,team, parentComponent )

		case 4:
 			return year4Story( income, equity,team, parentComponent )

		default:
			console.log( "failed loading the years")
 	}

 	return({
 		title: '2 Years have passed',
 		description: getDescriptionStory()
 	})

}


////////////////////////////////// OPTIONAL CARDS //////////////////////////////////

var startingCardDescription = `You are about to start your company. To do so, write down the name and a small description
of something unique that you want to do in it.`

let endingCardDescription = `Congratulations. Your company is up and running for six years.
Below you can see the overview of the comapany since the beginning.`


////////////////////////////////// YEAR 0 //////////////////////////////////

var gameCompanyDescription = `To make great games, you need to start a company first. Your company is what gives soul to your games and your team.
 For that, start by establishing and vision and objectives.`

var descriptionPlatform = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Maecenas mauris dolor, lobortis id ipsum vitae, dapibus tincidunt est. Pellentesque mattis
 pretium nisi, sed rutrum lectus faucibus a. Morbi pretium mi tortor. Fusce ac vestibulum diam,
 tempus gravida metus. Pellentesque dictum purus ut lectus tempor fermentum. `

var firstGameDescription = `Your company is pretty fresh and still needs some money to start betting in big ideias for games.
Start by creating a game small but addictive, choosing a hot genre ( Moba's, autochess ) but with a original twist. 
The game needs to be an assure hit to bring some money and investment to the company` 

 var team0YearDescription = `Pick one of the options below for starting your team. Dont forget that what you choose will reflect on your games
 If you go for a designer and a developer, your game will have a great UX/UI design and some unique style but i'll have a few bugs.
 If you go for two developers, you'll choose a bug free game but it will lack the design and an unique touch`

////////////////////////////////// MAIN EVENT

 var year0Story = function( income, equity,team, pC ){

	var title = "2 Years have passed"
	var text = ""

	var teamSalary = getSalaryForTeam( team, 0 )

	var buttons = React.createElement(React.Fragment, null, 
		React.createElement("button", {
			onClick:   () => {
					/* pC.updateCompanyNumberValues( "equity", -20 );
					 pC.updateCompanyNumberValues( "income", 40000 );*/
					 pC.recapTheYear( )
				}
			}, "Accept the offer"), 
		React.createElement("button", {
			onClick:  () => {
					 /*pC.updateCompanyNumberValues( "equity", -30 );
					 pC.updateCompanyNumberValues( "income", 30000 );*/
					 pC.recapTheYear( )
				}
			}, "Counter Proposal")
	)

	text = `<p class='descriptionModal'> Your company had a great start! You released your first game successfully and got your team really committed </p>
	<p class='descriptionModal-type2'> The company spent around ${ teamSalary } $ with the team Salaries </p>
	<p class='descriptionModal'>You caught the attention of some investors that are willing to negotiate with you.</br>
	They want to give you 40k $ for 20% of your company. Do you accept it? ( Don t forget that a counter proposal it's always an option. You can get
	a better evaluation of the company or the investors can turn their back on the deal ) </br>
	</br>
	What would you do?  </p>`

 	return {
 		title,
 		description: text,
 		buttons,
 	}

 }

////////////////////////////////// MID YEAR EVENT

var year0MiddleEventStory = function( income, equity, team, pC ){

	let year0 = {
      middleEvent : {}
    }

	var title = 'Event Middle'
	var text = `<p class='descriptionModal'>Since you've started to work with a team, the game is developing
	faster since the beggining but you can't shake the feeling that the company could do a lot better, the team
	is unorganized and not that commited as you expected.</p>
	<p class='descriptionModal-type2'> What do you do? </p>
	<p class='descriptionModal'>You can raise the salary of the team, and maybe they'll be happier and more focused or
	you can start to make meetings with them, so the game is more right on track.</p>`

	var buttons = React.createElement(React.Fragment, null, 
		React.createElement("button", {
			onClick:   () => {
				year0.middleEvent = {
					event: 1,
	    			chose: "salary",
				}
				pC.closeMiddleEvent( "year0", year0 )
				}
			}, "Raise 100$ Salary"), 
		React.createElement("button", {
			onClick:  () => {
				year0.middleEvent = {
					event: 2,
	    			chose: "meetings",
				}

				pC.closeMiddleEvent( "year0", year0 )
				}
			}, "Start doing meetings")
	)

	return {
 		title,
 		description: text,
 		buttons,
 	}

}



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
 relax on the sofa and play some Doom. With that in mind, you decided that your next game will take any kind of genre but will, for sure, be a bloody gory game`


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


///////////////////////////////// YEAR 4 //////////////////////////////////

//Resources
//https://medium.com/seed-digital/how-to-business-model-canvas-explained-ad3676b6fe4a

var modelCanvasExplanation = `Everything is going perfect with the company and you started to figure it out how to go to market with
your games. And for that, your created a Canvas... And you know, if you fill the canvas for your third game, it will be a sure hit on the market
Every big company used this canvas and it's named Business Modal Canvas. It's purpose is to quickly and easily define your product / game`



var description4YearValuePropositions = `Here you have to describe the purpose of your game. What it as to offer to your client/player. What does the player have to win with your game?
Trains logic or reaction? Learn to strategy in a online game? Working together in a co-op game? In a nutshell, why would someone want to have this problem solved?
What does your game offers, that can be converted in a value to the player?`

var description4YearCustomerSegments = `In the customer Segment your think of your target player and try to break them in small parts. For gender, age, interests or habits.
This way you can start to check the market for what does this group of targets look for, what type of genre, story or commitment to the game`

var description4YearCustomerRelationships = `The Customer Relationship is what bounds and sticks the player to your game, is what makes the player go back to it the day after... If you are talking of a PvP ( Player vs Player) game, probably the competitive games,
if you are developing an MMORPG, level system are the thing to look. If the game is a solid Single Player
, it can be focus on the "Collectathon" or the Story. Try to think and explorer what the player really looks forward when playing a game. Think of your self playing that type of game. What do you want from it?`

var description4YearChannels = `Channels is what makes the player find your game. What channel does your game is mentioned? through facebook? Ads on mobile applications? A Brand activision?
It's important to have this figured it out. If this fails, your game will not be mentioned and will not have the credit it deserves. Normaly the channels to approach is studied on marketing campaigns`

var description4YearKeyActivities = `The Key Activities is what resources does your company need to create and mantain the game your are building.
When creating a game you have to worry about desigining, development, marketing... And after creating a game, you need to figure it out how you will maintain it.
Probably you will need patches, testing, updating.. If you think in realeasing DLCs and new features, you need to invest on the story and testing.
What is the activities your game need to offer the value proposition to your players?`

var description4YearKeyResources = `What resources you need to make your game doable. You need staff/team, computers, internet, office space, workshops, electricity... Think of every resource you need
if you want your company to make a game`

var description4YearKeyPartners = `Your partners are third parties company that help you build the game. The best example for this is to think what platform you will be releasing your game, if it's a mobile app, your partners
will be Apple or Google ( AppStore or PlayStore ), if you choose a PC game, than Steam, Epic Game Laucher, Humble Bundle Store will be your partners. 
The Partners are external companies that help you create, maintain and distribute your product/game`

var description4YearCostStructure = `Your product have costs being created ( Key Activities ), you need to worry about sustaining a valueable product once it goes live ( patches, updates, server, DataBases )
How much do you pay for your partnerships? 2 Years from now, what do you think you will have to pay for your server? For this answer, i dont want you to think precise costs but to write what are the costs you need to 
worry about when your game is created and goes live`

var description4YearRevenueStream = `The Revenue Streams is one of the thinks that makes the wheels turn and keep to product moving. This is what makes your income grow, what let's the company
keep going forward and what pays the games that you are making. Where does your game makes money? what way? Through selling the game itself? By microtransactions or maybe Ads revenue? There's a lot of ways
to bring revenue to the company.. Always keep one think in mind, the revenue that comes from the game needs to be equal or bigger to the costs related to his development.`


 var year4Story = function( income, equity, team, pC ){


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



var recapScreen = function( state, pC ){

	var { title, description } = createRecapBasedOnChoices( state )

	var buttons = React.createElement(React.Fragment, null, 
		React.createElement("button", {
			onClick:   () => {
				pC.changeYear('next')
				}
			}, " Continue ")
	)

	return {
 		title,
 		description,
 		buttons,
 	}

};class Timer extends React.Component {
//1800000 30 minutos
  constructor( props ){
    super( props )

    this.timer30Minutes = 6 * 3 //60 * 30
    this.actualTimer = 0
    // 20 80
    this.middleYearEvent = getRandomInt( (this.timer30Minutes/ 2) - 2 , (this.timer30Minutes/ 2) + 5 )

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
    let valueInPercentage = parseInt( ( this.actualTimer * 100 ) / this.timer30Minutes )
    let isTimerPaused = false

    $('.imageInnerFiller').animate({
        width: valueInPercentage + '%'
    })

    if( this.middleYearEvent == this.actualTimer ){
      this.props.middleEventTrigger()
    }

    var timerValue = giveMinutesAndSeconds( this.actualTimer )
    this.setState({ 
      timerValue,
    })
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
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 6 ? 'filled' : '') }`})
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
}

function countSalary( teamObj ){
    
};ReactDOM.render(
  React.createElement(PageContent, null),
  document.getElementById('content')
);
