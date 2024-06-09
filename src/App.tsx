import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './config/theme';
import AppRouter from './routes/AppRouter';
import Background from './components/Background';
import { useLocation, useNavigate } from 'react-router-dom';
import config from "./config/config";
import { getUserToken } from './utils/userToken';


function App(): React.JSX.Element {
	const navigate = useNavigate();
  	const { pathname } = useLocation();

	// set title
	useEffect(() =>{
		document.title = "Alerting Medicine Cabinet by Using IoT and Web Application's Setting Page | v2.0.0";
	}, []);

	// navigate to /signin page if token does not exit
	useEffect(() =>{
		const preventCheckPages = config.pages.preventCheckTokenPaths;
		const userToken = getUserToken();
		if(preventCheckPages.includes(pathname)) return;
		if(!userToken){
			return navigate("/signin");
		}
	}, []);

	return (
		<>
			<ChakraProvider theme={theme}>
				<Background />
				<div className="relative">
					<AppRouter />
				</div>
			</ChakraProvider>
		</>
	);
}

export default App;
