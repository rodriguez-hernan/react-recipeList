import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY = "f97194a78b4bdcb8096b80ed66be5703";

class App extends Component {

  state = {
    recipes: []
  };

  getRecipe = async (e)=>{
    const recipeName = e.target.elements.recipeName.value;
    console.log(recipeName);
    e.preventDefault();
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=5`);

    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
    console.log(data);
  }

  componentDidMount = ()=> {
      const json = localStorage.getItem('recipes');
      console.log("line 28" + json);
      if (json !== "undefined"){
        const recipes = JSON.parse(json);
        this.setState({ recipes });
    }
    
  };

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe = {this.getRecipe}></Form>
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;