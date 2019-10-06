class Module_4Year extends React.Component {

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
