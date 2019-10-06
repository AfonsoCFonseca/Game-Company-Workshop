class Module_2Year extends React.Component {

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
