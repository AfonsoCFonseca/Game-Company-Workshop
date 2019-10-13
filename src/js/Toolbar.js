class Toolbar extends React.Component {
	
	constructor( props ){
		super( props )

		this.state = {
			equity: props.equity || 100,
			income: props.income || 0,
			games: props.games || 0,
			companyName: props.name || "", 
			team: props.team || "", 
		}
	}

	static getDerivedStateFromProps( props, state ) {
	    return {
	      	equity: props.equity,
			income: props.income,
			games: props.games,
			companyName: props.name,
			team: props.team,
	    }
	  }

	render(){
		return(
			<div className='toolBar'>
				<div className='left'>
					<p>{ this.state.companyName }</p>
					<p>Team: { this.state.team }</p>
				</div>
				<div className='right'>
					<p>Income: { this.state.income }</p>
					<p>Equity: { this.state.equity }</p>
				</div>
			</div>
		)
	}
}