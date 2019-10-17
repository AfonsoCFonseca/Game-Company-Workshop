class Module_4Year extends React.Component {

  constructor( props ){
    super( props )
  }

  //'https://www.gamasutra.com/blogs/SergioJimenez/20131106/204134/Gamification_Model_Canvas.php'

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
            <p>Business Modal Canvas ( empty )</p>
            <p>Business Modal Canvas ( filled )</p>
          </div>
        </div>

        <InputBlock 
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyPartners", value ) }>
           <Description 
              title='Key Partners'
              description={ description4YearKeyPartners } />
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
          valueReceived={ value => this.props.editCompanyState( "ValuePropositions", value ) }>
           <Description 
              title='Value Propositions'
              description={ description4YearValuePropositions } />
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
          valueReceived={ value => this.props.editCompanyState( "CustomerRelationships", value ) }>
           <Description 
              title='Customer Relationships'
              description={ description4YearCustomerRelationships } />
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
          valueReceived={ value => this.props.editCompanyState( "Channels", value ) }>
           <Description 
              title='Channels'
              description={ description4YearChannels } />
        </InputBlock>

        <InputBlock 
          size='large'
          valueReceived={ value => this.props.editCompanyState( "RevenueStream", value ) }>
           <Description 
              title='Revenue Stream'
              description={ description4YearRevenueStream } />
        </InputBlock>

        <InputBlock 
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CostStructure", value ) }>
           <Description 
              title='Cost Structure'
              description={ description4YearCostStructure } />
        </InputBlock>

      </div>
    )

  }

}