import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './App'
import Home from "./pages"
import User from "./pages/user"
import Signup from "./pages/user/signup"
import Login from "./pages/user/login"
import Me from "./pages/user/me"
import Test from './pages/test'
import TestCreate from "./pages/test/create"
import TestDetail from './pages/test/[id]'
import TestJoin from './pages/test/join'
import TestPlay from './pages/play/test/[id]'
import Play from './pages/play'
import Error404 from './pages/404'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		errorElement: <Error404/>,
		children: [
			{ path: "/", element: <Home/>, },
			{ path: "test/", element: <Test/>},
			{ path: "test/create/", element: <TestCreate/>},
			{ path: "test/join/", element: <TestJoin/>},
		   	{ path: "test/:id/", element: <TestDetail/> },
		]
	},{
		path: "user/",
		element: <User/>,
		errorElement: <Error404/>,
		children: [
			{ "path": "me/", element: <Me/> },
			{ "path": "signup/", element: <Signup/> },
			{ "path": "login/", element: <Login/> },
		]
	},{
		path: "play/",
		element: <Play/>,
		errorElement: <Error404/>,
		children: [
			{ path: "test/:id/", element: <TestPlay/>},
		]
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	<Provider store={store}>
	  <RouterProvider router={router}/>
	</Provider>
  </React.StrictMode>,
)