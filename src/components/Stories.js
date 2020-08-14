import React, { Component } from 'react'

export default class Stories extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       hits: [],
    }
  }

  componentDidMount(){
    fetch('http://hn.algolia.com/api/v1/search?query=')
    .then(response => response.json())
    .then(data => this.setState({hits: data.hits}))
    .catch(error => console.log(error))
  }
  


  render() {
    return (
      <div>
        <ul>
          {this.state.hits.map(hit => 
            <li key={hit.objectID}>
              {hit.title}
            </li>)}
        </ul>
      </div>
    )
  }
}
