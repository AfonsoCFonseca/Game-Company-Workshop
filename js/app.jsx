class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 2,
      goingDev: true,
      isPaused: true,
      moduleShow: false,  // Ecra de Eventos
      optionalScreen: false, // Ecra de entrada e final
      middleEvent: false, // Trigger para o middle Event
      recapEvent: false, // Recap Event após o modulo final
      company: {
        name: '',
        income: 2500,
        equity: 100,
        team: null,
        year0:{
          middleEvent: null,
        },
        year2:{
          middleEvent: null,
        },
        year4:{
          middleEvent: null,
        }
      },
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
    this.changeOfLastYear = this.changeOfLastYear.bind( this )
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

  changeYear( type, toSendBack ){

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

    if( toSendBack ) this.changeOfLastYear( toSendBack )

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

    actualState = objInsideChecker( actualState, name, value )
    this.setState( actualState )
  }

  editCompanyState( name, value ){
    var company = this.state.company || {}

    company = objInsideChecker( company, name, value )
    this.setState({ company })
  }

  renderStoryModal( ){

    var { title, description, buttons } = createStory( this.state, this )
    if( !buttons ) buttons = <button onClick={ ( ) => this.changeYear( "next", null ) }>Confirm</button>

    return (
      <Modal
        title={title}
        description={description}>
        { buttons }
      </Modal>
    )

  }

  changeOfLastYear( toSendBack ){

    switch( this.state.year ){
      case 0:
        this.editCompanyState( "vision", toSendBack.vision )
        this.editCompanyState( "income", toSendBack.finalTotal )
        if( toSendBack.developerLeft == true ){
          var team = this.state.company.team
          team.developers -= 1
          this.editCompanyState( "team", team )
        }
        break;
      case 2:
        break;
      case 4:
        break;
      default: console.log( "failed year")
    }

  }

///////RECAP SCREEN
  recapTheYear( recapOfYearText, year ){
    this.setState({ recapEvent: true })
    this.editCompanyState( 'year' + year , { "recapOfYearText": recapOfYearText } )
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
    this.editCompanyState( eventName, eventToUpdate )

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
         return <EndingCard
          sendEverything={ this.state }
          exportToImage={ this.exportToImage } />
      }
      else{
         return <BeginningCard
          goNext={ this.startCompany } />
      }

    }

    switch ( this.state.year ) {
      case 0:
        return <Module_0Year editGeneralState={ this.editGeneralState }
          editCompanyState={ this.editCompanyState } />
        break;
      case 2:
        return <Module_2Year editGeneralState={ this.editGeneralState }
          company={ this.state.company }
          editCompanyState={ this.editCompanyState } />
        break;
      case 4:
        return <Module_4Year editGeneralState={ this.editGeneralState }
          editCompanyState={ this.editCompanyState }/>
        break;
      default:
        console.log( "retornou null" )
        return null;

    }

  }

  render(){

    return(
      <React.Fragment>
        { !this.state.optionalScreen ? <Toolbar company={ this.state.company } /> : null }
        { !this.state.optionalScreen ? <Timer
          year={ this.state.year }
          nextYear={ this.prepareNextYear }
          isTimerPaused={ this.state.isPaused }
          middleEventTrigger={ this.renderMiddleYearModal }
        /> : null }

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
            goPrevious={ this.changeYear }
          /> :
          null
        }
      </React.Fragment>
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
			<div className='beginningCard'>
				<div className='beginningCard-inner'>
					<h3 className='title'>Start Your Videogame Company Now</h3>
					<div className='beginningCard-text'>

						<p className="beginningCard-label">Introduction</p>
						<p className='beginningCard-descrp'>{startingCardIntroduction}</p>

						<p className="beginningCard-label">How To</p>
						<p className='beginningCard-descrp'>{startingCardHowTo}</p>

						<p className="beginningCard-label">Story</p>
						<p style={{marginBottom : '25px'}} className='beginningCard-descrp'>{startingCardStory}</p>
					</div>

					<input 
						onChange={ event => this.title = event.target.value }
						className={`beginningCard-input ${ this.state.missingTitle ? "missingTitle" : ""}`}
						placeholder='Company Name'></input>
					<textarea 
						onChange={ event => this.description = event.target.value }
						className='beginningCard-textarea'
						placeholder='Small Description'></textarea>

					<button className='beginningCard-button' onClick={ () => this.checkInit() }>Start</button>
					<label className='beginningCard-label'>When ready, press "Start"</label>

				</div>
			</div>
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

    this.renderOption = this.renderOption.bind( this )
  }

  renderOption(){

    var newArrayEntries = this.props.dataEntries.slice();
    let options

    if( this.props.placeholder ){
      newArrayEntries.unshift( this.props.placeholder )
    }
    
    if( this.props.locked == null ){
      options = newArrayEntries.map( ( entry, i ) => {
        if( i == 0) return ( <option defaultValue disabled key={`dataEntry_${entry}`}>{entry}</option> )
        return ( <option key={`dataEntry_${entry}`}>{entry}</option> )
      })
    }
    else {
      options = newArrayEntries.map( ( entry, i ) => {
        if( entry == this.props.locked ) return ( <option selected key={`dataEntry_${entry}`}>{entry}</option> )
        else return ( <option key={`dataEntry_${entry}`}>{entry}</option> )
      })
    }

    return options

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        <select
          placeholder={ this.props.placeholder }
          disabled={ this.props.locked ? true : false }
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

    this.onValueChange = this.onValueChange.bind( this )

    this.state = {
      inputValue: props.inputValue,
    }
  }


  static getDerivedStateFromProps( props, state ) {

      return {
          inputValue: props.inputValue
      }
  }


  inputRender(){

    if( this.props.inputTile == null )
      return <input  value={ this.state.inputValue } onChange={ this.onValueChange } />
    else{
      return (
        <div className='inputDivInner'>
          <p>{ this.props.inputTile }</p>
          <input
            value={ this.state.inputValue }
            className={ this.props.typeDiv == "small" ? "small" : "" }
            onChange={ this.onValueChange } />
          { this.props.multiplier ? <p className='inputDivInnerPlus'>{ this.state.inputValue * this.props.multiplier } $ x per month</p> : null }
        </div> )
    }

  }

  onValueChange( e ){
    var value = e.target.value

    if( this.props.numbers ){
      if( value >= 0 && value <= 4 ){
        this.props.valueReceived( value )
      }
    }
    else this.props.valueReceived( value )

  }

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        { this.props.size == null ?
            this.inputRender() :
            <textarea placeholder={ this.props.placeholder } onChange={ e => this.props.valueReceived( e.target.value ) } /> 
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
			selectedOption: this.props.valuesSent[0],
		}

		this.handleOptionChange = this.handleOptionChange.bind( this )
		this.props.valueReceived( this.props.valuesSent[0] )
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
};const EndingCard = ( props ) => {
	var everything = props.sendEverything
	var company = everything.company

	function makeTextForPdf(){
		return ( 
			<React.Fragment> 

					<div className='yearCapDiv'>
						<p>2 Years</p> 
					</div> 
					<div className='textIncome'>
						<p>First Game:</p> 
						<label>${company.income}</label> 
					</div> 
				<hr/>

					<div className='yearCapDiv'>
						<p>4 Years</p> 
					</div> 
					<div className='textIncome'>
						<p>First Game:</p> 
						<label>${company.income}</label> 
					</div> 
					<div className='textIncome'>
						<p>Investment</p> 
						<label>${company.income}</label> 
					</div> 
				<hr/>

					<div className='yearCapDiv'>
						<p>6 Years</p> 
					</div>
					<div className='textIncome'>
						<p>First Game:</p> 
						<label>${company.income}</label> 
					</div> 
				<hr/>

				<div style={{marginTop : '20px'}} className='textIncome'>
					<p>Total Income:</p> 
					<label>${company.income}</label> 
				</div> 
			</React.Fragment> 
		)
	}


	this.endingOverview = makeTextForPdf( )

	return(
		<div className='endingCard'>
			<div className='endingCard-inner'>
				<h3 className='title'>The Company made 6 Years</h3>
				<div className='endingCard-text'>
					<p>{endingCardDescription}</p>
				</div>

				<div id='endingCard-overview'>
					<h3 className='title'>Company Overview</h3> 
					{ this.endingOverview }
				</div>

				<button className='endingCard-button' onClick={ () => props.exportToImage() }>Download Overview</button>
				<label className='endingCard-label'>Download your Workshop, click thhe button above </label>

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
        <button onClick={ () => this.props.goPrevious( 'previous', null ) }>back</button>
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

    this.getRadioTeamValue = this.getRadioTeamValue.bind( this )

    this.focusYear0 = focusYear0[ getRandomInt( 0, focusYear0.length - 1 ) ]

    this.updateToParent = this.updateToParent.bind( this )
  }


  getRadioTeamValue( value ){
    let teamChoice = {}

    if( value.indexOf( 'Developers' ) !== -1 ){
      teamChoice = {
        'developers': 2,
      }
    }
    else{
      teamChoice = {
        'developers': 1,
        'artists': 1,
      }
    }

    this.props.editCompanyState( 'year0', { "teamChoice": teamChoice } )
    this.props.editCompanyState( "team", teamChoice )

  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year0", { [name]: value })
  }

  render() {

    return(
      <div className='module'>
        <TextField title='Your Focus' textValue={ this.focusYear0 }/>

        <RadioButtonBlock
            valuesSent={ visionArrayYear0 }
            valueReceived={ value => this.updateToParent( "vision", value ) }>
           <Description title='Vision' description={ vision0YearDescription }/>
        </RadioButtonBlock>

        <InputBlock
          valueReceived={ value => this.updateToParent( "gameName", value ) }>
          <Description title='Game Name' />
        </InputBlock>

        <DropdownBlock
          dataEntries={ genres }
          placeholder='Pick a genre'
          valueReceived={ value => this.updateToParent( "genres", value ) }>
          <Description title={ 'Genre' }/>
        </DropdownBlock>

        <DropdownBlock
          dataEntries={ platforms }
          placeholder='Pick a platform'
          valueReceived={ value => this.updateToParent( "platform", value ) }>
          <Description title={ 'Platform' } />
        </DropdownBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "gameDescription", value ) }>
           <Description title='Game Mechanics, Features or Story' />
        </InputBlock>

        <RadioButtonBlock
            valuesSent={ teamArrayYear0 }
            valueReceived={ this.getRadioTeamValue }>
           <Description title='Team' description={ team0YearDescription }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "environment", value ) }>
           <Description title='Company Environment' description={ environment0YearDescription }/>
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "teamBuilding", value ) }>
           <Description title='Team Building' description={ teamBuilding0YearDescription }/>
        </InputBlock>

      </div>
    )

  }

}
;class Module_2Year extends React.Component {

  constructor( props ){
    super( props )

    this.focusPos = getRandomInt( 0, 2 )
    this.focusDescription = focusDescription[ this.focusPos ]
    this.dropdownGenre = null
    if( this.focusPos == 0 ){// 1 simiulation
      this.dropdownGenre = "Simulation"
      this.updateToParent( "genres", this.dropdownGenre )
    }
    else if( this.focusPos == 1 ){// 2 RTS
      this.dropdownGenre = "Real-time strategy (RTS)"
      this.updateToParent( "genres", this.dropdownGenre )
    }

    this.getRadioOffice = this.getRadioOffice.bind( this )
    this.joinMembersTeam = this.joinMembersTeam.bind( this )

    var developers, artists
    if( props.company.team ){
      developers = props.company.team.developers
      artists = props.company.team.artists
    }

    this.getDescriptionYear2 = getDescriptionYear2( props.company.vision )


    this.state = {
      team: {
        developers: developers || 0,
        artists: artists || 0,
        designers: 0,
        sfx: 0,
        marketing: 0,
      },
      descriptionForUnfocusTeam: null,
    }
  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year2", { [name]: value })
  }

  getRadioOffice( value ){
    var descriptionForUnfocusTeam = getDescriptionUnfocusTeam( value )

    this.setState( {descriptionForUnfocusTeam })
    this.updateToParent( "officeChoice", value )

  }

  joinMembersTeam( value, depart ){
    var team = this.state.team
    team[depart] = value
    this.setState({ team })
    this.props.editCompanyState( "team", team )
  }



  render() {
console.log( this.props.company )
    return(
      <div className='module'>

        <TextField title='Focus' textValue={ this.focusDescription }/>

        <RadioButtonBlock
            valuesSent={ officeSpaceArrayYear2 }
            valueReceived={ this.getRadioOffice }>
           <Description title='Office' description={ officeSpaceYear2Description }/>
        </RadioButtonBlock>

        <InputBlock
          inputTile={ "Developers" }
          typeDiv={'small'}
          numbers={true}
          multiplier={1000}
          inputValue={ this.state.team.developers }
          valueReceived={ value =>  this.joinMembersTeam( value, "developers") }>
           <Description
              title={ `Where to spend the money ${ ( this.props.company.team == null || this.props.company.team.developers < 1 ? "( You need developers! )" : "" )}` }
              description={ descriptionSpentMoney } />
        </InputBlock>
        <InputBlock
          inputTile={ "Artists" }
          typeDiv={'small'}
          numbers={true}
          multiplier={900}
          inputValue={ this.state.team.artists }
          valueReceived={ value =>  this.joinMembersTeam( value, "artists") }>
        </InputBlock>
        <InputBlock
          inputTile={ "Designers" }
          typeDiv={'small'}
          numbers={true}
          multiplier={900}
          inputValue={ this.state.team.designers }
          valueReceived={ value =>  this.joinMembersTeam( value, "designers") }>
        </InputBlock>
        <InputBlock
          inputTile={ "SFX Studio" }
          typeDiv={'small'}
          numbers={true}
          multiplier={800}
          inputValue={ this.state.team.sfx }
          valueReceived={ value =>  this.joinMembersTeam( value, "sfx") }>
        </InputBlock>
        <InputBlock
          inputTile={ "Marketing" }
          typeDiv={'small'}
          numbers={true}
          multiplier={850}
          inputValue={ this.state.team.marketing }
          valueReceived={ value =>  this.joinMembersTeam( value, "marketing") }>
        </InputBlock>

        <InputBlock
          size='large'
          placeholder='Scheduel, meetings, goals, working methodologies'
          valueReceived={ value => this.updateToParent( "biggerTeam", value ) }>
           <Description
              title='Bigger Team'
              description={ biggerTeamYear2Description } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "unfocusTeam", value ) }>
           <Description
              title='Unfocused Team'
              description={ this.state.descriptionForUnfocusTeam }/>
        </InputBlock>

        <TextField title='Second Game' textValue={ this.getDescriptionYear2 }/>

        <InputBlock
          valueReceived={ value => this.updateToParent( "gameNameYear2", value ) }>
          <Description title='Game Name' />
        </InputBlock>

        <DropdownBlock
          dataEntries={ genres }
          locked={ this.dropdownGenre }
          placeholder='Pick a genre'
          valueReceived={ value => this.updateToParent( "genres", value ) }>
          <Description title={ 'Genre' }/>
        </DropdownBlock>

        <DropdownBlock
          dataEntries={ platforms }
          placeholder='Pick a platform'
          valueReceived={ value => this.updateToParent( "platformYear2", value ) }>
          <Description title={ 'Platform' } />
        </DropdownBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "gameGameMechanicsyear2", value ) }>
           <Description title='Game Mechanics' />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "gameUniqueFeatureyear2", value ) }>
           <Description 
           description={gameUniqueFeatureyear2}
           title='Unique Feature' />
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

  updateToParent( name, value ){
    this.props.editCompanyState( "year4", { [name]: value })
  }

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
;const genres = [
  'Platform games',
  'Shooter games',
  'Beat em up games',
  'Stealth game',
  'Survival games',
  'Battle royale',
  'Action-adventure',
  "Simulation",
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
]

const visionArrayYear0 = [
  "Simple but addictive games",
  "Focus on the story",
  "Online Competitive"
]

const officeSpaceArrayYear2 = [
  'Small but with other start-ups near',
  'Bigger but isolated'
]
;var createRecapBasedOnChoices = function( state ){
console.log( state.year )
		switch( state.year ){
			case 0:
				return year0Recap( state )
				break;
			case 2:
				return year2Recap( state )
				break;
			case 4:
				return year4Recap()
				break;
	}

}


function year0Recap( state ){

	var companyYear = state.company.year0

	/*// INVESTEMENT END EVENT
	var investment = 0
	var equity = 80
	if( companyYear.endEvent == "accept" ){
		investment = 40000
	}
	else{
		investment = 30000
	}
	<div class='recap-numbers'>
		Investment <label>+${investment}</label>
	</div>*/

	//SALARIES
	var plus = 0
	if( companyYear.middleEvent && companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "salary" )
		plus = 100

	salaries = countSalary( state.company.team, plus)
	var total =  salaries.total * 24
	var developersSalary = salaries.developersSalary * 24
	var artistsSalary = salaries.artistsSalary * 24

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
	// finalTotal += ( investment + gameRevenue )
	finalTotal -= developersSalary
	finalTotal -= artistsSalary
	finalTotal -= infrastructures

	var toSendBack = {
		vision: companyYear.vision,
		finalTotal,
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

	var textOfTheYear = `${companyYear.recapOfYearText}. Your game went well ,sellings were great ( however you were not profitable, yet ) and
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
	console.log("/////")
	console.log( state )

	var companyYear = state.company.year2

//Investment
	var investment = 0
	if( companyYear.endEvent == "100k" ){
		investment = 100000
	}
	else if( companyYear.endEvent == "500k" ){
		investment = 500000
	}

//SALARIES
	var plus = 100
	if( state.company.year0 && state.company.year0.middleEvent 
		&& state.company.year0.middleEvent.event1 && state.company.year0.middleEvent.chose == 1 ){
		plus = 200
	}

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
	var infrastructures = 4800 // 200

//OFFICE
	var office = 2000
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		office = 1500


//GAME
	var gameRevenue = 65000
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		gameRevenue += 10000

	if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "lead")
		gameRevenue += 5000

	if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "accept" )
		gameRevenue += 5000

	gameRevenue += makeMathWithTeamSelection( salaries )

	function makeMathWithTeamSelection( ){
		//salaries
		return 0
	}


//TOTAL
	var finalTotal = office + gameRevenue + infrastructures + totalSalary

	// HTML DOM
	//Falta middle eventr
	var middleEvent = ""
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
		if( companyYear.middleEvent.chose == "lead" ) middleEvent = `You made one of the developers lead programmer and helped a lot. He organized the sprints and developments and the game sold better because of the quality of the code.`
		if( companyYear.middleEvent.chose == "ignore" ) middleEvent = `Ignoring the proposal of one of the developers to became a Lead programmer made him unfocused and uninterested on the job he's doing.`
	}
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
		if( companyYear.middleEvent.chose == "accept" ) middleEvent = `You accepted that one of the developers start working for other company at the same time. The responsabilty 
				he took made him work harder and make a better game for ${ state.company.name }. Your game sold better because of that choice.`
		if( companyYear.middleEvent.chose == "reject" ) middleEvent = `Ignoring the proposal of one of the developers to make a feature for other company made him unfocused and uninterested on the job he's doing.`
	}

	var textOfTheYear  = `${companyYear.recapOfYearText} ${ middleEvent }`

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
		title: "4 Years have passed",
		description,
	}
}


function year4Recap(){
	return {
		title: "year 4",
		description: "description 4"
	}
}
;
var createStory = function( state, parentComponent ){

 	var company = state.company

 	var title = ""

 	switch( state.year ){
 		case 0:
 			if( state.middleEvent == true ) return year0MiddleEventStory( company, parentComponent)
 			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year0Story( company, parentComponent )
 			title = '2 Years have passed'

		case 2:
			if( state.middleEvent == true ) return year2MiddleEventStory( company, parentComponent )
			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year2Story( company, parentComponent )
 			title = "4 Years have passed"

		case 4:
 			return year4Story( company, parentComponent )

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

var startingCardHowTo = `This web application simulates two years of your company life for each thirty minutes of real life. You
will start the event with 2500$, some of the choices will be yours, others will pre-determined, be honest, give original answers and enjoy the workshop.` 

var startingCardStory = `You are about to start your company. To do so, write down the name for the company and a small description
of something unique with it`

let endingCardDescription = `Congratulations. Your company is up and running for six years.
Below you can see the overview of the comapany since the beginning.`


////////////////////////////////// YEAR 0 //////////////////////////////////

var gameCompanyDescription = `To make great games, you need to start a company first. Your company is what gives soul to your games and your team.
	For that, start by establishing and vision and goals.`

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

var environment0YearDescription = `From now on you'll have an office to maintain. You can set the rules and see if it makes sense, from the
	working scheduel, to behaviour inside the office, you are the one to have the last word. Can people work remotely? Can the team make breaks and play videogames?
	Tell some of the rules you would like to settle`

var teamBuilding0YearDescription = `Team bulding means activities that you and your team do, not related with company work, normaly used to enhance social
	relations and create bounds between the members. For instances, a board game on monday nights, going to the cinema every month or camping every two month... Just think of some fun
	activities that you and your team would do outside the office.`

var vision0YearDescription = `To make things more fun, pick one of the choices down below. Your choice for the vision of the games you are creating
	will affect some inputs and choices you'll have to make in the next years`


let intro1Focus = "You are in front of your computer and ready to start think about the game that your company will make."
let focusYear0First = `${intro1Focus} You know that you wanna do something different for the consoles.
Think of a mobile game that you love and try to make similar game but for a console`

let focusYear1First = `${intro1Focus} You wanna do something different, so you are making your main game mechanics based on sound`

let focusYear2First = `${intro1Focus} You are feeling pretty confident and relaxed, so you decided that this game will be something pretty relaxing.
Something like ( Journey, Everything or Katamari )`

var focusYear0 = [
	focusYear0First,
	focusYear1First,
	focusYear2First
]

////////////////////////////////// MAIN EVENT

 var year0Story = function( company, pC ){

 	var otherVision = getOtherVisionFromArray( company.year0.vision )

	var text = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'> Your company had a great start! You released your first game successfully and got your team really committed </p>
		<p class='descriptionModal'>In a meeting with your team, one of the members started questioning if the company vision "${company.year0.vision || ""}" made sense.</br>
		He thinks you should go for a "${ otherVision }" perspective and change your first decision for the company</br>
		</br>
		Remember, you should listen to the team but you have the final decision</p>
		<p class='descriptionModal-type2'>What do you do?</p>
	</div>`

	var firstChoice = `You change your mind and went with this new "${ otherVision }" as vision for your company. The other member
	saw this happenning and felt unsure about your decision, that led him to quit ${ company.name }`

	var secondChoice = `You choose to remain with your vision for the company. You know what is better for you and for your team to pursuit.`

	var year0 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year0 = {
						endEvent: "changeVision"
					}
					pC.editCompanyState( "year0", year0 )
					pC.recapTheYear( firstChoice, 0 )

				}
			}>Change Vision</button>
		<button
			onClick={ () => {
					year0 = {
						endEvent: "dontChange"
					}
					pC.editCompanyState( "year0", year0 )
					pC.recapTheYear( secondChoice, 0 )

				}
			}>Stay with your ideia</button>
	</React.Fragment>

 	return {
 		title: "2 Years have passed",
 		description: text,
 		buttons,
 	}

}

////////////////////////////////// MID YEAR EVENT

var year0MiddleEventStory = function( company, pC ){

	let year0 = {}
  year0.middleEvent = {}
// YOu can see some progression in your game but you still feel that the team can do better and be more productive. They are commited but not organized
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
			year0.middleEvent = {
				event: 1,
    			chose: "salary",
			}
			pC.closeMiddleEvent( "year0", year0 )
			}
		}>Raise 100$ Salary</button>
	<button
		onClick={ () => {
			year0.middleEvent = {
				event: 1,
    			chose: "meetings",
			}
			pC.closeMiddleEvent( "year0", year0 )
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
			year0.middleEvent = {
				event: 2,
    			chose: "beta",
			}
			pC.closeMiddleEvent( "year0", year0 )
			}
		}>Beta Version</button>
	<button
		onClick={ () => {
			year0.middleEvent = {
				event: 2,
    			chose: "ignore",
			}
			pC.closeMiddleEvent( "year0", year0 )
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

 var focusOption1 = `This 2 years of work taught you a lot but i ve learn a lot from games too... All your life you ve played simulation games.
 From Sims and Simcity, to goat simulator. You know, for sure, that this type of game can teach a lot to people. So you decide to make that genre on your next game`

 var focusOption2 = `You are RTS ( real time strategy ) lover. You played everything Age of empires, Warcraft III, Rome total war... You name it.
 The ideia of making RTS game doesn't leave your mind, so you decided that your second game will be an RTS... And you wanna try something new on the genre`

 var focusOption3 = `The last 2 years were pretty stressfull and that made you take great pleasure in gory games. After a day of work you just want to
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
 		title: '4 Years have passed',
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


 var year4Story = function( company, pC ){


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

	var { title, description, toSendBack } = createRecapBasedOnChoices( state )

	var code
	var validationCode
	if( state.year == 0 ) validationCode = "1991"
	else if( state.year == 2 ) validationCode = "JAN"
	else if( state.year == 4 ) validationCode = "JAN17"

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
;class Timer extends React.Component {
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
      <React.Fragment>
        <div className={ `twoYearsBatch ${ (this.state.year >= 2 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 4 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 6 ? 'filled' : '') }` }></div>
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
					<p>Cash: <b>{ this.state.income }</b></p>
					<p>Equity: <b>{ this.state.equity }%</b></p>
					<p>Team: <b>{ this.state.team }</b></p>
				</div>
			</div>
		)
	}
}
;function giveMinutesAndSeconds( seconds ){
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

function countSalary( teamObj, plus = 0 ){
    
    var developers = artists = designers = sfx = marketing = 0
    if( teamObj ){
        developers = teamObj.developers | 0 
        artists = teamObj.artists || 0
        designers = teamObj.designers || 0
        sfx = teamObj.sfx || 0
        marketing = teamObj.marketing || 0
    }

    var totalSalary = 0
    var developersSalary = 0
    var artistsSalary = 0
    var designersSalary = 0
    var sfxSalary = 0
    var marketingSalary = 0

    developersSalary = developers * ( 900 + plus )
    artistsSalary = artists * ( 800 + plus )
    designersSalary = developers * ( 800 + plus )
    sfxSalary = artists * ( 700 + plus )
    marketingSalary = developers * ( 750 + plus )

    return {
        total: developersSalary + artistsSalary + designersSalary + sfxSalary + marketingSalary,
        developersSalary,
        artistsSalary,
        designersSalary,
        sfxSalary,
        marketingSalary
    }

}

function objInsideChecker( actualState, name, value ){

    if( actualState[ name ] ){
      
      if( typeof value === 'object' ){
        for( var x in value ){
          actualState[ name ][x] = value[x]
        }
      }
      else actualState[ name ] = value
    }
    else actualState[ name ] = value


    return actualState
}

function getOtherVisionFromArray( vision ){

    var notThis = null
    for( var i = 0; i < visionArrayYear0.length; i++ ){
        if( vision == visionArrayYear0[i] ) notThis = i
    }
    
    var newPos;
    do{
        newPos = getRandomInt(0,2)
    } while( notThis == newPos )

    return visionArrayYear0[newPos]

};ReactDOM.render(
  <PageContent/>,
  document.getElementById('content')
);
