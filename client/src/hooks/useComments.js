import { useEffect, useState } from "react";
import commentsAPI from "../api/commentsAPI.js";


export function useCreateComment() {
    const createHandler = (catId, comment) => commentsAPI.create(catId, comment);

    return createHandler;
}

export function useGetAllComments(catId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(catId);
            setComments(result);
        })();
    }, [catId]);
    return [comments, setComments];
}