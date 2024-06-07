import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './config/theme';
import AppRouter from './routes/AppRouter';
import Background from './components/Background';

function App(): React.JSX.Element {
	const [count, setCount] = useState<number>(0);

	return (
		<>
			<ChakraProvider theme={theme}>
				<Background/>
				<div className="relative">
					<AppRouter />
				</div>
			</ChakraProvider>
		</>
	);
}

export default App;
