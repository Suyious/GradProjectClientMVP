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
import Experimental from "./pages/experimental"
import Test from './pages/test'
import TestCreate from "./pages/test/create"
import TestDetail from './pages/test/[id]'
import TestJoin from './pages/test/join'
import TestPlay from './pages/play/test/[id]'
import Play from './pages/play'

const NotFound404 = () => <h1>Not Found</h1>

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		errorElement: <NotFound404/>,
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
		errorElement: <NotFound404/>,
		children: [
			{ "path": "me/", element: <Me/> },
			{ "path": "signup/", element: <Signup/> },
			{ "path": "login/", element: <Login/> },
		]
	},{
		path: "play/",
		element: <Play/>,
		errorElement: <NotFound404/>,
		children: [
			{ path: "test/:id/", element: <TestPlay/>},
		]
	}, {
		path: "experimental/",
		element: <Experimental/>,
		errorElement: <NotFound404/>,
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	<Provider store={store}>
	  <RouterProvider router={router}/>
	</Provider>
  </React.StrictMode>,
)