class Module_6Year extends React.Component {

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
