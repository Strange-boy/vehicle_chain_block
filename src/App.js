import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./Pages/Components/footer/footer";
import Navbar from "./Pages/Components/navbar/navbar";
import TitleChangeSuccessful from "./Pages/Components/statusMessage/tcSuccess";
import approvalWaiting from "./Pages/Components/statusMessage/approvalWaiting";
import NegativeStatus from "./Pages/Components/statusMessage/negativeStatus";
import PositiveStatus from "./Pages/Components/statusMessage/positiveStatus";
import Verification from "./Pages/Components/statusMessage/verification";
import Confirmation from "./Pages/confirmation/confirmation";
import Fine from "./Pages/fine/fine";
import GovFooter from "./Pages/Government/gov_Component/govFooter/govFooter";
import GovNavbar from "./Pages/Government/gov_Component/govNavbar/govNavbar";
import GovConfirmation from "./Pages/Government/govConfirmation/govConfirmation";
import GovBlacklist from "./Pages/Government/govBlacklist/govBlacklist";
import GovFine from "./Pages/Government/govFine/govFine";
import GovIssueRc from "./Pages/Government/govIssueRc/govIssueRc";
import GovWelcome from "./Pages/Government/govWelcome/govWelcome";
import IntermediaryPage from "./Pages/intermediaryPage/intermediaryPage";
import ForgotPassword from "./Pages/login/forgotPassword";
import Login from "./Pages/login/login";
import MyProfile from "./Pages/myProfile/myProfile";
import Signup from "./Pages/signup/signup";
import Status from "./Pages/status/status";
import TitleChange from "./Pages/titleChange/titleChange";
import ViewRc from "./Pages/viewRc/viewRc";
import Welcome from "./Pages/welcome/welcome";
import GovVerify from "./Pages/Government/govVerify/gov_verify";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
				<Routes>
					<Route path="/signup" element={<Signup />} />
				</Routes>
				<Routes>
					<Route path="/welcome" element={<Welcome />} />
				</Routes>
				<Routes>
					<Route path="/navbar" element={<Navbar />} />
				</Routes>
				<Routes>
					<Route path="/footer" element={<Footer />} />
				</Routes>
				<Routes>
					<Route path="/titleChange" element={<TitleChange />} />
				</Routes>
				<Routes>
					<Route path="/viewRc" element={<ViewRc />} />
				</Routes>
				<Routes>
					<Route path="/positive" element={<PositiveStatus />} />
				</Routes>
				<Routes>
					<Route path="/negative" element={<NegativeStatus />} />
				</Routes>
				<Routes>
					<Route path="/tcSuccess" element={<TitleChangeSuccessful />} />
				</Routes>
				<Routes>
					<Route path="/approvalWait" element={<approvalWaiting />} />
				</Routes>
				<Routes>
					<Route path="/verification" element={<Verification />} />
				</Routes>
				<Routes>
					<Route path="/status" element={<Status />} />
				</Routes>
				<Routes>
					<Route path="/govNavbar" element={<GovNavbar />} />
				</Routes>
				<Routes>
					<Route path="/govFooter" element={<GovFooter />} />
				</Routes>
				<Routes>
					<Route path="/govWelcome" element={<GovWelcome />} />
				</Routes>
				<Routes>
					<Route path="/govConfirmation" element={<GovConfirmation />} />
				</Routes>
				<Routes>
					<Route path="/govIssue" element={<GovIssueRc />} />
				</Routes>
				<Routes>
					<Route path="/govBlacklist" element={<GovBlacklist />} />
				</Routes>
				<Routes>
					<Route path="/confirmation/:vid" element={<Confirmation />} />
				</Routes>
				<Routes>
					<Route path="/forgotPassword" element={<ForgotPassword />} />
				</Routes>
				<Routes>
					<Route path="/myProfile" element={<MyProfile />} />
				</Routes>
				<Routes>
					<Route path="/interPage" element={<IntermediaryPage />} />
				</Routes>
				<Routes>
					<Route path="/fine" element={<Fine />} />
				</Routes>
				<Routes>
					<Route path="/govfine" element={<GovFine />} />
				</Routes>
				<Routes>
					<Route path="/govverify" element={<GovVerify />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
