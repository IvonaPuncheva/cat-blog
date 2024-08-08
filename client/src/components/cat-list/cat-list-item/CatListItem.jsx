import { Link } from 'react-router-dom';


export default function CatListItem({
    _id,
    name,
    breed,
    imageUrl,
}) {
 return (
//     <div className="allGames">
//     <div className="allGames-info">
//         <img src={imageUrl} />
//         <h6>{name}</h6>
//         <h2>{breed}</h2>
//         <Link to={`/cats/${_id}/details`} className="details-button">Details</Link>
//     </div>

// </div>

<div className="bg-[#f0e68c] border-2 border-[#2c3e50] p-4 rounded-lg shadow-md">
  <div className="allGames-info">
    <img 
      src={imageUrl} 
      alt={name} 
      className="w-full h-40 object-cover rounded-md mb-4"
    />
    <h6 className="text-xl font-semibold text-[#2c3e50] mb-2">{name}</h6>
    <h2 className="text-2xl font-bold text-[#2c3e50] mb-4">{breed}</h2>
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