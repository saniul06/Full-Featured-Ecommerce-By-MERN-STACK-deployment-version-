import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const AuthRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation()
    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (isAuthenticated === true) {
                        if (location.search) {
                            return <Redirect to={location.search.split('=')[1]} />
                        }
                        return <Redirect to="/" />;
                    }
                    return <Component {...props} />;
                }}
            />
        </>
    );
};

export default AuthRoute
