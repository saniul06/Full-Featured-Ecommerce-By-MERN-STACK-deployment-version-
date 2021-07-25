import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countries } from 'countries-list';
import MetaData from '../components/layouts/MetaData';
import CheckoutSteps from '../components/layouts/CheckoutSteps'
import { saveShippingInfo } from '../actions/cartActions';

const ShippingInfo = ({ history }) => {
    const countriesList = Object.values(countries);

    const { shippingInfo } = useSelector(state => state.cart)

    const [shipInfo, setShipInfo] = useState({
        address: shippingInfo.address || '',
        city: shippingInfo.city || '',
        phoneNo: shippingInfo.phoneNo || '',
        postalCode: shippingInfo.postalCode || '',
        country: shippingInfo.country || ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setShipInfo({
            ...shipInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(saveShippingInfo(shipInfo))
        history.push('/login?redirect=confirm/order')
    }

    return (
        <>
            <MetaData title='shipping-info' />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={shipInfo.address}
                                name="address"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={shipInfo.city}
                                name="city"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={shipInfo.phoneNo}
                                name="phoneNo"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">
                                Postal Code
                            </label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={shipInfo.postalCode}
                                name="postalCode"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={shipInfo.country}
                                name="country"
                                onChange={handleChange}
                                required>
                                {countriesList.map((country) => (
                                    <option key={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ShippingInfo;
