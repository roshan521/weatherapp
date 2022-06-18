import { Icon, SearchIcon } from "@chakra-ui/icons";
import { IoLocationOutline } from "react-icons/io5";
import {
	Box,
	Divider,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	List,
	ListItem,
	Text,
} from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { SymbolContext } from "../context/SymbolContext";

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

type SidebarProps = {
	weatherData: weather;
	setPlace: React.Dispatch<React.SetStateAction<string>>;
	place: string;
};

const Sidebar: FC<SidebarProps> = ({ setPlace, weatherData, place }) => {
	const [cities, setcities] = useState<string[]>();
	const getCities = async (cityQuery: string) => {
		const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&limit=3&appid=9da046cc7bce0605c0f17cc58abf3f37`;
		let response = await fetch(url);
		let result = await response.json();
		let cityList: string[] = [];
		result.forEach((item: any) => {
			cityList.push(item.name);
			console.log(item.name);
		});
		setcities(cityList);
	};

	let globalSymbol = useContext(SymbolContext);

	const debounced = useDebouncedCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			let target = event.target as HTMLInputElement;
			if (target.value) {
				getCities(target.value);
			} else {
				setcities([]);
			}
		},
		400,
	);

	const clickHandle = (city: string): void => {
		setPlace(city);
		setcities([]);
	};
	return (
		<Box
			h={[null, null, null, null, "100vh"]}
			p="3.5"
			boxShadow="lg"
			rounded="md"
		>
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray" />}
				/>
				<Input
					type="tel"
					placeholder="Search Place"
					onChange={(event) => debounced(event)}
				/>
			</InputGroup>

			<List textAlign="center">
				{cities?.map((item: string) => {
					return (
						<div>
							<ListItem onClick={() => clickHandle(item)}>{item}</ListItem>
							<Divider />
						</div>
					);
				})}
			</List>

			<Box mt="4" width="10rem">
				<Image src="/assets/cloudy.svg"></Image>
			</Box>

			<Box mt="2">
				<Text as="h1" fontSize="3xl" fontWeight="bold" color="cyan.400">
					{weatherData?.current?.temp}
					{globalSymbol?.symbol}
				</Text>
				<Text fontWeight="bold" fontSize="2xl">
					{" "}
					Monday,
					<Text as="span" color="gray">
						{" "}
						5:14
					</Text>
				</Text>
			</Box>
			<Divider orientation="horizontal" mt="5" />

			<Box display="flex" m="3.5">
				<Image src="/assets/cloudy.svg" boxSize="10" />
				<Text alignSelf="flex-end" ml="5">
					Mostly Cloud
				</Text>
			</Box>

			<Box display="flex" m="3.5">
				<Image src="/assets/rainny.svg" boxSize="10" />
				<Text alignSelf="flex-end" ml="5">
					Rain-30%
				</Text>
			</Box>

			<Box mt="4" border="1px black dashed">
				<Icon as={IoLocationOutline} />
				<Text fontWeight="bold" fontSize="3xl" display="inline" pt="1.5">
					{" "}
					{place}
				</Text>
			</Box>
		</Box>
	);
};

export default Sidebar;
