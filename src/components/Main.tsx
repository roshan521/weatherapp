import { Avatar, Box, Flex, Select, Spacer, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import Highlights from "./Highlights";
import WeatherCard from "./WeatherCard";

type weather = {
	lat: number;
	lon: number;
	timezone: string;
	current: currentData;
	daily: dailyData[];
	[key: string]: any;
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

type MainProps = {
	weatherData: weather;
	place: string;
	handleClick1: () => void;
	handleClick2: () => void;
};
let days = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];

const Main: FC<MainProps> = ({
	weatherData,
	place,
	handleClick1,
	handleClick2,
}): ReactElement => {
	const getDay = (time: number): string => {
		let date = new Date(time * 1000);
		return days[date.getDay()];
	};
	return (
		<Box p="4">
			<Flex>
				<Box display="flex" gap="5rem" fontWeight="bold" fontSize="2xl">
					<Text>Today</Text>
					<Text color="cyan.400">Week</Text>
				</Box>
				<Spacer />
				<Box fontStyle="bold" display="flex" gap="4">
					<Avatar
						name="&#8451;"
						bg="cyan.400"
						onClick={handleClick1}
						cursor="pointer"
					/>
					<Avatar
						name="&#8457;"
						bg="gray.300"
						onClick={handleClick2}
						cursor="pointer"
					/>
				</Box>
			</Flex>

			<Flex display="flex" gap="4" mt="5" overflowX="auto">
				{weatherData?.daily.map((data) => {
					return (
						<WeatherCard
							day={getDay(data?.dt)}
							pic="/assets/sunny.svg"
							temp={data?.temp?.day}
						/>
					);
				})}
			</Flex>
			<Text color="gray.400" mt="5" mb="1">
				Today Highlights
			</Text>
			<Highlights weatherData={weatherData!} place={place} />
		</Box>
	);
};

export default Main;
