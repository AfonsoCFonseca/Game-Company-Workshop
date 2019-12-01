class Toolbar extends React.Component {

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
					<p>Cash: <b>{ makePointsInCash( this.state.income ) }$</b></p>
					<p>Equity: <b>{ this.state.equity }%</b></p>
					<p>Team: <b>{ this.state.team }</b></p>
				</div>
			</div>
		)
	}
}
