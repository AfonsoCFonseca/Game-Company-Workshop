const EndingCard = ( props ) => {
	var everything = props.sendEverything
	var company = everything.company

	function makeTextForPdf(){
		return ( 
			<React.Fragment> 

					<div className='yearCapDiv'>
						<p>1 Years</p> 
					</div> 
					<div className='textIncome'>
						<p>First Game:</p> 
						<label>${company.income}</label> 
					</div> 
				<hr/>

					<div className='yearCapDiv'>
						<p>2 Years</p> 
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
						<p>3 Years</p> 
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
				<h3 className='title'>The Company made 3 Years</h3>
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

}