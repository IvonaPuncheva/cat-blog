import { useEffect, useState } from "react";
import catsAPI from "../../api/catsAPI";
import LatestCat from "./latest-cat/LatestCat";

export default function Home() {
    const [latestCats, setLatestCats] = useState([]);

    useEffect(() => {
        (async () => {
          
            const result = await catsAPI.getAll();

            setLatestCats(result.reverse().slice(0, 3));
        })();
    }, [])
 
    return (  
<section id="welcome-world" className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto min-h-screen'>
  <div className='text-[#2c3e50] font-bold text-3xl lg:text-6xl'>
    <h2>Cats world</h2>
    <h3 className='text-[#2c3e50] text-2xl'>Here you can share and upload your cat!</h3>
  </div>
  <img src="./images/home-cat.png" className="w-3/5 h-auto object-cover mx-auto" alt="hero" />

  <div id="home-page">
    <h1 className='text-2xl font-semibold text-[#2c3e50]'>Latest Cats</h1>
    <div className='flex flex-wrap gap-4'>
      {latestCats.length > 0
        ? latestCats.map(cat => (
          <div key={cat._id} className='bg-[#f0e68c] border-2 border-[#2c3e50] p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3'>
            <LatestCat {...cat} />
          </div>
        ))
        : <p className='text-2xl font-semibold text-[#2c3e50]'>No cats yet</p>
      }
    </div>
  </div>
</section>


    );
}