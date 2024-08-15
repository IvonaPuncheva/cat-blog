import { Link } from "react-router-dom"

export default function LatestCat({
    _id,
    name,
    imageUrl,
}) {
 return (
<div className="game bg-[#f0e68c] border-2 border-[#2c3e50] p-4 rounded-lg shadow-md">
  <div className="image-wrap mb-4">
    <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-md" />
  </div>
  <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{name}</h3>
  
  <div className="data-buttons">
    <Link 
      to={`/cats/${_id}/details`} 
      className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg text-center hover:bg-blue-600 transition duration-300"
    >
      Details
    </Link>
  </div>
</div>
 );
}