import SymbolContextProvider from "./context/SymbolContext";
import Home from "./views/Home";

function App() {
	return (
		<SymbolContextProvider>
			<Home />
		</SymbolContextProvider>
	);
}

export default App;
