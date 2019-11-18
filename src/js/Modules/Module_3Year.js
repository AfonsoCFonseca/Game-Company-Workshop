class Module_3Year extends React.Component {

  constructor( props ){
    super( props )

    console.log( props )
  }

  //'https://www.gamasutra.com/blogs/SergioJimenez/20131106/204134/Gamification_Model_Canvas.php'

  updateToParent( name, value ){
    this.props.editCompanyState( "year3", { [name]: value })
  }

  render() {

    return(
      <div className='module'>
        <TextField title='Getting the hang of it' textValue={ modelCanvasExplanation }/>

        <div className='businessModelCanvas'>

          <div className='imgDiv'>
            <img src='/public/images/business_Model_Canvas_Template.jpg' />
            <img src='/public/images/maxresdefault.jpg' />
          </div>
          <div className='textDiv'>
            <a href="/public/images/business_Model_Canvas_Template.jpg" download>Business Modal Canvas ( empty )</a>
            <a href="/public/images/maxresdefault.jpg" download>Business Modal Canvas ( filled )</a>
          </div>
        </div>

        <TextField title='Business Model Canvas' />

         <InputBlock
            size='large'
            valueReceived={ value => this.props.editCompanyState( "ValuePropositions", value ) }>
             <Description
                title='Value Propositions'
                description={ description3YearValuePropositions } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CustomerSegments", value ) }>
           <Description
              title='Customer Segments'
              description={ description3YearCustomerSegments } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "CustomerRelationships", value ) }>
           <Description
              title='Customer Relationships'
              description={ description3YearCustomerRelationships } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyResources", value ) }>
           <Description
              title='Key Resources'
              description={ description3YearKeyResources } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "KeyPartners", value ) }>
           <Description
              title='Key Partners'
              description={ description3YearKeyPartners } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.props.editCompanyState( "RevenueStream", value ) }>
           <Description
              title='Revenue Stream'
              description={ description3YearRevenueStream } />
        </InputBlock>

        <TextField title='Team'  textValue={teamDescriptionYear3}/>

        <InputBlock
          size='large'
          placeholder='Energetic, Motivational, Organized...'
          valueReceived={ value => this.props.editCompanyState( "interviewValues", value ) }>
           <Description
              title='Values in people'
              description={ teamValuesInterviewYear3 } />
        </InputBlock>

        <InputBlock
          size='large'
          placeholder='Do you have any personal projects? What do you see doing 5 years from now?'
          valueReceived={ value => this.props.editCompanyState( "questionsToMake", value ) }>
           <Description
              title='Two Questions'
              description={ team2QuestionsToMake } />
        </InputBlock>

      </div>
    )

  }

}
