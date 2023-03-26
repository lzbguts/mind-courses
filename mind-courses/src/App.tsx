import { BrowserRouter as Router } from "react-router-dom";
import { Footer, Header } from "./components";
import AppRoutes from "./routes";

function App() {
	return (
		<div className="container">
			<Router>
				<Header />
				<div className="main">
					<AppRoutes />
				</div>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
