import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../../components/layouts/MetaData'
import Loader from '../../components/layouts/Loader'
import { myOrders, clearErrors } from '../../actions/orderActions'

const ListOrders = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, orders, error } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(myOrders())
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert])

    const setOrder = () => {
        const data = {
            columns: [
                {
                    label: 'Order Id',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Number of items',
                    field: 'numOfItems',
                    sort: 'asc',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'View',
                    field: 'view',
                    sort: 'asc',
                },
            ],
            rows: []
        }

        orders.forEach(order => data.rows.push({
            id: order._id,
            numOfItems: order.orderItems.length,
            amount: `$${order.totalPrice}`,
            status: order.orderStatus.includes('processing') ? <p className="text-danger font-weight-bold">{order.orderStatus}</p> : <p className="text-success font-weight-bold">{order.orderStatus}</p>,
            view: <Link to={`/order/${order._id}`} className='btn btn-primary'><i className="fa fa-eye" aria-hidden="true"></i></Link>
        }))
        return data
    }

    return (
        <>
            <MetaData title='me/orders' />
            <h1 className='my-5'>My orders</h1>
            {loading ? <Loader /> : (
                <>
                    <MDBDataTable
                        data={setOrder()}
                        className='px-3'
                        hover
                        bordered
                        striped
                    />
                </>
            )}
        </>
    )
}

export default ListOrders
