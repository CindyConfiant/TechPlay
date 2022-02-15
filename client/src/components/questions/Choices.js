import React, { Component }  from 'react';
import { question } from './question-service';
import '../style/Choices.css'

//OK //changement de state sur du onclick / pas de formulaire
//OK //button  = appel à axios qui passe infos sous forme de data au composant qui est la page suivante / qui recupéra les infos
//OK valeur par défaut //si 3 states ne sont pas remplis, empêcher de passer à la suivante (alternative:choix par défaut)
//OK //3 fonctions différentes de onclick
// TODO CSS // highlighter les options sélectionnées

const categories = [
  'HTML',
  'JS',
  'CSS',
  'React'
];

//vérifier enum ?
const difficulties = [1, 2, 3]

class Choices extends Component {
  state={
    category : 'HTML', // Valeur par défaut si user ne fait pas de choix
    difficulty:1, 
    question: {}
  }

  chooseCat = (event) => {
    this.setState(
      {category: [event.target.name]}, () => {
        console.log(this.state)
      }
    );
  }

  chooseDif = (event) => {
    this.setState(
      {difficulty: [event.target.name]},  () => {
        console.log(this.state)
      }
    );
  }

  handleSubmit = () => {
    const category= this.state.category;
    const difficulty= this.state.difficulty;
    question(category, difficulty)
      .then(response => {
        this.setState({
          question: response
        })
        this.props.history.push({
          pathname: '/question',
          search: `?category=${category}&difficulty=${difficulty}`,
          state: {question: response}
        })
      })
  }

  render() {
    return(
      <div>  
        <h1>Mes choix</h1>

        <h3>Je choisis ma catégorie de question(s) :</h3>
        {categories.map((cat, index) => {
          return(
            <label key={index}>
            <input type="image" src="" alt={cat} name={cat} onClick={event => this.chooseCat(event)}/>
            </label>
          )
        })}

        <h3>Je choisis le niveau de difficulté :</h3>
        {difficulties.map((dif, index) => {
          return(
            <label key={index}>
            <input type="image" src="" alt={dif} name={dif} onClick={event => this.chooseDif(event)}/>
            </label>
          )
        })}

        <button onClick={()=> this.handleSubmit()}>C'est parti</button>

      </div>
    )
  }
}
  
export default Choices;