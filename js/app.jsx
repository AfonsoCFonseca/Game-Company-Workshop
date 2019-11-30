class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.backup = null

    this.state = {
      year: 2,
      goingDev: true,
      isPaused: false,
      moduleShow: false,  // Ecra de Eventos
      optionalScreen: false, // Ecra de entrada e final
      middleEvent: false, // Trigger para o middle Event
      recapEvent: false, // Recap Event após o modulo final
      company: {
        name: '',
        income: 2500,
        equity: 100,
        team: null,
        year1:{
          middleEvent: null,
        },
        year2:{
          middleEvent: null,
        },
        year3:{
          middleEvent: null,
        }
      },
      bill: {},
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
    this.startDoingBackups = this.startDoingBackups.bind( this )

  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown )

    this.backup = new Backup( this.state );
    this.startDoingBackups()
  }

  startDoingBackups(){
    var timer = 60000 //minute
    //var timer = 300000 //5 minutes
    //var timer = 6000 //6 seconds

    setInterval( _ => {
      console.log( "Doing backup... ")
      this.backup.addBackUp( this.state )
    }, timer )
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
        case B_KEY:
          this.setState({ goingDev: !this.state.goingDev })
          break;
        default:
      /*    if( key == this ) B_KEY.setState({ goingDev: !this.state.goingDev })*/
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
      if( year <= 2 ){
        nextYear = this.state.year + 1
      }
      else {
        nextYear = 2
        optionalScreen = true
      }
    }
    else if( type == "previous")
      nextYear = ( year > 0 ? this.state.year - 1 : 0 )

    if( toSendBack ) this.changeOfLastYear( toSendBack )

    this.setState({
      year: nextYear,
      isPaused: false,
      moduleShow: false,
      recapEvent: false,
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
    var replace = name == "team" ? true : false 
    company = objInsideChecker( company, name, value, replace )
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
      case 1:
        this.editCompanyState( "vision", toSendBack.vision )
        this.editCompanyState( "income", toSendBack.finalTotal )
        var bill = this.state.bill
        bill.year1 = toSendBack.bill
        this.setState({ bill })
        if( toSendBack.developerLeft == true ){
          var team = this.state.company.team
          team.developers -= 1
          this.editCompanyState( "team", team )
        }
        break;
      case 2:
        this.editCompanyState( "income", toSendBack.finalTotal )
        this.editCompanyState( "equity", toSendBack.equity )
        var bill = this.state.bill
        bill.year2 = toSendBack.bill
        this.setState({ bill })
        break;
      case 3:
        this.editCompanyState( "income", toSendBack.finalTotal )
        var bill = this.state.bill
        bill.year3 = toSendBack.bill
        this.setState({ bill })
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
      if( this.state.year == 2 ){
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
      case 1:
        return <Module_1Year editGeneralState={ this.editGeneralState }
          editCompanyState={ this.editCompanyState } />
        break;
      case 2:
        return <Module_2Year editGeneralState={ this.editGeneralState }
          company={ this.state.company }
          editCompanyState={ this.editCompanyState } />
        break;
      case 3:
        return <Module_3Year editGeneralState={ this.editGeneralState }
          company={ this.state.company }
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
            backup={ () => this.backup.getLastBackup() }
          /> :
          null
        }
      </React.Fragment>
    )
  }

}
;class Backup {
  constructor( state ) {
   	this.firstBackup = state 
   	this.backup = {
   		third: null,
   		second: null,
   		first: null,
   	}
   	this.addBackUp( state )
   	this.backLength = 3
  }

  getLastBackup(){
  	console.log( this.backup )
  	this.downloadBackup( this.backup["first"] )

  }

  addBackUp( state ){
  	var third = this.backup.second 
  	this.backup.third = third

  	var second = this.backup.first
  	this.backup.second = second

  	var first = state
  	this.backup.first = first
  }

  logBackupSpecific( pos ){
  	return this.backup[ pos ] 
  }

  logBackup(){
  	return this.backup
  }

  downloadBackup( json ){
  	console.log( json )
  	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
	var dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href",     dataStr     );
	dlAnchorElem.setAttribute("download", "scene.json");
	dlAnchorElem.click();
  }

};class BeginningCard extends React.Component {

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
      return <input placeholder={ this.props.placeholder } value={ this.state.inputValue } onChange={ this.onValueChange } />
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

      if( this.props.limit && value >= 0 && value <= this.props.limit ){
        this.props.valueReceived( value )
      }
      else if( value >= 0 && value <= 4 ){
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
	if( textValue ){
		if( typeof textValue === "string" ){
			text = textValue
		}
		else {
			text = textValue[ getRandomInt( 0, textValue.length ) ]
		}
	}


	return(
		<div className='textFieldDiv'>
			<h3>{ title }</h3>
			{ textValue != null ? <div className='textFieldDiv'><p>{ text }</p> </div> : null }
		</div>
	)
};const EndingCard = ( props ) => {
	var everything = props.sendEverything
	var company = everything.company

	var bill = everything.bill
	function makeTextForPdf(){
		return ( 
			<React.Fragment> 
					<hr/>
					<h3 className='title'>Company Overview</h3> 
					<div className='yearCapDiv'>
						<p>1 Years</p> 
					</div> 
					{ 
						bill.year1 ? 
						<React.Fragment>
							<div className='textIncome'>
								<p>First Game:</p> 
								<label>+{bill.year1.game}$</label> 
							</div>
							<div className='textIncome'>
								<p>Expanses:</p> 
								<label>-{bill.year1.expanses}$</label> 
							</div>
						</React.Fragment>   : null 
					}
					
				<hr/>

					<div className='yearCapDiv'>
						<p>2 Years</p> 
					</div>
					{ 
						bill.year2 ? 
						<React.Fragment>
							<div className='textIncome'>
								<p>Second Game:</p> 
								<label>+{bill.year2.game}$</label> 
							</div> 
							<div className='textIncome'>
								<p>Investment</p> 
								<label>+{bill.year2.investment}$</label> 
							</div>
							<div className='textIncome'>
								<p>Expanses:</p> 
								<label>-{bill.year2.expanses}$</label> 
							</div>
						</React.Fragment> : null
					}
				<hr/>

					<div className='yearCapDiv'>
						<p>3 Years</p> 
					</div>
					{ 
						bill.year3 ? 
						<React.Fragment>
							<div className='textIncome'>
								<p>Thrid Game:</p> 
								<label>+{bill.year3.game}$</label> 
							</div> 
							<div className='textIncome'>
								<p>Expanses:</p> 
								<label>- {bill.year3.expanses}$</label> 
							</div> 
						</React.Fragment> : null
					}
				<hr/>

				<div style={{marginTop : '20px'}} className='textIncome'>
					<p>Total Cash:</p> 
					<label>{company.income}$</label> 
				</div> 
				<div className='textIncome'>
					<p>Company Equity:</p> 
					<label>{company.equity}%</label> 
				</div> 
			</React.Fragment> 
		)
	}

	function year1Choice(){

		if ( !bill.year1 ) return null
		var year1 = company.year1

		return (
			<React.Fragment> 
				<h3 className='title'>Choices Year 1</h3> 
				<div style={{marginTop: '20px'}} className='textIncome choices'>
					<p><b>Vision: </b> { year1.vision || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Game Name: </b> { year1.gameName || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Game genre: </b> { year1.genres || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Game Description: </b> { year1.gameDescription || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Game Unique Feature: </b> { year1.gameUniqueFeatureyear1 || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Team Choice: </b> <br/> 
						Developers - { year1.teamChoice.developers } <br/> 
						{ year1.teamChoice.artists ? `Artists - ${ year1.teamChoice.artists }` : null }
					</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Workshop: </b> {year1.workshop || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Environment: </b> { year1.environment || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Team Building: </b> { year1.teamBuilding || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Middle Event: </b> { year1.middleEvent ? year1.middleEvent.chose : "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>End Event: </b> { year1.endEvent || "" }</p>  
				</div>
			</React.Fragment> 
		)
	}

	function drawTeamFor2Year(){
		if( !company.team ) return null

		var team = company.team
		var mStr = ""

		for( var x in team ){
			mStr += `${x} - ${ team[x] }, `
		}
		console.log( mStr )
		return (
			<div className='textIncome choices'>
				<p><b>Team Choice: </b> <br/> 
					{ mStr }
				</p>  
			</div>
			)
	}


	function year2Choice(){
		if ( !bill.year2 ) return null
		var year2 = company.year2

		return(
			<React.Fragment> 
				<h3 className='title'>Choices Year 2</h3> 
				<div className='textIncome choices'>
					<p><b>Game Name: </b> {year2.gameNameYear2 || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Game Genre: </b> {year2.genres || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Game Mechanics: </b> {year2.gameMechanicsyear2 || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>GamePlay loop: </b> {year2.gameplayLoop || ""}</p>  
				</div>
				{ drawTeamFor2Year() }
				<div className='textIncome choices'>
					<p><b>Office: </b> {year2.officeChoice || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Digital Marketing: </b> {year2.marketingOrDesign || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Bigger Team: </b> {year2.biggerTeam || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Unfocused Team: </b> {year2.unfocusTeam || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Middle Event: </b> { year2.middleEvent ? year2.middleEvent.chose : ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>End Event: </b> {year2.endEvent || ""}</p>  
				</div>
			</React.Fragment> 
		)
	}

	function year3Choice(){
		if ( !bill.year3 ) return null

		var year3 = company.year3
		
		return(
			<React.Fragment> 
				<h3 className='title'>Choices Year 3</h3> 
				<div className='textIncome choices'>
					<p><b>Game Name: </b> {year3.gameNameYear3 || ""}</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Value Proposition: </b> {year3.ValuePropositions || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Customer Segments: </b> {year3.CustomerSegments || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Customer Relationships: </b> {year3.CustomerRelationships || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Key Resources: </b> {year3.KeyResources || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Revenue Stream: </b> {year3.RevenueStream || "" }</p>  
				</div>

				<div className='textIncome choices'>
					<p><b>Team Confort: </b> {year3.spentConfort || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Maintenace: </b> {year3.spentMaintenance || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Job Training: </b> {year3.spentJobTraining || "" }</p>  
				</div>

				<div className='textIncome choices'>
					<p><b>Interview: </b> {year3.interviewValues || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>2 Questions: </b> {year3.questionsToMake || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Bootcamp: </b> {year3.bootcamp || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Gamejam: </b> {year3.gamejam || "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>Middle Event: </b> { year3.middleEvent ? year3.middleEvent.chose : "" }</p>  
				</div>
				<div className='textIncome choices'>
					<p><b>End Event: </b> {year3.endEvent || "" }</p>  
				</div>
			</React.Fragment> 
		)
	}	


	function makeChoicesOverview(){

		return( 
			<React.Fragment> 
				{ company.name ? <h2 className='title'>{ company.name }</h2>  : null }
	  			{ year1Choice() }
	  			{ year2Choice() }
	  			{ year3Choice() }
      		</React.Fragment> 
		)
		
	}


	return(
		<div className='endingCard'>
			<div className='endingCard-inner'>
				<h3 className='title'>The Company made 3 Years</h3>
				<div className='endingCard-text'>
					<p>{endingCardDescription}</p>
				</div>

				<div id='endingCard-overview'>

					{ makeChoicesOverview( ) }
					{ makeTextForPdf( ) }
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
        <button onClick={ this.props.backup }> Backup</button>
      </div>
    )
  }

}
;class Module_1Year extends React.Component {

  constructor( props ){
    super( props )

    this.getRadioTeamValue = this.getRadioTeamValue.bind( this )

    this.focusYear1 = focusYear1[ getRandomInt( 0, focusYear1.length - 1 ) ]

    this.updateToParent = this.updateToParent.bind( this )
  }


  getRadioTeamValue( value ){
    var teamChoice = {}

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

    this.props.editCompanyState( "team", teamChoice )
    this.props.editCompanyState( 'year1', { "teamChoice": teamChoice } )

  }

  updateToParent( name, value ){
    this.props.editCompanyState( "year1", { [name]: value })
  }

  render() {

    return(
      <div className='module'>
        <TextField title='Your Focus' textValue={ this.focusYear1 }/>

        <TextField title='First Game'/>

        <RadioButtonBlock
            valuesSent={ visionArrayYear1 }
            valueReceived={ value => this.updateToParent( "vision", value ) }>
           <Description title='Vision' description={ vision1YearDescription }/>
        </RadioButtonBlock>

        <InputBlock
          placeholder='Insert game name'
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
          placeholder="Describe game mechanics, features or Story"
          valueReceived={ value => this.updateToParent( "gameDescription", value ) }>
           <Description title='Features Description' />
        </InputBlock>

        <InputBlock
          size='large'
          placeholder="A funny easter egg, social interactions or unlockables" 
          valueReceived={ value => this.updateToParent( "gameUniqueFeatureyear1", value ) }>
           <Description 
           description={gameUniqueFeatureyear1}
           title='Unique Feature' />
        </InputBlock>

        <TextField title='Team'/>

        <RadioButtonBlock
            valuesSent={ teamArrayYear1 }
            valueReceived={ this.getRadioTeamValue }>
           <Description title='Team' description={ team1YearDescription }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "environment", value ) }>
           <Description title='Company Environment' description={ environment1YearDescription }/>
        </InputBlock>

        <RadioButtonBlock
            valuesSent={ giveRecomendationArr }
            valueReceived={ value => this.updateToParent( "workshop", value ) }>
           <Description title='"WorkShoping"' description={ RadioRecomendationdDescription }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "teamBuilding", value ) }>
           <Description title='Team Building' description={ teamBuilding1YearDescription }/>
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

    return(
      <div className='module'>

        <TextField title='Focus' textValue={ this.focusDescription }/>

        <TextField title='Second Game' textValue={ this.getDescriptionYear2 }/>

        <InputBlock
          placeholder='Insert game name'
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
          placeholder="Levels, points, leaderboards, resource managment..." 
          valueReceived={ value => this.updateToParent( "gameMechanicsyear2", value ) }>
           <Description title='Game Mechanics'
            />
        </InputBlock>

        <RadioButtonBlock
            valuesSent={ payForDesignOrMarketing }
            valueReceived={ value => this.updateToParent( "marketingOrDesign", value ) }>
           <Description title='Design or Marketing' description={ designOrMarketingDescription }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          placeholder={ gameplayloopPlaceholder }
          valueReceived={ value => this.updateToParent( "gameplayLoop", value ) }>
           <Description title='Gameplay Loop' description={ gameplayloopDescription } />
        </InputBlock>

        <TextField title='Team'/>

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

      </div>
    )

  }

}
;class Module_3Year extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      spentConfort: 0,
      spentMaintenance: 0,
      spentJobTraining: 0,
    }
  }

  //'https://www.gamasutra.com/blogs/SergioJimenez/20131106/204134/Gamification_Model_Canvas.php'

  updateToParent( name, value ){
    this.props.editCompanyState( "year3", { [name]: value })
  }

  updateSpentValues( name, value ){
    this.setState({ [name]: value })
    this.updateToParent( name, value )
  }

  render() {

    return(
      <div className='module'>
        <TextField title='Business Model Canvas' textValue={ modelCanvasExplanation }/>

        <div className='businessModelCanvas'>

          <div className='imgDiv'>
            <img src='/public/images/business_Model_Canvas_Template.jpg' />
            <img src='/public/images/maxresdefault.jpg' />
          </div>
          <div className='textDiv'>
            <a href="/public/images/business_Model_Canvas_Template.jpg" download>Business Modal Canvas ( empty )</a>
            <a href="/public/images/maxresdefault.jpg" download>Business Modal Canvas ( filled )</a>
          </div>
        </div>

        <TextField title='Third Game'/>

        <InputBlock
            valueReceived={ value => this.updateToParent( "gameNameYear3", value ) }>
             <Description
                title='Game Name'/>
        </InputBlock>

         <InputBlock
            size='large'
            valueReceived={ value => this.updateToParent( "ValuePropositions", value ) }>
             <Description
                title='Value Propositions'
                description={ description3YearValuePropositions } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "CustomerSegments", value ) }>
           <Description
              title='Customer Segments'
              description={ description3YearCustomerSegments } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "CustomerRelationships", value ) }>
           <Description
              title='Customer Relationships'
              description={ description3YearCustomerRelationships } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "KeyResources", value ) }>
           <Description
              title='Key Resources'
              description={ description3YearKeyResources } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "RevenueStream", value ) }>
           <Description
              title='Revenue Stream'
              description={ description3YearRevenueStream } />
        </InputBlock>

        <InputBlock
          inputTile={ "Team Confort" }
          typeDiv={'small'}
          numbers={true}
          limit={ 5000 }
          valueReceived={ value =>  this.updateSpentValues( "spentConfort", value ) }
          inputValue={ this.state.spentConfort }>
           <Description
              title={ `Where to Spend Money` }
              description={ explanationTeamExpanses } />
        </InputBlock>
        <InputBlock
          inputTile={ "Job Training" }
          typeDiv={'small'}
          numbers={true}
          limit={ 5000 }
          inputValue={ this.state.spentJobTraining }
          valueReceived={ value =>  this.updateSpentValues( "spentJobTraining", value ) }>
        </InputBlock>
        <InputBlock
          inputTile={ "Maintenance" }
          typeDiv={'small'}
          numbers={true}
          limit={ 5000 }
          inputValue={ this.state.spentMaintenance }
          valueReceived={ value =>  this.updateSpentValues( "spentMaintenance", value ) }>
        </InputBlock>

        <InputBlock
          size='large'
          placeholder={ explanationTeamExpansesPlaceHolder }
          valueReceived={ value => this.updateToParent( "explanationExpanses", value ) }>
           <Description
              title='Explain the cash expanses ( Optional )'/>
        </InputBlock>

        <TextField title='Team'  textValue={teamDescriptionYear3}/>

         <InputBlock
          size='large'
          placeholder='Energetic, Motivational, Organized...'
          valueReceived={ value => this.updateToParent( "interviewValues", value ) }>
           <Description
              title='Values in people'
              description={ teamValuesInterviewYear3 } />
        </InputBlock>

        <RadioButtonBlock
            valuesSent={ bootcampArr }
            valueReceived={ value => this.updateToParent( "bootcamp", value ) }>
           <Description 
            title='Interns' 
            description={ explanationForBootcamp }/>
        </RadioButtonBlock>

        <RadioButtonBlock
            valuesSent={ gamejamArr }
            valueReceived={ value => this.updateToParent( "gamejam", value ) }>
           <Description 
            title='GameJam' 
            description={ explanationForGamejam }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          placeholder='Do you have any personal projects? What do you see doing 5 years from now?'
          valueReceived={ value => this.updateToParent( "questionsToMake", value ) }>
           <Description
              title='Two Questions'
              description={ team2QuestionsToMake } />
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

const teamArrayYear1 = [
  '1 Developer, 1 Artist',
  '2 Developers'
]

const visionArrayYear1 = [
  "Simple but addictive games",
  "Focus on the story",
  "Online Competitive"
]

const officeSpaceArrayYear2 = [
  'Small but with other start-ups near ( 1500 per month )',
  'Bigger but isolated ( 2000 per month )'
]

const payForDesignOrMarketing = [
  'A nice webpage and instagram presence ( 1500$ webpage and 300 x 15 insta-posts = 1800$ )',
  'Digital Marketing campaign on facebook ( 10$ x 90days = 900$)',
  "Nothing. I don't wanna spent money"
]

const giveRecomendationArr = [
  'Game-Design Seminar',
  'Pro Gaming Workshop',
  'SFX for Games Workshop',
  'Keep working on your game'
]

const gamejamArr = [ 
  "I dont know, maybe not",
   "Let them do it"
 ]

 const bootcampArr = [ 
  "Organize the bootcamp every 3 months ( price )",
  "It's a kind of expansive, maybe later"
];var createRecapBasedOnChoices = function( state ){

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
	    
	    return mStr
  }


	// FINAL TEXT
	var extraDlc = null
	var fine = null
	var middleEvent = ""
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
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
;var middleChoice1 = getRandomInt( 1, 2 )
var middleChoice2 = getRandomInt( 1, 2 )
var middleChoice3 = getRandomInt( 1, 2 )

var createStory = function( state, parentComponent ){

 	var company = state.company

 	var title = ""

 	switch( state.year ){
 		case 1:
 			if( state.middleEvent == true ) return year1MiddleEventStory( company, parentComponent, middleChoice1 )
 			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year1Story( company, parentComponent )
 			title = '1 Year have passed'

		case 2:
			if( state.middleEvent == true ) return year2MiddleEventStory( company, parentComponent, middleChoice2)
			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year2Story( company, parentComponent )
 			title = "2 Years have passed"

		case 3:
			if( state.middleEvent == true ) return year3MiddleEventStory( company, parentComponent, middleChoice3 )
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

var startingCardHowTo = `This web application simulates one year of your company life for each thirty minutes ( approximately ) of real life. You
will start the event with 2500$, some of the choices will be yours, others will pre-determined, be honest, give original answers and enjoy the workshop.` 

var startingCardStory = `You are about to start your company. To do so, write down the name for the company and a small description
of something unique you wanna do with it`

let endingCardDescription = `Congratulations. Your company is up and running for three years.
Below you can see the overview of the company since the beginning.`


////////////////////////////////// YEAR 1 //////////////////////////////////

var gameCompanyDescription = `To make great games, you need to start a company first. Your company is what gives the soul to your games and your team.
    For that, start by establishing and vision and goals.`

var descriptionPlatform = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Maecenas mauris dolor, lobortis id ipsum vitae, dapibus tincidunt est. Pellentesque mattis
    pretium nisi, sed rutrum lectus faucibus a. Morbi pretium mi tortor. Fusce ac vestibulum diam,
    tempus gravida metus. Pellentesque dictum purus ut lectus tempor fermentum. `

var firstGameDescription = `Your company is pretty fresh and still needs some money to start betting in big ideas for games.
    Start by creating a game small but addictive, choosing a hot genre ( Moba's, autochess ) but with an original twist.
    The game needs to be an assure hit to bring some money and investment to the company`

var team1YearDescription = `Pick one of the options below for starting your team. Don't forget that what you choose will reflect on your games
    If you go for a designer and a developer, your game will have a great UX/UI design and some unique style but I'll have a few bugs.
    If you go for two developers, you'll choose a bug-free game but it will lack the design and a unique touch`

var environment1YearDescription = `From now on you'll have an office to maintain. You can set the rules and see if it makes sense, from the
    working schedule, to behavior inside the office, you are the one to have the last word. Can people work remotely? Can the team make breaks and play videogames?
    Tell some of the rules you would like to settle`

var teamBuilding1YearDescription = `Teambuilding means activities that you and your team do, not related to company work, normally used to enhance social
    relations and create bounds between the members. For instance, a board game on Monday nights, going to the cinema every month or camping every two months... Just think of some fun
    activities that you and your team would do outside the office.`

var vision1YearDescription = `To make things more fun, pick one of the choices down below. Your choice for the vision of the games you are creating
    will affect some inputs and choices you'll have to make in the next years`

var RadioRecomendationdDescription = `You got invited to some workshops/Seminars related to game development.
You can invite your team to go or ignore it and keep doing your game.`


let intro1Focus = "You are in front of your computer and ready to start thinking about the game that your company will make."
let focusYear1First = `${intro1Focus} You know you wanna do something different for the consoles.
Think of a mobile game that you love and try to make a similar game but for a console`

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

    var firstChoice = `You change your mind and went with this new "${ otherVision }" as vision for your company. The other member saw this happening and felt unsure about your decision, which led him to quit ${ company.name }`

    var secondChoice = `You choose to remain with your vision for the company. You know what is better for you and your team to pursuit.`

	var year1 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year1 = {
						endEvent: "Changed Vision",
						visionChanged: otherVision
					}
					pC.editCompanyState( "year1", year1 )
					pC.recapTheYear( firstChoice, 1 )

				}
			}>Change Vision</button>
		<button
			onClick={ () => {
					year1 = {
						endEvent: "Kept the vision"
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

var year1MiddleEventStory = function( company, pC, version ){

	let year1 = {}
  year1.middleEvent = {}

    var text1 = `
    <div class='descriptionDiv'>
        <p class='descriptionModal'>You can see some progression in your game but you have the feeling that your team can do better and be more productive. They are committed but unorganized.</p>
        <p class='descriptionModal-type2'> What do you do? </p>
        <p class='descriptionModal'>1.Raise the salary of the team, and maybe, they'll be happier and more focused<br/>
    2.Start doing regular meetings with them, to increase effectiveness and productivity</p>
	</div>`

	var buttons1 = <React.Fragment>
	<button
		onClick={  () => {
			year1.middleEvent = {
				event: 1,
    			chose: "Salary Raised",
			}
			pC.closeMiddleEvent( "year1", year1 )
			}
		}>Raise 100$ Salary</button>
	<button
		onClick={ () => {
			year1.middleEvent = {
				event: 1,
    			chose: "Start meetings",
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
    			chose: "Make beta game",
			}
			pC.closeMiddleEvent( "year1", year1 )
			}
		}>1. Beta Version</button>
	<button
		onClick={ () => {
			year1.middleEvent = {
				event: 2,
    			chose: "Ignore beta game",
			}
			pC.closeMiddleEvent( "year1", year1 )
			}
		}>2. Ignore</button>
	</React.Fragment>

	var description = version == 1 ? text1 : text2
	var buttons = version == 1 ? buttons1 : buttons2

	return {
 		title: "Middle Year Event",
 		description: description,
 		buttons: buttons,
 	}

}



////////////////////////////////// YEAR 2 //////////////////////////////////

 var descriptionSpentMoney = `Making the right decision at the right time is everything. Check what went bad on your recap of the last 2 years
and focus on that. Choose wisely when thinking about where to spend the company money. Investing in growing your team is always a good move.
 Check if you need a new department, like UX/UI Design, new artists, SFX, more developers or someone to promote your game
 and take care of marketing.`

 var focusOption1 = `This year of work taught you a lot but I've learned a lot from games too... All your life you've played simulation games.
 From Sims and Simcity, to goat simulator. You know, for sure, that this type of game can teach a lot to people. So you decide to make that genre on your next game`

 var focusOption2 = `You are RTS ( real-time strategy ) lover. You played everything Age of empires, Warcraft III, Rome total war... You name it.
 The idea of making RTS game doesn't leave your mind, so you decided that your second game will be an RTS... And you wanna try something new on the genre`

 var focusOption3 = `The last year was pretty stressful and that made you take great pleasure in gory games. After a day of work you just want to relax on the sofa and play some Doom. With that in mind, you decided that your next game will take any kind of genre but will, for sure, be a bloody gory game`

var officeSpaceYear2Description = `If you wanna get bigger, you'll need to rent a bigger office. You have two suggestions, one
is a small but cosy office in the building where other startups work and you know it would be good for networking. The other suggestion is
a much bigger office, isolated and more expansive`

var biggerTeamYear2Description = `The team keeps getting bigger and you should start to think in some standard rules,
so everything is well organized inside the office and with the game's development. Tell some of the ideas or rules you wanna
apply to your company`

var gameplayloopDescription = `Gameplay loop it's an important step to explain in the game design of a game.
Describe what ts the main activities the player do while playing, in other words, repetitive actions you do to advance in the game. Check this video for more details: https://www.youtube.com/watch?v=Sk-nbAtIUko` 

var gameplayloopPlaceholder= `In pokemon you fight through routes, heal your pokemon and reach/win gym badges` 

var designOrMarketingDescription = `Your next game will need some presence on the internet. If you have people talking about your game
you will "probably" sell better. Pick one of the options below.` 

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
	 return standard + " But don't forget that your game must be 'Simple but Addictive'. Normally that goes for mobile games with 1 single mechanic or movement "+
	 "like Super Mario Run"
	}
	else if( vision == "Focus on the story" ){
	return standard + " Keep in mind that you chose for the vision of the company 'Focus on the Story', so your next game must have something related"+
	"to that. A real-life event or some book/movie you love "
	}
 	else if( vision == "Online Competetive" ){
        return standard + " But remember, your game needs to be a 'Competitive Online Game'. You can do the same as the others.. repeat the formula, like mobas and battle royales"+
        "or you can be original and give something different a try"
     }
     return standard + " But don't forget that your game must be 'Simple but Addictive'. Normally that goes for mobile games with 1 single mechanic or movement"+
         "like Super Mario Run"
 }

 var gameUniqueFeatureyear1 = `Make something unique for this game, a story related to a Real-life event,
  a unique feature for the community, like a steam workshop or interactive playthrough for streamers and his subscribers`

////////////////////////////////// MAIN EVENT

 var year2Story = function( company, pC ){

	var text = `
    <div class='descriptionDiv'>
        <p class='descriptionModal'>On a networking event, you've talked with a lot of people, about your company, the futures of games, new trends...
            The way you talked caught the attention of two investors.</p>
        <p class='descriptionModal'>
            One offers your 100K$ for 20% of the company<br/>
            The other offers you 400K$ for 53% of the company</p>
        <p class='descriptionModal-type2'>What do you decide?</p>
    </div>`

    var firstChoice = `You raised 100k$ on a Seed round for 20% of the company. It was a wise choice... You are, no doubt, growing
    and it's better to give one step at a time..`

    var secondChoice = `You raised 400k$ on a Seed round for 53%, it's a huge round of investment but compromised your company by giving more than a half to an investor. It was a bold move and it can cost you future decisions on the company`

	var year2 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year2 = {
						endEvent: "100k Investment"
					}
					pC.editCompanyState( "year2", year2 )
					pC.recapTheYear( firstChoice, 2 )

				}
			}>100k$ for 20%</button>
		<button
			onClick={ () => {
					year2 = {
						endEvent: "400k Investment"
					}
					pC.editCompanyState( "year2", year2 )
					pC.recapTheYear( secondChoice, 2 )

				}
			}>400k$ for 53%</button>
	</React.Fragment>

 	return {
 		title: '2 Years have passed',
 		buttons,
 		description: text
 	}

 }

////////////////////////////////// MID YEAR EVENT

var year2MiddleEventStory = function( company, pC, version ){

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
    			chose: "Assign Lead Developer",
			}
			pC.closeMiddleEvent( "year2", year2 )
			}
		}>Make him Lead Developer</button>
	<button
		onClick={ () => {
			year2.middleEvent = {
				event: 1,
    			chose: "Ignored Developer",
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
    			chose: "Accept working on other feature",
			}
			pC.closeMiddleEvent( "year2", year2 )
			}
		}>Sure</button>
	<button
		onClick={ () => {
			year2.middleEvent = {
				event: 2,
    			chose: "Reject working on other feature",
			}
			pC.closeMiddleEvent( "year2", year2 )
			}
		}>Sorry but no</button>
	</React.Fragment>

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
your games. And for that, you created a Canvas... And you know, if you fill the canvas for your third game, it will be a sure hit on the market
Every big company used this canvas and it's named Business Modal Canvas. Its purpose is to quickly and easily define your product/game`



var description3YearValuePropositions = `Here you have to describe the purpose of your game. What it as to offer to your client/player. What does the player have to win with your game?
Trains logic or reaction? Learn to strategy in an online game? Working together in a co-op game? In a nutshell, why would someone want to have this problem solved?
What does your game offers, that can be converted in value to the player?`

var description3YearCustomerSegments = `In the customer Segment your think of your target player and try to break them in small parts. For gender, age, interests or habits.
This way you can start to check the market for what does this group of targets look for, what type of genre, story or commitment to the game`

var description3YearCustomerRelationships = `The Customer Relationship is what bounds and sticks the player to your game, is what makes the player go back to it the day after... If you are talking of a PvP ( Player vs Player) game, probably the competitive games,
if you are developing an MMORPG, level system is the thing to look. If the game is a solid Single Player, it can be focused on the "Collectathon" or the Story. Try to think and explorer what the player looks forward when playing a game. Think of your self playing that type of game. What do you want from it?`

var description3YearChannels = `Channels is what makes the player find your game. What channel does your game is mentioned? through facebook? Ads on mobile applications? A Brand activation?
It's important to have this figured it out. If this fails, your game will not be mentioned and will not have the credit it deserves. Normally the channels to approach is studied on marketing campaigns`

var description3YearKeyActivities = `The Key Activities is what resources does your company need to create and maintain the game you are building.
When creating a game you have to worry about designing, development, marketing... And after creating a game, you need to figure it out how you will maintain it.
Probably you will need patches, testing, updating... If you think of releasing DLCs and new features, you need to invest in the story and testing.
What are the activities your game need to offer the value proposition to your players?`

var description3YearKeyResources = `What resources you need to make your game doable. You need staff/team, computers, internet, office space, workshops, electricity... Think of every resource you need
if you want your company to make a game`

var description3YearKeyPartners = `Your partners are third parties company that helps you build the game. The best example for this is to think what platform you will be releasing your game, if it's a mobile app, your partners
will be Apple or Google ( AppStore or PlayStore ), if you choose a PC game, then Steam, Epic Game Launcher, Humble Bundle Store will be your partners.
The Partners are external companies that help you create, maintain and distribute your product/game`

var description3YearCostStructure = `Your product has costs being created ( Key Activities ), you need to worry about sustaining a valuable product once it goes live ( patches, updates, server, DataBases )
How much do you pay for your partnerships? 2 Years from now, what do you think you will have to pay for your server? For this answer, I don't want you to think precise costs but to write what are the costs you need to
worry about when your game is created and going live`

var description3YearRevenueStream = `The Revenue Streams is one of the things that makes the wheels turn and keep to product moving. This is what makes your income grow, what lets the company
keep going forward and what pays the games that you are making. Where does your game make money? what way? Through selling the game itself? By microtransactions or maybe Ads revenue? There's a lot of ways
to bring revenue to the company... Always keep one thing in mind, the revenue that comes from the game needs to be equal or bigger to the costs related to his development.`

var teamDescriptionYear3 = `You need to put someone taking care oh Human Resources Department, but for that, you need to have your
values for the company and people you want to hire`

var teamValuesInterviewYear3 = `What do you value the most for future members of the team? What type of person do you think fits best in your company interests?` 

var team2QuestionsToMake = `Tell two questions you would like to ask in an interview. The questions must be simple, direct and related to
the company environment`

var explanationTeamExpanses = `Down below you can choose where to spend money with your company.
 You have a cash limit of 15000$. Where do you want to invest?`

var explanationTeamExpansesPlaceHolder = `I decided to spend all the money on the team comfort, buying them a new relaxing area where they can play games, eat and talk` 

var explanationForBootcamp = `There's a possibility of organizing a game dev boot camp, every 3 months, for new people that wanna join your company.
   This can help them at the begging, technical and socially but it's a kind of expensive` 

var explanationForGamejam = `There are a few people of the team that want to organize a game jam during the week on the office. It will take 2 days of work and
    your developments will stop because of it. It's a good idea but not very productive`

var year3Story = function( company, pC ){

	var text = `
    <div class='descriptionDiv'>
        <p class='descriptionModal'>The company is running for 3 straight years, now it's time for expand your business.</p>
        <p class='descriptionModal-type2'>
            You have two propositions
        </p>
        <p class='descriptionModal'>
            Go to a much larger office in London and run this company from there<br/>
            Open a new small studio, in Hungary, called ${ company.name } 2.0, to focus on other game ideas that you have
        </p>
    </div>`

    var firstChoice = `You decided to open a new studio. In Hungary, you can start from scratch new ideas and explore new games,
    mechanics, platforms and ways to do revenue`

    var secondChoice = `London it's a great city for the game's development. You are sure that you'll learn a lot there and make a lot of 
    new projects and contacts`

	var year3 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year3 = {
						endEvent: "New Studio"
					}
					pC.editCompanyState( "year3", year3 )
					pC.recapTheYear( firstChoice, 3 )

				}
			}>New Studio</button>
		<button
			onClick={ () => {
					year3 = {
						endEvent: "Go to London"
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

 var year3MiddleEventStory = function( company, pC, version ){

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
    			chose: "Dlc with 1 developer",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>DLC ( 1 Dev, 1 Artist )</button>
	<button
		onClick={ () => {
			year3.middleEvent = {
				event: 1,
    			chose: "Dlc with 2 developers",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>DLC ( 2 Developer, 1 Artist )</button>
	<button
	onClick={ () => {
		year3.middleEvent = {
			event: 1,
			chose: "Ignored Dlc",
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
    			chose: "Close first Game",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>Close Your First Game</button>
	<button
		onClick={ () => {
			year3.middleEvent = {
				event: 2,
    			chose: "1 Developer fixing first game",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>1 Developer to Fix</button>
	<button
		onClick={ () => {
			year3.middleEvent = {
				event: 2,
    			chose: "No fixes on first game",
			}
			pC.closeMiddleEvent( "year3", year3 )
			}
		}>Do nothing</button>
	</React.Fragment>

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
        <div className={ `twoYearsBatch ${ (this.state.year >= 1 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 2 ? 'filled' : '') }` }></div>
        <div className={ `twoYearsBatch ${ (this.state.year >= 3 ? 'filled' : '') }` }></div>
      </React.Fragment>
    )

  }

  render(){
    return(
      <div className='timer'>

        <div className='title'> { this.state.year }º Year of your Company</div>

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
        <div className='counter'>{ ( this.state.timerValue || "00:00" ) }</div>

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
					<p>Cash: <b>{ this.state.income }$</b></p>
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
        contador += parseInt( teamObj[x] )
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

function objInsideChecker( actualState, name, value, replace = null ){

    if( actualState[ name ] ){
      
      if( typeof value === 'object' && replace == false){
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
    for( var i = 0; i < visionArrayYear1.length; i++ ){
        if( vision == visionArrayYear1[i] ) notThis = i
    }
    
    var newPos;
    do{
        newPos = getRandomInt(0,2)
    } while( notThis == newPos )

    return visionArrayYear1[newPos]

};ReactDOM.render(
  <PageContent/>,
  document.getElementById('content')
);
