import React from 'react';

// Important: we transform this into a smart component,
// so instead of only receiving input it has state and props
// we don't use a function, we use the class type. 

// A child component can have their own state as long as app.js
// (the parent) doesnt need to access that state. 

class SignIn extends React.Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      signInEmail : '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  } 

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  } 

  onSubmitSignIn = () => {
    fetch('https://safe-wildwood-78632.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {

    const {onRouteChange} = this.props;

    return (
<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
  	<main className="pa4 black-80">
      <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
          onChange={this.onEmailChange} 
          className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib" 
          type="email" 
          name="email-address"  
          id="email-address"
          />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input  onChange = {this.onPasswordChange}
                className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib" 
                type="password" 
                name="password"  
                id="password"
                />
      </div>
    </fieldset>
    <div className="">
      <input
      		// We define onClick as a function, so it doesnt call home every time is re-rendered
      		onClick={this.onSubmitSignIn}
      		className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      		type="submit" 
      		value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => onRouteChange('register')} className="f6 underline link dim black db pointer">Register</p>
    </div>
    </div>
    </main>
    </article>
    );

  }
}

export default SignIn;