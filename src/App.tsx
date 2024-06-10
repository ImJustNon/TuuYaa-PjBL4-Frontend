import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './config/theme';
import AppRouter from './routes/AppRouter';
import Background from './components/Background';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import config from "./config/config";
import { getUserToken } from './utils/userToken';
import Cookies from "js-cookie";
import axios, { AxiosResponse } from 'axios';

function App(): React.JSX.Element {
	const navigate: NavigateFunction = useNavigate();
  	const { pathname } = useLocation();

	// set title
	useEffect(() =>{
		document.title = "Alerting Medicine Cabinet by Using IoT and Web Application's Setting Page | v2.0.0";
	}, []);

	// navigate to /signin page if token does not exit
	useEffect(() =>{
		(async(): Promise<void> => {
			// เช็คถ้า Path นั้นไม่จำเป็นต้องเช็ค
			const preventCheckPages = config.pages.preventCheckTokenPaths;
			if(preventCheckPages.includes(pathname)) return;
			// ถ้า Path นั้นต้องเช็คให้ส่ง Request ไป Server เช็ค
			try {
				axios.defaults.withCredentials = true;
				const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/user/validate`);
				const responseData: any = response.data;
				if(responseData.status === "FAIL"){
					// ถ้า Server ตอบ FAIL ให้ลบ cookie เเละ ดีดไปที่ signin
					await axios.post(`${config.backend.api.baseurl}/api/v1/user/auth/google/signout`);
					navigate("/signin");
					return;
				}
				console.log("Validate User Success");
			}
			catch(e){
				console.info("Validate User Error : ", e);
				navigate("/signin");
				return;
			}
		})();
		// const preventCheckPages = config.pages.preventCheckTokenPaths;
		// const userToken: string | undefined = getUserToken();
		// console.log(userToken);
		// if(preventCheckPages.includes(pathname)) return;
		// if(!userToken){
		// 	navigate("/signin");
		// }
	}, [pathname]);

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
