class Module_0Year extends React.Component {

  constructor( props ){
    super( props )

  }

  render() {

    return(

      <div className='module'>
        <DropdownBlock title='Genre' dataEntries={ genres }>
          <Description title={ 'Genre' } description={ descriptionPlatform }/>
        </DropdownBlock>
        <DropdownBlock title='Genre' dataEntries={ platforms }>
          <Description title={ 'Platform' } />
        </DropdownBlock>
      </div>

    )

  }

}
