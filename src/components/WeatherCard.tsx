import { Box, Image, Text } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { SymbolContext } from "../context/SymbolContext";
type card = {
	day: string;
	pic: string;
	temp: number;
};

const WeatherCard: FC<card> = ({ day, pic, temp }) => {
	let globalSymbol = useContext(SymbolContext);
	return (
		<Box
			display="flex"
			flexDirection="column"
			flexGrow="1"
			p="4"
			alignItems="center"
			fontWeight="bold"
			boxShadow="lg"
			rounded="md"
			_hover={{ bg: "cyan.400", color: "white" }}
		>
			<Text>{day}</Text>
			<Image src={pic} boxSize="5rem" />
			<Text>
				{temp}
				{globalSymbol?.symbol}
			</Text>
		</Box>
	);
};

export default WeatherCard;
