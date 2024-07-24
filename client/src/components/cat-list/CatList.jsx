import { useEffect, useState } from 'react';
import * as catsAPI from '../../api/catsAPI'
import CatListItem from './cat-list-item/CatListItem';

export default function CatList() {
const [cats, setCats] = useState([]);

    useEffect(() => {
        catsAPI.getAll()
            .then(result =>setCats(result));
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* <!-- Display div: with information about every game (if any) --> */}
         {cats.length > 0
         ?cats.map(cat => <CatListItem key={cat._id} {...cat} />)
         :  <h3 className="no-articles">No cats yet</h3>
         }
           
        </section>
    );
}