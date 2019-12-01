class Module_3Year extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      spentConfort: 0,
      spentMaintenance: 0,
      spentJobTraining: 0,
    }
  }

  //'https://www.gamasutra.com/blogs/SergioJimenez/20131106/204134/Gamification_Model_Canvas.php'

  updateToParent( name, value ){
    this.props.editCompanyState( "year3", { [name]: value })
  }

  updateSpentValues( name, value ){
    this.setState({ [name]: value })
    this.updateToParent( name, value )
  }

  render() {

    return(
      <div className='module'>
        <TextField title='Business Model Canvas' textValue={ modelCanvasExplanation }/>

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

        <TextField title='Third Game'/>

        <InputBlock
            valueReceived={ value => this.updateToParent( "gameNameYear3", value ) }>
             <Description
                title='Game Name'/>
        </InputBlock>

         <InputBlock
            size='large'
            valueReceived={ value => this.updateToParent( "ValuePropositions", value ) }>
             <Description
                title='Value Propositions'
                description={ description3YearValuePropositions } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "CustomerSegments", value ) }>
           <Description
              title='Customer Segments'
              description={ description3YearCustomerSegments } />
        </InputBlock>

         <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "CustomerRelationships", value ) }>
           <Description
              title='Customer Relationships'
              description={ description3YearCustomerRelationships } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "CostStructures", value ) }>
           <Description
              title='Cost Structures'
              description={ description3YearCostStructure } />
        </InputBlock>

        <InputBlock
          size='large'
          valueReceived={ value => this.updateToParent( "RevenueStream", value ) }>
           <Description
              title='Revenue Stream'
              description={ description3YearRevenueStream } />
        </InputBlock>

        <InputBlock
          inputTile={ "Team Confort" }
          typeDiv={'small'}
          numbers={true}
          limit={ 5000 }
          valueReceived={ value =>  this.updateSpentValues( "spentConfort", value ) }
          inputValue={ this.state.spentConfort }>
           <Description
              title={ `Where to Spend Money` }
              description={ explanationTeamExpanses } />
        </InputBlock>
        <InputBlock
          inputTile={ "Job Training" }
          typeDiv={'small'}
          numbers={true}
          limit={ 5000 }
          inputValue={ this.state.spentJobTraining }
          valueReceived={ value =>  this.updateSpentValues( "spentJobTraining", value ) }>
        </InputBlock>
        <InputBlock
          inputTile={ "Maintenance" }
          typeDiv={'small'}
          numbers={true}
          limit={ 5000 }
          inputValue={ this.state.spentMaintenance }
          valueReceived={ value =>  this.updateSpentValues( "spentMaintenance", value ) }>
        </InputBlock>

        <InputBlock
          size='large'
          placeholder={ explanationTeamExpansesPlaceHolder }
          valueReceived={ value => this.updateToParent( "explanationExpanses", value ) }>
           <Description
              title='Explain the cash expanses ( Optional )'/>
        </InputBlock>

        <TextField title='Team'  textValue={teamDescriptionYear3}/>

         <InputBlock
          size='large'
          placeholder='Energetic, Motivational, Organized...'
          valueReceived={ value => this.updateToParent( "interviewValues", value ) }>
           <Description
              title='Values in people'
              description={ teamValuesInterviewYear3 } />
        </InputBlock>

        <RadioButtonBlock
            valuesSent={ bootcampArr }
            valueReceived={ value => this.updateToParent( "bootcamp", value ) }>
           <Description
            title='Interns'
            description={ explanationForBootcamp }/>
        </RadioButtonBlock>

        <RadioButtonBlock
            valuesSent={ gamejamArr }
            valueReceived={ value => this.updateToParent( "gamejam", value ) }>
           <Description
            title='GameJam'
            description={ explanationForGamejam }/>
        </RadioButtonBlock>

        <InputBlock
          size='large'
          placeholder='Do you have any personal projects? What do you see doing 5 years from now?'
          valueReceived={ value => this.updateToParent( "questionsToMake", value ) }>
           <Description
              title='Two Questions'
              description={ team2QuestionsToMake } />
        </InputBlock>

      </div>
    )

  }

}
