import {
	Box,
	Center,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
} from "@chakra-ui/react";
import { FC } from "react";

type HighlightProps = {
	color: string;
	heading: string;
	data: number;
	sub: string;
	status: string;
};

const Highlight: FC<HighlightProps> = ({
	color,
	heading,
	data,
	sub,
	status,
}) => {
	return (
		<Box display="flex" p="6" boxShadow="lg" rounded="md" bg="#ededed">
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				height="100%
                    "
			>
				<Text fontWeight="medium" color="gray">
					{heading}
				</Text>
				<Text as="h2" fontWeight="bold" fontSize="1.5rem">
					{data}
					<Text as="span" fontSize="0.7rem" color="gray">
						{" "}
						{sub}
					</Text>
				</Text>
				<Text fontWeight="medium" color="gray">
					Status:{" "}
					<Text as="span" color={color}>
						{status}
					</Text>
				</Text>
			</Box>
			<Center boxSize="5rem">
				<Slider
					aria-label="slider-ex-3"
					defaultValue={30}
					orientation="vertical"
					minH="3rem"
				>
					<SliderTrack w="1.5rem" bg="white" borderRadius="2rem">
						<SliderFilledTrack bg="gray" />
					</SliderTrack>
					<SliderThumb bg={color} />
				</Slider>
			</Center>
		</Box>
	);
};

export default Highlight;
