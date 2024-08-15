import { useEffect, useState } from "react";
import commentsAPI from "../api/commentsAPI.js";
import usePersistedState from "./usePersistedState.js";

export function useCreateComment() {
    const createHandler = async (catId, email, comment) => {
        try {
            const newComment = await commentsAPI.create(catId, email, comment);
            return newComment;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    };

    return createHandler;
}
export function useGetAllComments(catId) {

    const [comments, setComments] = usePersistedState(`comments_${catId}`, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const result = await commentsAPI.getAll(catId);
                setComments(result); 
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [catId, setComments]);

    return [comments, setComments];
};