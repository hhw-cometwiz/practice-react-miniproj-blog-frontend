const React = require("react");
const ReactRouterDom = require("react-router-dom");
const {routeSettings} = require("../route-settings");
const GlobalComponentContainer = require("../containers/common/GlobalComponentContainer").default;

class App extends React.Component {
    render() {
        return (
            <div>
                <ReactRouterDom.Switch>{
                    routeSettings.map(
                        (setting) => {
                            const {
                                component, path, exact
                            } = setting;
                            
                            return (<ReactRouterDom.Route
                                component={component}
                                path={path}
                                exact={exact} />);
                        }
                    )
                }</ReactRouterDom.Switch>
                <GlobalComponentContainer />
            </div>
        );
    }
}

export default App;
