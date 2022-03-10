import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'


function ListingItem({ listing, id, onDelete, onEdit }) {
  return (
    <div className=" bg-white px-3 py-3 w-72 overflow-hidden rounded-xl shadow-md flex flex-row md:flex-col">
    <li >
      <Link
        to={`/category/${listing.type}/${id}`}
        
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="w-70 h-48 object-cover rounded-xl"
        />
        <div className=''>
          
          <p className='text-black p-2 font-bold '>{listing.name}</p>

          <p className="text-green-400 font-bold mx-auto ml-2">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && ' / Month'}
          </p>
          
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className='relative bottom-0 left-60 top-6 cursor-pointer '
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && <EditIcon fill='blue' className="relative bottom-auto left-30 cursor-pointer" onClick={()=> onEdit(id)}/>}
      
    </li>
    </div>
  )
}

export default ListingItem