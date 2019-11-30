const EndingCard = ( props ) => {
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

}