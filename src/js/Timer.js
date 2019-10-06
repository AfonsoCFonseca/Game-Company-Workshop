class Timer extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: props.year,
      progress: 10,
    }

    this.incr = this.incr.bind( this )
  }

  componentDidMount(){
    this.incr()
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

        <div className='title'>{this.state.year}</div>

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
