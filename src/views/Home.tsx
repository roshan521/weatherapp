import { Stack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { SymbolContext } from "../context/SymbolContext";

type weather = {
	lat: number;
	lon: number;
	timezone: string;
	current: currentData;
	daily: dailyData[];
	[key: string]: any;
};

type currentData = {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	pressure: number;
	humidity: number;
	visibility: number;
	wind_speed: number;
	[key: string]: number;
};

type dailyData = {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: {
		day: number;
		min: number;
		max: number;
		[key: string]: number;
	};
	[key: string]: any;
};
const Home = () => {
	const [place, setplace] = useState<string>("Kathmandu");
	const [unit, setUnit] = useState<string>("metric");

	const [weatherData, setWeatherData] = useState<weather>();

	let globalSymbol = useContext(SymbolContext);
	useEffect(() => {
		let getCordinates = async () => {
			let response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=7b31ccd4c0b391c82419ea24f7e45ca9&units=metric`,
			);
			let data = await response.json();
			let response1 = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?exclude=alerts,minutely,hourly&lat=${data[0]?.lat}&lon=${data[0]?.lon}&appid=7b31ccd4c0b391c82419ea24f7e45ca9&units=${unit}`,
			);
			let data1 = await response1.json();
			setWeatherData(data1);
		};
		getCordinates();
	}, [place, unit]);

	const handleClick1 = () => {
		setUnit("metric");
		globalSymbol?.setSymbol("°C");
	};

	const handleClick2 = () => {
		setUnit("imperial");
		globalSymbol?.setSymbol("°f");
	};

	return (
		<>
			<Stack direction={[null, "column", "row"]}>
				<Sidebar setPlace={setplace} weatherData={weatherData!} place={place} />
				<Main
					weatherData={weatherData!}
					place={place}
					handleClick1={handleClick1}
					handleClick2={handleClick2}
				/>
			</Stack>
		</>
	);
};

export default Home;
