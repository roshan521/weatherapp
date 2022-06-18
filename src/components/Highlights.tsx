import { Box, Image, SimpleGrid, Text, Icon } from "@chakra-ui/react";
import {
	FC,
	ReactElement,
	ReactHTMLElement,
	ReactNode,
	useContext,
} from "react";
import { IoLocationOutline } from "react-icons/io5";
import { JsxElement } from "typescript";
import { SymbolContext } from "../context/SymbolContext";
import Highlight from "./Highlight";
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

type HighlightsProps = {
	weatherData: weather;
	place: string;
};
const Highlights: FC<HighlightsProps> = ({
	weatherData,
	place,
}): ReactElement => {
	const getSunrise = (): string => {
		let sunrise: Date = new Date(weatherData?.current?.sunrise * 1000);
		return `${sunrise.getHours()}:${sunrise.getMinutes()}`;
	};

	const getSunset = () => {
		let sunset = new Date(weatherData?.current?.sunset * 1000);
		return `${sunset.getHours()}:${sunset.getMinutes()}`;
	};
	let globalSymbol = useContext(SymbolContext);
	return (
		<SimpleGrid columns={[1, 2, 3]} spacing={8}>
			<Box p="3" boxShadow="lg" rounded="md" bg="#ededed">
				<Text fontWeight="medium" color="gray">
					Sunrise and Sunset
				</Text>
				<Box display="flex" alignItems="center">
					<Image src="assets/sunrise.svg" alt="sunrise" boxSize="3rem" />
					<Text ml="2.5" fontWeight="bold">
						{getSunrise()}
					</Text>
				</Box>

				<Box display="flex" alignItems="center" bg="#ededed">
					<Image src="assets/sunset.svg" alt="sunset" boxSize="3rem" />
					<Text ml="2.5" fontWeight="bold">
						{getSunset()}
					</Text>
				</Box>
			</Box>
			<Box p="3" display="flex" boxShadow="lg" rounded="md" bg="#ededed">
				<Box
					flexGrow="1"
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
				>
					<Text fontWeight="medium" color="gray" mb="3">
						Temperature
					</Text>
					<Text as="h2" fontWeight="bold" fontSize="1.5rem" mb="4">
						{weatherData?.current?.temp} {globalSymbol?.symbol}
					</Text>
					<Icon as={IoLocationOutline} />{" "}
					<Text display="inline" fontWeight="bold" fontSize="0.8rem">
						{place}
					</Text>
				</Box>
				<Box>
					<Image src="assets/temprature.svg" alt="temperature" boxSize="5rem" />
				</Box>
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				p="3"
				boxShadow="lg"
				rounded="md"
				bg="#ededed"
			>
				<Text fontWeight="medium" color="gray">
					Wind Status
				</Text>
				<Text as="h2" fontWeight="bold" fontSize="1.5rem">
					{weatherData?.current?.wind_speed}
					<Text as="span" fontSize="0.7rem" color="gray">
						{" "}
						km/h
					</Text>
				</Text>
				<Text fontWeight="medium" color="gray">
					Status:
				</Text>
			</Box>
			<Highlight
				color="cyan"
				heading="Humidity"
				data={weatherData?.current?.humidity}
				sub="%"
				status="Good quality"
			/>

			<Highlight
				color="orange"
				heading="Visibility"
				data={weatherData?.current?.visibility}
				sub="km"
				status="Average"
			/>

			<Highlight
				color="red"
				heading="Pressure"
				data={weatherData?.current?.pressure}
				sub=""
				status="Bad Quality"
			/>
		</SimpleGrid>
	);
};

export default Highlights;
