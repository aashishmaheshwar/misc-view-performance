import { Comment } from "pages/DataViews";
import { useCallback } from "react";

export const useUtilityFns = () => {
    const groupByPostId = useCallback((data: Array<Comment>) => {
        const groupedDataSet = data.reduce((groupedComments, comment) => {
            const { postId, ...rest } = comment;

            if (!groupedComments.has(postId)) {
                groupedComments.set(postId, [rest]);
            } else {
                const comments = groupedComments.get(postId);

                groupedComments.set(postId, [...comments, rest]);
            }

            return groupedComments;
        }, new Map());

        return Array.from(groupedDataSet, ([postId, comments]: [string, Comment[]]) => ({
            postId,
            comments,
        }));
    }, []);

    return {groupByPostId};
};