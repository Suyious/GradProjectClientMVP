import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App'
import User from "./pages/user"
import Signup from "./pages/user/signup"
import Login from "./pages/user/login"
import Me from "./pages/user/me"
import Experimental from "./pages/experimental"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		errorElement: <h1>Not Found</h1>,
		children: []
	},{
		path: "user/",
		element: <User/>,
		errorElement: <h1>Not Found</h1>,
		children: [
			{ "path": "me/", element: <Me/> },
			{ "path": "signup/", element: <Signup/> },
			{ "path": "login/", element: <Login/> },
		]
	}, {
		path: "/exp",
		element: <Experimental/>,
		errorElement: <h1>Not Found</h1>
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	  <RouterProvider router={router}/>
  </React.StrictMode>,
)
