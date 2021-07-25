import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../components/layouts/MetaData'
import Loader from '../../components/layouts/Loader'


const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    // const isInitialMount = useRef(true);

    // useEffect(() => {
    //     if (isInitialMount.current) {
    //         isInitialMount.current = false;
    //     } else {
    //         // Your useEffect code here to be run on update
    //         if (!isAuthenticated) {
    //             dispatch(clearErrors())
    //             history.push('/')
    //         }
    //     }
    // });

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title='profile' />
                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user && user.avatar.url} alt='' />
                            </figure>
                            <Link to="/me/edit" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profileee
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user && user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user && user.email}</p>

                            <h4>Joined on</h4>
                            <p>{user && user.createdAt.substr(0, 10)}</p>

                            {user && user.role !== 'admin' && (<Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                My Orders
                            </Link>)}

                            <Link to="/me/password" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile
