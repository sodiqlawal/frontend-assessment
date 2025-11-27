import { EQueryKey } from '@/constants/query-keys';
import { deletePostAPI } from '@/services/posts/mutation';
import { Post } from '@/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostAPI,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: [EQueryKey.posts] });

      const previousPosts =
        queryClient.getQueryData<Post[]>([EQueryKey.posts]) ?? [];

      queryClient.setQueryData<Post[]>([EQueryKey.posts], (old = []) =>
        old.filter((post) => post.id !== postId)
      );

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      toast.error(err?.message || 'An unexpected error occurred');

      queryClient.setQueryData([EQueryKey.posts], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKey.posts] });
    },
  });
}
