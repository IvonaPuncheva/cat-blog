import { useEffect, useState } from 'react';
import catsAPI from '../api/catsAPI';

export function useGetAllCats() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await catsAPI.getAll();
            setCats(result);
        })();
    }, []);

    return [cats, setCats];

}

export function useGetOneCat(catId) {
    const [cat, setCat] = useState({});
    useEffect(() => {
        (async () => {
            const result = await catsAPI.getOne(catId);
            setCat(result);
        })();
    }, [catId]);

    return [
        cat,
        setCat,
    ];
}

export function useCreateCat() {
    const catCreateHandler = (catData) => catsAPI.create(catData);
    return catCreateHandler;
}

