class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      goingDev: true,
      isPaused: false,
      moduleShow: false,
      company: {
        name: '',
        income: getRandomInt( 2000, 2500 ),
        equity: 100,
        team: null,
      }
    }

    this.goPreviousYear = this.goPreviousYear.bind( this )
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

  goPreviousYear(){
    let year = this.state.year

     this.setState({
      year: ( year > 0 ? this.state.year - 2 : 0 ),
      isPaused: false,
      moduleShow: false,
    })
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
    if( !buttons ) buttons = <button onClick={ this.changeYear }>Confirm</button>

    return (
      <Modal
        title={title}
        description={description}>
        { buttons }
      </Modal>
    )

  }

  renderModule(){

    switch ( this.state.year ) {
      case 0:
        return <Module_0Year editCompanyState={ this.editCompanyState } />
        break;
      case 2:
        return <Module_2Year editCompanyState={ this.editCompanyState } />
        break;
      case 4:
        return <Module_4Year editCompanyState={ this.editCompanyState }/>
        break;
      case 6:
        return <Module_6Year editCompanyState={ this.editCompanyState }/>
        break;
      default:
        console.log( "retornou null" )
        return null;

    }

  }

  render(){

    return(
      <React.Fragment>
        <Toolbar
          company={ this.state.company }
        />

        <Timer
          year={ this.state.year }
          nextYear={ this.prepareNextYear }
          isTimerPaused={ this.state.isPaused }
        />

        { this.state.moduleShow ? this.renderStoryModal() : null }

        <div className='structure'>
          {this.renderModule()}
        </div>
        {
         this.state.goingDev ?
          <Footer
            goNext={ this.prepareNextYear }
            logState={ () => console.log( this.state ) }
            pauseState= { this.stopTime }
            goPrevious={ this.goPreviousYear }
          /> :
            null
        }
      </React.Fragment>
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
    return ( this.props.description == null ? <p>{this.props.title}</p> : 
      <div className="inputDescriptionDiv">
        <p className='withDescriptionTitle'>{this.props.title}</p>
        <i className="fa fa-info-circle" aria-hidden="true" onClick={ this.expandDiv }></i>
        <div className="descriptionInnerChild" style={{display: this.state.showDescription ? 'block' : 'none' }}>
          <p>{this.props.description}</p>
        </div>
      </div>
    )
  }

  render(){

    return(
      <React.Fragment>
        { this.renderDescriptionDiv() }
      </React.Fragment>
    )
  }


}
;class DropdownBlock extends React.Component{

  constructor( props ){
    super( props )
  }

  renderOption(){

    let options = this.props.dataEntries.map( entry => {
      return ( <option key={`dataEntry_${entry}`}>{entry}</option> )
    })

    return options

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        <select 
          className="dropdownList"
          onChange={ event  => this.props.valueReceived( event.target.value )} >
          {this.renderOption()}
        </select>
      </div>
    )
  }

}
;class InputBlock extends React.Component{

  constructor( props ){
    super( props )

  }

  inputRender(){

    if( this.props.inputTile == null )
      return <input onChange={ e => this.props.valueReceived( e.target.value ) } />
    else{
      return ( 
        <div className='inputDivInner'>
          <p>{ this.props.inputTile }</p>
          <input className={ this.props.typeDiv == "small" ? "small" : "" } onChange={ e => this.props.valueReceived( e.target.value ) } />
        </div> )
    }

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        { this.props.size == null ? 
            this.inputRender() :
            <textarea onChange={ e => this.props.valueReceived( e.target.value ) } /> 
        }
      </div>
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
			<div className='modal'>
				<div className='modalInner' style={ this.innerStyle }>
					<div className='header'>
						<h3 className='titleModal'> { this.props.title } </h3>
					</div>
					<div className='body' dangerouslySetInnerHTML={{__html: this.props.description}}>
						
					</div>
					<div className='footer center'>
						{this.props.children}
					</div>
				</div>
			</div>
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
				<div key={ `radio ${ option }` } className="radio">
			      <label>
			        <input type="radio" value={ option } 
	                  checked={ this.state.selectedOption === option } 
	                  onChange={ this.handleOptionChange } />
			        { option }
			      </label>
			    </div>
			)

		})

		return( 
			<div className="radioButtonDiv">
			 	{ options }
			</div> 
		)

	}

	render(){
		return(
		<div className="inputDiv">	
			{ this.props.children }
			{ this.renderOptions() }
		</div>
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
		<div className='textFieldDiv'>
			<h3>{ title }</h3>
			<div className='textFieldDiv'>
				<p>{ text }</p> 
			</div>
		</div>
	)
};class Footer extends React.Component {

  constructor( props ){
    super( props )
  }



  render(){
    return(
      <div className='footer'>
        <button onClick={ this.props.goPrevious }>back</button>
        <button onClick={ this.props.goNext }>next</button>
        <button onClick={ this.props.logState }>Log</button>
        <button onClick={ this.props.pauseState }> Pause</button>
      </div>
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

      <div className='module'>

        <TextField title='Company' textValue={ gameCompanyDescription }/>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "name", value ) }>
           <Description title='Company Name' />
        </InputBlock>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "companyDescription", value ) }
          size='large'>
           <Description title='Description ( Optional )' />
        </InputBlock>

        <RadioButtonBlock 
            valuesSent={ teamArrayYear0 }
            valueReceived={ this.takeInputValueFromRadioButton }>
           <Description title='Team' description={ team0YearDescription }/>
        </RadioButtonBlock>

        <TextField title='First Game' textValue={ firstGameDescription }/>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "gameName1", value ) }>
           <Description title='Game Name' />
        </InputBlock>

        <DropdownBlock 
          dataEntries={ genres }
          valueReceived={ value => this.props.editCompanyState( "genres", value ) }>
          <Description title={ 'Genre' } description={ descriptionPlatform }/>
        </DropdownBlock>

        <DropdownBlock 
          dataEntries={ platforms }
          valueReceived={ value => this.props.editCompanyState( "platform", value ) }>
          <Description title={ 'Platform' } />
        </DropdownBlock>

      </div>

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
      <div className='module'>

        <TextField title='Focus' textValue={ this.focusDescription }/>


        <InputBlock 
          inputTile={ "Developers" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "sentMoneyYear2", value ) }>
           <Description 
              title='Where to spend the money'
              description={ descriptionSpentMoney } />
        </InputBlock>
        <InputBlock 
          inputTile={ "Designers" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
        </InputBlock>
        <InputBlock 
          inputTile={ "SFX Studio" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
        </InputBlock>
        <InputBlock 
          inputTile={ "Marketing" }
          typeDiv={'small'}
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
        </InputBlock>

        <TextField title='Second Game' textValue={ secondGameDescription }/>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "gameTitle2", value ) }>
           <Description 
              title='Game Title'/>
        </InputBlock>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "gameDescription2", value ) }
          size='large'>
           <Description 
              title='Game genre, style, mechanics'/>
        </InputBlock>

      </div>
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
      <div className='module'>
        <TextField title='Getting the hang of it' textValue={ modelCanvasExplanation }/>

        <div className='businessModuleCanvas'>

          <div className='imgDiv'>
            <img src='/public/images/business_Model_Canvas_Template.jpg' />
            <img src='/public/images/maxresdefault.jpg' />
          </div>
          <div className='textDiv'>
            <a href="/public/images/business_Model_Canvas_Template.jpg" download>Business Modal Canvas ( empty )</a>
            <a href="/public/images/maxresdefault.jpg" download>Business Modal Canvas ( filled )</a>
          </div>
        </div>

         <InputBlock
            size='large'
            valueReceived={ value => this.props.editCompanyState( "ValuePropositions", value ) }>
             <Description
                title='Value Propositions'
                description={ description4YearValuePropositions } />
        </InputBlock>


         <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CustomerSegments", value ) }>
           <Description
              title='Customer Segments'
              description={ description4YearCustomerSegments } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CustomerRelationships", value ) }>
           <Description
              title='Customer Relationships'
              description={ description4YearCustomerRelationships } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "Channels", value ) }>
           <Description
              title='Channels'
              description={ description4YearChannels } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyActivities", value ) }>
           <Description
              title='Key Activities'
              description={ description4YearKeyActivities } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyResources", value ) }>
           <Description
              title='Key Resources'
              description={ description4YearKeyResources } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyPartners", value ) }>
           <Description
              title='Key Partners'
              description={ description4YearKeyPartners } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CostStructure", value ) }>
           <Description
              title='Cost Structure'
              description={ description4YearCostStructure } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "RevenueStream", value ) }>
           <Description
              title='Revenue Stream'
              description={ description4YearRevenueStream } />
        </InputBlock>

      </div>
    )

  }

}
;class Module_6Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      <div className='module'>
        YEAR 8 
        <input onValue={ e => console.log( e )}></input>
      </div>
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
	They want to give you 40k $ for 20% of your company. Do you accept it? ( Don t forget that a counter proposal it's always an option. You can get
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
;class Timer extends React.Component {
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
      <React.Fragment>
        <div className={ `twoYearsBatch ${ (this.state.year >= 2 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 4 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 6 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 8 ? 'filled' : '') }` }></div>
      </React.Fragment>
    )

  }

  render(){
    return(
      <div className='timer'>

        <div className='title'>Year { this.state.year } of your Company</div>

        <div className='imageCounter'>
          <div className='imageInnerObject'>
            <div className='firstStep'>
            </div>

          </div>
          <div className='imageInnerFiller'>
          </div>
        </div>
        <div className='totalTimer'>
          { this.drawYearTiles() }
        </div>
        <div className='counter'>{ this.state.timerValue }</div>

      </div>
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
			<div className='toolBar'>
				<div className='left'>
					<p style={{marginLeft: '10px'}} > <b>{ this.substringTheCompanyName( this.state.companyName ) } </b></p>
				</div>
				<div className='right'>
					<p>Income: <b>{ this.state.income }</b></p>
					<p>Equity: <b>{ this.state.equity }%</b></p>
					<p>Team: <b>{ this.state.team }</b></p>
				</div>
			</div>
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
  <PageContent/>,
  document.getElementById('content')
);
