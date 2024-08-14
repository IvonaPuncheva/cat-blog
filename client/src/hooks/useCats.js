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
    const [cat, setCat] = useState({
        name: '',
        breed: '',
        age: '',
        imageUrl: '',
        description: '',
    });
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

// export function useEditCat(){
//     const catEditHandler = (catData) => catsAPI.edit(catData);
//     return catEditHandler;
// }


// export const useEditCat = () => {
//     return async (catId, values) => {
//         const response = await fetch(`/api/cats/${catId}/details/edit`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(values),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to edit cat');
//         }

//         return await response.json();
//     };
// };
export const useEditCat = () => {
    return async (catId, values) => {
        const response = await fetch(`/api/cats/${catId}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error('Failed to update cat');
        }

        return await response.json();
    };
};
