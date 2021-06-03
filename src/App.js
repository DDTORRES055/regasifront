import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import { LayoutProvider } from "./Context/LayoutContext";
import PanelLayout from "./panelLayout";
import Schedules from "./Pages/Schedules/Schedules";
import Incidents from "./Pages/Incidents/Incidents";
import Assists from "./Pages/Assists/Assists";
import Users from "./Pages/Users/Users";
import Invoice from "./Pages/Invoice/Invoice";
import ContainerForm from "./Pages/ContainerForm/ContainerForm";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import SignIn from "./Forms/SignIn/SignIn";
import SignUp from "./Forms/SignUp/SignUp";
import "./App.css";

function App() {
    return (
        <UserProvider>
            <Router>
                <Switch>
                    <LayoutProvider>
                        <Route exact path="/">
                            <PanelLayout />
                        </Route>
                        <Route exact path="/schedules">
                            <Schedules />
                        </Route>
                        <Route exact path="/incidents">
                            <Incidents />
                        </Route>
                        <Route exact path="/assists">
                            <Assists />
                        </Route>
                        <Route exact path="/users">
                            <Users />
                        </Route>
                        <Route exact path="/invoice/:invoiceID">
                            <Invoice />
                        </Route>
                        <Route exact path="/updateUser">
                            <UpdateUser />
                        </Route>
                        <Route exact path="/signin">
                            <ContainerForm>
                                <SignIn />
                            </ContainerForm>
                        </Route>
                        <Route exact path="/signup">
                            <ContainerForm>
                                <SignUp />
                            </ContainerForm>
                        </Route>
                    </LayoutProvider>
                </Switch>
            </Router>
        </UserProvider>
    );
}

export default App;
