import React, { Component }  from 'react';
import {edit, deleteProfile} from './user-service';
import {logout} from '../auth/auth-service'
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar';
import '../style/Edit.css';

class Edit extends Component {
  state = {
    username:'',
  }

  getUsername = () => {
    this.setState({username: this.props.user.username})
  }

  componentDidMount(){
    this.getUsername();
  }

  // pour garder username au refresh de la page
  componentDidUpdate(prevProps){
    if (this.props.user._id !== prevProps.user._id) {
      this.setState({username: this.props.user.username})
    } 
  }

  logout = (event) => {
    logout()
      .then(response => {
        this.props.getUser(false);
        this.props.history.push("/");
      })
  }

  deleteProfile= () => {
    deleteProfile(this.props.user._id)
    .then(response => {
      this.props.getUser(null);
      this.props.history.push("/")
    })
  }

  handleSubmit = (event) => {
    event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
    edit(this.props.user._id,this.state.username) 
    .then((response)=> {
      this.setState({ // remet à zéro le formulaire
        username:""
      })
      this.props.getUser(response);
      this.props.history.push('/profile');
    })
    .catch(err => console.log(err))
      
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    if(this.props.user === false) return <Redirect to="/"/>

    return(
      <>
        <Navbar user={this.state.user} />
      
      <div className="auth auth-edit">
        <div className="block-title-auth">
          <h1>Mon compte</h1>
        </div>

        <div className="block-form">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Modifier mon nom d'utilisateur :
              <div className="control has-icons-left">
                <input className="input" type="text" name="username" value={this.state.username || ""} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
              </label>
            </div>

            <div className="profileButtons">
                <button className="littleNext">
                Mettre à jour
                </button>
             
              <div className="out">
                <span onClick={this.logout}>Me déconnecter</span>
              </div>
              <div className="out">
              <span onClick={this.deleteProfile}>Supprimer mon compte</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      </>
    )
  }
}

export default Edit;