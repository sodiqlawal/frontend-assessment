import { EQueryKey } from '@/constants/query-keys';
import { Controller } from '@/hooks/useController';
import { createPostAPI } from '@/services/posts/mutation';
import { Post } from '@/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type MutationContext = { previousPosts?: Post[] };

export function useCreatePost(controller?:Controller) {
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
