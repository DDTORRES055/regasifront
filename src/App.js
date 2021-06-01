import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import { LayoutProvider } from "./Context/LayoutContext";
import PanelLayout from "./panelLayout";
import Invoices from "./Pages/Invoices/Invoices";
import Payments from "./Pages/Payments/Payments";
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
                        <Route exact path="/invoices">
                            <Invoices />
                        </Route>
                        <Route exact path="/payments">
                            <Payments />
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
