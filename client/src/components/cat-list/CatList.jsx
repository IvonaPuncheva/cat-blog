import { useGetAllCats } from '../../hooks/useCats';
import CatListItem from './cat-list-item/CatListItem';

export default function CatList() {
const [cats] = useGetAllCats();

    return (
        <section id="catalog-page">
            <h1>All Cats</h1>
            
         {cats.length > 0
         ?cats.map(cat => <CatListItem key={cat._id} {...cat} />)
         :  <h3 className="no-articles">No cats yet</h3>
         }
           
        </section>
    );
}