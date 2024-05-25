import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="bg-[#222021] text-white">
      {/* Header */}
      <div className="flex flex-col gap-6 p-10 max-w-6xl mx-auto text-center">
        <h1 className="text-[#ffa500] font-bold text-4xl lg:text-6xl">
          Find your next <span className="text-gray-300">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Sahand Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </p>
        <Link
          to="/search"
          className="text-base text-[#ffa500] font-semibold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className="h-96"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Listings */}
      <div className="max-w-6xl mx-auto p-4 my-10">
        {offerListings.length > 0 && (
          <section className="mb-10">
            <h2 className="text-3xl font-semibold text-[#ffa500] mb-3">Recent Offers</h2>
            <Link to="/search?offer=true" className="text-[#ffa500] hover:underline">
              Show more offers
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
        {rentListings.length > 0 && (
          <section className="mb-10">
            <h2 className="text-3xl font-semibold text-[#ffa500] mb-3">Recent Places for Rent</h2>
            <Link to="/search?type=rent" className="text-[#ffa500] hover:underline">
              Show more places for rent
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
        {saleListings.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold text-[#ffa500] mb-3">Recent Places for Sale</h2>
            <Link to="/search?type=sale" className="text-[#ffa500] hover:underline">
              Show more places for sale
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
