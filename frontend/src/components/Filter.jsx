import { Slider } from '@material-ui/core';

const Filter = ({ price, setPrice, categories, setCategory, setRating, category, rating, setCurrentPage }) => {

    return (

        <div className="px-5">
            <p className='font-weight-bold text-info'
                style={{ cursor: 'pointer' }}
                onClick={() => { setPrice([1, 1000]); setCategory(''); setRating(0); setCurrentPage(1) }}>
                Clear All Filters

            </p>

            <h4 className="mb-3">  Price Range </h4>

            <Slider
                min={1}
                max={1000}
                value={price}
                onChange={(e, value) => { setPrice(value) }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={value => `$${value}`}
            />

            <p className='font-weight-bold text-info'
                style={{ cursor: 'pointer' }}
                onClick={() => { setPrice([1, 1000]) }}>
                Clear Price Filter
            </p>

            <hr className="my-4" />

            <div className="mt-3">

                <h4 className="mb-3"> Categories </h4>

                <ul className="pl-0">
                    {categories.map((cat) => (
                        <li style={{
                            cursor: 'pointer',
                            listStyleType: 'none',
                            background: cat === category ? '#6C757D' : '',
                            color: cat === category ? '#fff' : '',
                            fontWeight: cat === category ? 'bold' : '',
                            borderRadius: '5px'
                        }}
                            key={cat}
                            onClick={() => { setCategory(cat) }}>
                            {cat}
                        </li>
                    )
                    )}
                </ul>

            </div>

            <p className='font-weight-bold text-info' style={{ cursor: 'pointer' }} onClick={() => { setCategory('') }}>Clear Category Filter</p>

            <hr className="my-3" />

            <div className="mt-3">

                <h4 className="mb-3"> Ratings </h4>
                <ul className="pl-0">
                    {[1, 2, 3, 4, 5].map(
                        (star) => (
                            <li style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                                background: rating === star ? '#6C757D' : ''
                            }}
                                key={star}
                                onClick={() => { setRating(star) }}>
                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${star * 20}%` }}></div>
                                </div>
                            </li>
                        )
                    )}
                </ul>
                <p className='font-weight-bold text-info' style={{ cursor: 'pointer' }} onClick={() => { setRating(0) }}>Clear Ratings Filter</p>
            </div>
        </div>

    )
}

export default Filter
