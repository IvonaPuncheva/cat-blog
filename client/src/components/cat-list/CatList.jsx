import { useEffect, useState } from 'react';
import { useGetAllCats } from '../../hooks/useCats';
import CatListItem from './cat-list-item/CatListItem';
import Loader from '../loader/Loader';
import * as catService from '../../api/catsAPI.js'

export default function CatList() {
const [cats, setCats] = useGetAllCats();
const [isLoading, setIsLoading] = useState(true);
const [ error, setError] = useState('');

useEffect(() => {
  const abortController = new AbortController();

  const fetchData = async () => {
      try {
          const response = await catService.getAll( { signal: abortController.signal });
          setCats(response);
          setIsLoading(false);
      } catch (error) {
          setError(error.message);
          setIsLoading(false);
      }
  };

  fetchData();

  return () => {
      abortController.abort();
  };
}, []);

//     return (

// <section id="catalog-page" className="p-6">
//   <h1 className="text-3xl font-bold text-[#2c3e50] mb-12 text-center">All Cats</h1>
//   {cats.length > 0 ? (
//     <div className="flex flex-wrap justify-center gap-4">
//       {cats.map(cat => (
//         <CatListItem key={cat._id} {...cat} />
//       ))}
//     </div>
//   ) : (
//     <h3 className="text-xl text-gray-500">No cats yet</h3>
//   )}
// </section>


//     );

return (
  <section id="catalog-page" className="p-6">
      <h1 className="text-3xl font-bold text-[#2c3e50] mb-12 text-center">All Cats</h1>
      
      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">{error}</span>
          </div>
      )}

      {isLoading ? (
          <div className="flex items-center justify-center">
              <Loader />
          </div>
      ) : cats.length === 0 ? (
          <h3 className="text-xl text-gray-500 text-center">No cats yet. Please try again later.</h3>
      ) : (
          <div className="flex flex-wrap justify-center gap-4">
              {cats.map(cat => (
                  <CatListItem key={cat._id} {...cat} />
              ))}
          </div>
      )}
  </section>
);

}