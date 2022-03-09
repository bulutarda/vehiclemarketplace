import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [owner, setOwner] = useState(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", params.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error("Could not get owner data");
      }
    };
    //TODO AYNI KİŞİ CONTACT LANDLORDA TIKLARSA ERROR VERSİN
    getOwner();
  }, [params.ownerId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="m-5">
      {owner !== null && (
        <main>
          <div className="mt-5 flex items-center">
            <p className="text-4xl font-bold">Contact {owner?.name}</p>
          </div>
          <form className="mt-2">
            <div className="mt-5 flex flex-col mb-10">
              <label htmlFor="message" className="mb-2 text-extrabold">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="form-control
        
        w-72
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${owner.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button
                type="button"
                className="px-10 py-5 bg-green-400 rounded-full mb-5 font-bold"
              >
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
