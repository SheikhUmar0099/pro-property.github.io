import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  console.log(sidebardata);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row bg-[#222021] text-white min-h-screen'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full bg-gray-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#ffa500]'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='all'
                className='hidden'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <label
                htmlFor='all'
                className={`cursor-pointer w-5 h-5 border-2 rounded-md flex justify-center items-center ${sidebardata.type === 'all' ? 'bg-[#ffa500] border-[#ffa500]' : 'border-white'}`}
              >
                {sidebardata.type === 'all' && (
                  <svg className='w-3 h-3 text-black' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='rent'
                className='hidden'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <label
                htmlFor='rent'
                className={`cursor-pointer w-5 h-5 border-2 rounded-md flex justify-center items-center ${sidebardata.type === 'rent' ? 'bg-[#ffa500] border-[#ffa500]' : 'border-white'}`}
              >
                {sidebardata.type === 'rent' && (
                  <svg className='w-3 h-3 text-black' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
              <span>Rent</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='sale'
                className='hidden'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <label
                htmlFor='sale'
                className={`cursor-pointer w-5 h-5 border-2 rounded-md flex justify-center items-center ${sidebardata.type === 'sale' ? 'bg-[#ffa500] border-[#ffa500]' : 'border-white'}`}
              >
                {sidebardata.type === 'sale' && (
                  <svg className='w-3 h-3 text-black' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
              <span>Sale</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='offer'
                className='hidden'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <label
                htmlFor='offer'
                className={`cursor-pointer w-5 h-5 border-2 rounded-md flex justify-center items-center ${sidebardata.offer ? 'bg-[#ffa500] border-[#ffa500]' : 'border-white'}`}
              >
                {sidebardata.offer && (
                  <svg className='w-3 h-3 text-black' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='parking'
                className='hidden'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <label
                htmlFor='parking'
                className={`cursor-pointer w-5 h-5 border-2 rounded-md flex justify-center items-center ${sidebardata.parking ? 'bg-[#ffa500] border-[#ffa500]' : 'border-white'}`}
              >
                {sidebardata.parking && (
                  <svg className='w-3 h-3 text-black' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
              <span>Parking</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='furnished'
                className='hidden'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <label
                htmlFor='furnished'
                className={`cursor-pointer w-5 h-5 border-2 rounded-md flex justify-center items-center ${sidebardata.furnished ? 'bg-[#ffa500] border-[#ffa500]' : 'border-white'}`}
              >
                {sidebardata.furnished && (
                  <svg className='w-3 h-3 text-black' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ffa500]'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-[#ffa500] text-black p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-[#ffa500] mt-5'>
          Listing results:
        </h1>

        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-white'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-white text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-[#ffa500] hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
