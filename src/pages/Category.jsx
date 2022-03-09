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

const Category = () => {
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
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //execute  query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length -1]
        setLastFetchedListing(lastVisible)

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
  }, [params.categoryName]);
  
  // Pagination /Load More
  const onFetchMoreListings = async () => {
    try {
      //Get Reference
      const listingsRef = collection(db, "listings");

      //Create a query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      //execute  query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length -1]
      setLastFetchedListing(lastVisible)

      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState)  => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };

  return (
    <div className="m-4">
      <header>
        <p className="text-black text-6xl ml-4 mb-10">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 ml-4 list-none">
            
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className="cursor-pointer w-32  mx-auto my-0 text-center py-1 px-2 bg-black text-white rounded-2xl mt-8 mb-" onClick={onFetchMoreListings}>Load More</p>
          )}
        </>
      ) : (
        <p>No Listings for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
