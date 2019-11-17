class Module_4Year extends React.Component {

  constructor( props ){
    super( props )

    console.log( props )
  }

  //'https://www.gamasutra.com/blogs/SergioJimenez/20131106/204134/Gamification_Model_Canvas.php'

  updateToParent( name, value ){
    this.props.editCompanyState( "year4", { [name]: value })
  }

  render() {

    return(
      <div className='module'>
        <TextField title='Getting the hang of it' textValue={ modelCanvasExplanation }/>

        <div className='businessModuleCanvas'>

          <div className='imgDiv'>
            <img src='/public/images/business_Model_Canvas_Template.jpg' />
            <img src='/public/images/maxresdefault.jpg' />
          </div>
          <div className='textDiv'>
            <a href="/public/images/business_Model_Canvas_Template.jpg" download>Business Modal Canvas ( empty )</a>
            <a href="/public/images/maxresdefault.jpg" download>Business Modal Canvas ( filled )</a>
          </div>
        </div>

         <InputBlock
            size='large'
            valueReceived={ value => this.props.editCompanyState( "ValuePropositions", value ) }>
             <Description
                title='Value Propositions'
                description={ description4YearValuePropositions } />
        </InputBlock>


         <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CustomerSegments", value ) }>
           <Description
              title='Customer Segments'
              description={ description4YearCustomerSegments } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CustomerRelationships", value ) }>
           <Description
              title='Customer Relationships'
              description={ description4YearCustomerRelationships } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "Channels", value ) }>
           <Description
              title='Channels'
              description={ description4YearChannels } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyActivities", value ) }>
           <Description
              title='Key Activities'
              description={ description4YearKeyActivities } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyResources", value ) }>
           <Description
              title='Key Resources'
              description={ description4YearKeyResources } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyPartners", value ) }>
           <Description
              title='Key Partners'
              description={ description4YearKeyPartners } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CostStructure", value ) }>
           <Description
              title='Cost Structure'
              description={ description4YearCostStructure } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "RevenueStream", value ) }>
           <Description
              title='Revenue Stream'
              description={ description4YearRevenueStream } />
        </InputBlock>

      </div>
    )

  }

}
