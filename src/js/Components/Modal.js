class Modal extends React.Component {
	
	constructor( props ){
		super( props )

		this.state = {
			numberButtons: props.numberButtons || 1 
		}

		this.innerStyle={
			width: this.props.width || '450px',
			height: this.props.height || '350px',
		}

	}

	render(){

		return(
			<div className='modal'>
				<div className='modalInner' style={ this.innerStyle }>
					<div className='header'>
						<h3 className='titleModal'> { this.props.title } </h3>
					</div>
					<div className='body'>
						<p className='descriptionModal'> { this.props.description } </p>
					</div>
					<div className='footer center'>
						{this.props.children}
					</div>
				</div>
			</div>
		)

	}

}