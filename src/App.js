import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      search:'',
      author:'',
      data:[]
      
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAuthor = this.handleSubmitAuthor.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
  }
  
  handleChange(event) {
    this.setState({search: event.target.value});
    console.log(this.state.search)
  }
  handleChangeAuthor(event) {
    this.setState({author: event.target.value});
    console.log(this.state.author)
  }
  handleSubmit(event) {
    this.setState({data:[]})
    console.log("search:"+ this.state.search)
    event.preventDefault();
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.search}`)
    .then(res => res.json())
    .then(examples => {
    console.log(examples);
    this.setState({ data: examples.hits })
    })
  }
  handleSubmitAuthor(event) {
    this.setState({data:[]})
    console.log("search:"+ this.state.author)
    event.preventDefault();
    fetch(`http://hn.algolia.com/api/v1/search?tags=author_${this.state.author}`)
    .then(res => res.json())
    .then(examples => {
    console.log(examples);
    this.setState({ data: examples.hits })
    })
  }
  render(){
  return (
    <div className="App">
     <form onSubmit={this.handleSubmit}>
       <label>Search:
         <input name="search" value={this.state.search} onChange={this.handleChange}/>
         <input type="submit" value="Submit" />
       </label>
     </form>
     <form onSubmit={this.handleSubmitAuthor}>
       <label>Search by Author:
         <input name="search" value={this.state.author} onChange={this.handleChangeAuthor}/>
         <input type="submit" value="Submit" />
       </label>
     </form>
     {this.state.data.map((item, i)=>{
       return(
         <div>
         <h3>{item.title}</h3>
         <a href="${item.url}">{item.url}</a>
       <h3>{item.author}</h3>
         </div>
       )
     })}
    </div>
  )
};
}
export default App;
