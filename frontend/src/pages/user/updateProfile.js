import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layouts/MetaData'
import Loader from '../../components/layouts/Loader'
import { updateProfile, clearErrors, clearMessages } from '../../actions/userActions'

const UpdateProfile = ({ history }) => {
    const [me, setMe] = useState({ name: '', email: '', avatar: '' })
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('')

    const { user } = useSelector(state => state.auth)
    const { error, loading, isUpdate, message } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        if (user) {
            setMe({ name: user.name, email: user.email })
            setAvatarPreview(user.avatar.url)
        }
    }, [])

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch(clearMessages())
            history.push('/me')
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [isUpdate, user, error, message, alert, dispatch, history])

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setMe({ ...me, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email } = me
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData))

    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title='update-profile' />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mt-2 mb-5">Update Profile</h1>

                                <div className="form-group">
                                    <label htmlFor="email_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={me.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={me.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarPreview}
                                                    className='rounded-circle'
                                                    alt='Avatar Preview'
                                                />
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={handleChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateProfile
