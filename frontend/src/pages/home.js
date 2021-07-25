import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productActions';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import MetaData from '../components/layouts/MetaData';
import Product from '../components/product/Product';
import Loader from '../components/layouts/Loader';
import Filter from '../components/Filter'

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState([1, 1000]);
    const [rating, setRating] = useState(0);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const keyword = match.params.keyword;

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const dispatch = useDispatch();

    const { products, error, loading, itemsPerPage, count } =
        useSelector((state) => state.allProducts);

    const alert = useAlert();

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getAllProducts(currentPage, keyword, price, category, rating));
    }, [dispatch, alert, error, currentPage, keyword, price, category, rating]);

    return (
        <>
            <MetaData title="Home" />
            <section id="products" className=" mt-5">
                <div className="row">
                    <div className="col-6 col-md-3 mb-5">
                        <Filter price={price} setPrice={setPrice} categories={categories} setCategory={setCategory} setRating={setRating} category={category} rating={rating} setCurrentPage={setCurrentPage} />
                    </div>
                    <div className="col-6 col-md-9">
                        {loading === true ? <Loader /> : (
                            <div className="row">
                                {count ? (
                                    products &&
                                    products.map((product) => (
                                        <Product
                                            key={product._id}
                                            product={product}
                                            col={4}
                                        />
                                    ))
                                ) : (
                                    <h4 className="p-center">
                                        No Product Found
                                    </h4>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </section>

            {count > itemsPerPage && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={count}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="First"
                        lastPageText="Last"
                        onChange={setCurrentPageNo}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )}



        </>
    );
};

export default Home;
