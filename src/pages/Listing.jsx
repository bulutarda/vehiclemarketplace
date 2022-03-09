import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
SwiperCore.use([Navigation,Pagination,Scrollbar, A11y])

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);
  if (loading) return <Spinner />;
  return (
    <main>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className="relative w-full h-full"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="cursor-pointer fixed top-2 right-5 z-20 bg-white rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="share icon" />
      </div>

      {shareLinkCopied && <p className="fixed top-8 right-5 z-20 bg-slate-400 rounded-xl px-4 py-2 font-semibold text-white">Link Copied!</p>}

      <div className="m-4 font-semibold">
        <p className="mb-2 text-5xl text-green-400">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="mb-5 text-2xl">{listing.location}</p>
        <p className="px-4 py-2 bg-green-500 font-semibold inline rounded-full">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="px-4 py-2  bg-gray-400 font-semibold inline rounded-full ml-10">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}
        

        <p className="text-center font-bold text-7xl mb-10 mt-10">Location</p>

        <div className="w-full h-52 overflow-x-hidden mb-10">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        
      </div>
      {auth.currentUser?.uid !== listing.userRef && (
          <div className="mb-10">
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className=" ml-10 px-4 py-2 bg-blue-500 font-semibold rounded-full hover:font-bold"
          >
            Contact Owner
          </Link>
          </div>
        )}
    </main>
  );
};

export default Listing;
