import { useEffect, useState } from 'react';
import catsAPI from '../api/catsAPI';

export function useGetAllCats() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        (async () =>{
            const result = await catsAPI.getAll();
            setCats(result)
        })();
    }, []);

return [ cats, setCats];

}