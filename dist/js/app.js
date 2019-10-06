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
        return React.createElement(Module_0Year, {editCompanyState:  this.editCompanyState})
        break;
      case 2:
        return React.createElement(Module_2Year, null)
        break;
      case 4:
        return React.createElement(Module_4Year, null)
        break;
      case 6:
        return React.createElement(Module_6Year, null)
        break;
      default:
      console.log( "retornou null" )
        return null;

    }

  }

  render(){
    console.log( this.state )
    return(
      React.createElement(React.Fragment, null, 
        React.createElement(Timer, {year:  this.state.year}), 
        React.createElement("div", {className: "structure"}, 
          this.renderModule()
        ), 
        React.createElement(Footer, {
          goNext:  this.goNext}
        )
      )
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
      React.createElement("div", {className: "inputDescriptionDiv", onClick:  this.expandDiv}, 
        React.createElement("i", {className: "fa fa-chevron-down", "aria-hidden": "true"}), 
        React.createElement("div", {className: "descriptionInnerChild", style: {display: this.state.showDescription ? 'block' : 'none'}}, 
          React.createElement("p", null, this.props.description)
        )
      )
    )
  }

  render(){

    return(
      React.createElement(React.Fragment, null, 
        React.createElement("p", null, this.props.title), 
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

    let options = this.props.dataEntries.map( entry => {
      return ( React.createElement("option", {key: `dataEntry_${entry}`}, entry) )
    })

    return options

  }

  render(){

    return(
      React.createElement("div", {className: "inputDiv"}, 
        this.props.children, 
        React.createElement("select", {
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

  render(){

    return(
      React.createElement("div", {className: "inputDiv"}, 
        this.props.children, 
         this.props.size == null ? 
                  React.createElement("input", {onChange:  e => this.props.valueReceived( e.target.value )}) :
                  React.createElement("textarea", {onChange:  e => this.props.valueReceived( e.target.value )})
      )
    )
  }

}
;class Footer extends React.Component {

  constructor( props ){
    super( props )
  }



  render(){
    return(
      React.createElement("div", {className: "footer"}, 
        React.createElement("button", {onClick:  this.props.goNext}, "next")
      )
    )
  }

}
;class Module_0Year extends React.Component {

  constructor( props ){
    super( props )

  }

  render() {

    return(

      React.createElement("div", {className: "module"}, 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "name", value )}, 
           React.createElement(Description, {title: "Company Name"})
        ), 
        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "companyDescription", value ), 
          size: "large"}, 
           React.createElement(Description, {title: "Description ( Optional )"})
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  genres, 
          valueReceived:  value => this.props.editCompanyState( "genres", value )}, 
          React.createElement(Description, {title:  'Genre', description:  descriptionPlatform })
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  platforms, 
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
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        "Year2", 
        React.createElement("input", {onValue:  e => console.log( e )})
      )
    )

  }

}
;class Module_4Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        "YEAR 5", 
        React.createElement("input", {onValue:  e => console.log( e )})
      )
    )

  }

}
;class Module_6Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        "YEAR 8",  
        React.createElement("input", {onValue:  e => console.log( e )})
      )
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
      React.createElement("div", {className: "timer"}, 

        React.createElement("div", {className: "title"}, "Year ",  this.state.year, " of your Company"), 

        React.createElement("div", {className: "imageCounter"}, 
          React.createElement("div", {className: "imageInnerObject"}, 
            React.createElement("div", {className: "firstStep"}
            )

          ), 
          React.createElement("div", {className: "imageInnerFiller", style: { width: this.state.progress + "%"}}
          )
        ), 

        React.createElement("div", {className: "counter"}, "10:10")

      )
    )
  }

}
;ReactDOM.render(
  React.createElement(PageContent, null),
  document.getElementById('content')
);
