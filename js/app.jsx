class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      company: {
        name: ''
      }
    }

    this.goNext = this.goNext.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
  }

  goNext(){
    let year = this.state.year

    this.setState({
      year: ( year < 6 ? this.state.year + 2 : 6 )
    })
  }

  editCompanyState( name, value ){
    this.setState({
      'company' : {
        [ name ] : value
      }
    })
  }

  renderModule(){

    switch ( this.state.year ) {
      case 0:
        return <Module_0Year editCompanyState={ this.editCompanyState } />
        break;
      case 2:
        return <Module_2Year/>
        break;
      case 4:
        return <Module_4Year/>
        break;
      case 6:
        return <Module_6Year/>
        break;
      default:
      console.log( "retornou null" )
        return null;

    }

  }

  render(){
    console.log( this.state )
    return(
      <React.Fragment>
        <Timer year={ this.state.year }/>
        <div className='structure'>
          {this.renderModule()}
        </div>
        <Footer
          goNext={ this.goNext }
        />
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
    return ( this.props.description == null ? null : 
      <div className="inputDescriptionDiv" onClick={ this.expandDiv }>
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
        <div className="descriptionInnerChild" style={{display: this.state.showDescription ? 'block' : 'none' }}>
          <p>{this.props.description}</p>
        </div>
      </div>
    )
  }

  render(){

    return(
      <React.Fragment>
        <p>{this.props.title}</p>
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

  render(){

    return(
      <div className='inputDiv'>
        {this.props.children}
        { this.props.size == null ? 
                  <input onChange={ e => this.props.valueReceived( e.target.value ) } /> :
                  <textarea onChange={ e => this.props.valueReceived( e.target.value ) } /> }
      </div>
    )
  }

}
;class Footer extends React.Component {

  constructor( props ){
    super( props )
  }



  render(){
    return(
      <div className='footer'>
        <button onClick={ this.props.goNext }>next</button>
      </div>
    )
  }

}
;class Module_0Year extends React.Component {

  constructor( props ){
    super( props )

  }

  render() {

    return(

      <div className='module'>

        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "name", value ) }>
           <Description title='Company Name' />
        </InputBlock>
        <InputBlock 
          valueReceived={ value => this.props.editCompanyState( "companyDescription", value ) }
          size='large'>
           <Description title='Description ( Optional )'/>
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
  }

  render() {

    return(
      <div className='module'>
        Year2
        <input onValue={ e => console.log( e )}></input>
      </div>
    )

  }

}
;class Module_4Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      <div className='module'>
        YEAR 5
        <input onValue={ e => console.log( e )}></input>
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
;var descriptionPlatform = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Maecenas mauris dolor, lobortis id ipsum vitae, dapibus tincidunt est. Pellentesque mattis
 pretium nisi, sed rutrum lectus faucibus a. Morbi pretium mi tortor. Fusce ac vestibulum diam,
 tempus gravida metus. Pellentesque dictum purus ut lectus tempor fermentum. `
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
  'Mobile',
  'Xbox One',
  'NES ( Going full retro )',
  'Nintendo DS / 3DS'
]
;class Timer extends React.Component {
//1800000 30 minutos
  constructor( props ){
    super( props )

    this.timer30Minutes = 60 * 30
    this.actualTimer = 0

    this.state = {
      year: props.year,
      progress: 10,
    }

    this.incr = this.incr.bind( this )
    this.startTime = this.startTime.bind( this )
  }

  componentDidMount(){
    this.incr()
    this.startTime()
  }

  startTime(){

console.log(  this.actualTimer )
console.log(  this.timer30Minutes )
     if ( this.actualTimer < this.timer30Minutes) {
        setInterval(() => {
            this.actualTimer++;
            console.log("A PASSAR AQUI")
            this.startTime();

        }, 1000);
    }


  }

  resetTimer(){

  }

  incr(){
    setTimeout(() => {
      this.setState({
        progress: ( this.state.progress < 100 ? this.state.progress + 2 : 100 )
      })
      this.incr()
    }, 2000 )
  }

  static getDerivedStateFromProps(props, state) {
    return {
      year: props.year
    }
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
          <div className='imageInnerFiller' style={{ width: this.state.progress + "%" }}>
          </div>
        </div>

        <div className='counter'>10:10</div>

      </div>
    )
  }

}
;ReactDOM.render(
  <PageContent/>,
  document.getElementById('content')
);
