'use client';
import { EQueryKey } from '@/constants/query-keys';
import { fetchPostsAPI } from '@/services/posts/query';
import { User } from '@/types/user';
import { cn } from '@/utils';
import { useParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import BreadCrumb from '../ui/BreadCrumb';
import CreatePostCard from '../ui/cards/CreatePostCard';
import PostCard from '../ui/cards/PostCard';
import Loader from '../ui/Loader';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Posts = () => {
  const params = useParams<{ 'user-id': string }>();
  const searchParams = useSearchParams();

  const userId = params['user-id'];
  const pageParam = searchParams.get('page') as string;

  const queryClient = useQueryClient();
  const usersData = queryClient.getQueryData<User[]>([
    EQueryKey.users,
    Number(pageParam),
  ]);

  const { data: posts, isLoading } = useQuery({
    queryKey: [EQueryKey.posts],
    queryFn: () => fetchPostsAPI({ userId }),
    enabled: !!userId,
  });

  // retrieve the info of the user who made these posts
  const user = useMemo(
    () => (usersData || []).find((u) => u.id === userId),
    [usersData, userId]
  );

  const breadCrumbs = useMemo(
    () => [
      { title: 'Users', href: `/users?page=${pageParam}` },
      { title: user?.name || '', isDisabled: true },
    ],
    [user]
  );

  if (isLoading)
    return (
      <div className='absolute inset-0 flex items-center justify-center'>
        <Loader />
      </div>
    );
  return (
    <div className='max-w-[856px] mx-auto relative'>
      <BreadCrumb crumbs={breadCrumbs} />

      <h1 className='text-[26px] sm:text-[36px] font-medium leading-[1.11] text-dark-500 my-6'>
        {user?.name || ''}
      </h1>

      <p className='text-sm leading-[1.43] text-gray-600 mb-[44px]'>
        {user?.email || ''}
        <span className='text-dark-500'>{`• ${posts?.length} Post${
          posts?.length! > 1 ? 's' : ''
        }`}</span>
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[23px]'>
        <CreatePostCard className={cn({ 'sm:max-w-[270px]': posts?.length })} />
        {posts?.length
          ? posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Posts;
