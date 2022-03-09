import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Reference
        const listingsRef = collection(db, "listings");

        //Create a query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );

        //execute  query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListings();
  }, []);

  const onFetchMoreListings = async () => {
    try {
      //Get Reference
      const listingsRef = collection(db, "listings");

      //Create a query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      //execute  query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };

  return (
    <div className="">
      <h1 className="text-black leading-tight text-6xl ml-9 mb-5 mt-5">Offers</h1>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <ul className="ml-9 grid gap-y-6 gap-x-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <ListingItem
              listing={listing.data}
              id={listing.id}
              key={listing.id}
            />
          ))}
        </ul>
      ) : (
        <p>There are no current offers</p>
      )}
       <br />
          <br />
          {lastFetchedListing && (
            <p className="cursor-pointer w-32 mx-auto text-center py-1 px-2 bg-gray-400 text-black rounded-2xl mt-8 font-semibold" onClick={onFetchMoreListings}>Load More</p>
          )}
    </div>
  );
};

export default Offers;
