import { getAuth, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      console.log(querySnap);
      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // update in firestore database
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };
  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  return (
    <div className="m-10 text-black">
      <header className="flex justify-between items-center">
        <p className="text-4xl font-bold">My Profile</p>
        <button
          onClick={onLogout}
          type="button"
          className="cursor-pointer bg-red-500 px-3 py-1 rounded-2xl mr-5 font-bold hover:bg-red-700"
        >
          Log Out
        </button>
      </header>
      <main>
        <div className="flex justify-between max-w-lg">
          <p className="text-xl my-4">Personal Details</p>
          <p
            className="cursor-pointer font-medium mt-4 text-black px-6 py-1 overflow-none bg-white rounded-3xl mb-5 hover:bg-black hover:text-white"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "Change Personal Details"}
          </p>
        </div>
        <div className="mb-5">
          <form className="p-2 rounded-3xl bg-slate-200 max-w-lg flex justify-between items-center ">
            <input
              onChange={onChange}
              disabled={!changeDetails}
              className="text-black ml-2"
              type="text"
              id="name"
              value={name}
            />
            <input
              onChange={onChange}
              disabled={!changeDetails}
              className="text-black px-5 overflow-hidden"
              type="text"
              id="email"
              value={email}
            />
          </form>
        </div>
        <Link
          to="/create-listing"
          className="p-2 rounded-3xl bg-slate-200 max-w-lg flex justify-between items-center"
        >
          
          <p className="text-black">Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
        {!loading && listings?.length > 0 && (
          <>
            <p className="text-bold text-2xl my-5 ml-2">Your Listings</p>
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
