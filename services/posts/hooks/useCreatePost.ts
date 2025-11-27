import { EQueryKey } from '@/constants/query-keys';
import { Controller } from '@/hooks/useController';
import { createPostAPI } from '@/services/posts/mutation';
import { Post } from '@/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type MutationContext = { previousPosts?: Post[] };

export function useCreatePost(controller?: Controller) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostAPI,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: [EQueryKey.posts] });

      const previousPosts =
        queryClient.getQueryData<Post[]>([EQueryKey.posts]) ?? [];

      queryClient.setQueryData([EQueryKey.posts], (old: Post[] = []) => [
        ...old,
        {
          id: crypto.randomUUID(),
          ...newPost,
        },
      ]);

      controller?.close();
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      toast.error(err?.message || 'An unexpected error occurred');
      
      // rollback logic using context.previousPosts
      queryClient.setQueryData(
        [EQueryKey.posts],
        (context as MutationContext)?.previousPosts
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKey.posts] });
    },
  });
}
