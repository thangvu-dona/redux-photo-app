import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

SignIn.propTypes = {}

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/photos',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // callbacks: {
  //   // Avoid redirects after sign-in.
  //   signInSuccessWithAuthResult: () => false,
  // },
}

function SignIn(props) {
  return (
    <div>
      <div className="text-center">
        <h2>Login Form</h2>

        <p>or login with social account</p>
      </div>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default SignIn
