import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from "./pages/user/signup"
import Login from "./pages/user/login"
import Me from "./pages/user/me"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		errorElement: <h1>Not Found</h1>,
		children: [
			{ "path": "/", element: <Me/> },
			{ "path": "/signup", element: <Signup/> },
			{ "path": "/login", element: <Login/> },
		]
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	  <RouterProvider router={router}/>
  </React.StrictMode>,
)
