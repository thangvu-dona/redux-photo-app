import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import NotFound from './components/NotFound'
import productApi from './api/productApi'
import SignIn from './features/Auth/pages/SignIn'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Button } from 'reactstrap'

// Lazy load - Code Splitting
const Photo = React.lazy(() => import('./features/Photo'))

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyDu7UnhKde6YOkh4aQbqIJbzJfdL4djD9Q', // in project-setting firebase
  authDomain: 'winvu-photo-app.firebaseapp.com',
}
firebase.initializeApp(config)

function App() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        }
        const response = await productApi.getAll(params)

        console.log(response)
        setProductList(response.data)
      } catch (error) {
        console.log('Fail to fetch product list!', error)
      }
    }

    fetchProductList()
  }, [])

  // Listen to the Firebase Auth state and set the local state/redux state
  // onAuthStateChanged callback function manage sign-in/signout
  // Handle firebase auth state changed
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      // this.setState({ isSignedIn: !!user })
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in')
        return
      }

      console.log('Logged in user: ', user.displayName)

      const token = await user.getIdToken()
      console.log('Logged in user token: ', token)
    })

    return () => unregisterAuthObserver // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  const handleButtonClick = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10,
      }
      const response = await productApi.getAll(params)

      console.log(response)
      setProductList(response.data)
    } catch (error) {
      console.log('Fail to fetch product list!', error)
    }
  }

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Button onClick={handleButtonClick}>Fetch Product List</Button>

          <Routes>
            <Route path="/" element={<h1>Home Page Component</h1>} />
            <Route path="/photos/*" element={<Photo />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
