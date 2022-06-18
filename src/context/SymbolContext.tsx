import React, { createContext, useState } from "react";

type SymbolContextProviderProps = {
	children: React.ReactNode;
};

type SymbolContextType = {
	symbol: string;
	setSymbol: (data: string) => void;
};
export const SymbolContext = createContext<SymbolContextType | null>(null);

const SymbolContextProvider = (props: SymbolContextProviderProps) => {
	const [symbol, setSymbol] = useState<string>("°C");

	return (
		<SymbolContext.Provider value={{ symbol, setSymbol }}>
			{props?.children}
		</SymbolContext.Provider>
	);
};

export default SymbolContextProvider;
