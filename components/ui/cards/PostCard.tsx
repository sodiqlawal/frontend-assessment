import { Icons } from '@/components/icons';
import { useDeletePost } from '@/services/posts/hooks/useDeletePost';
import { Post } from '@/types/post';

interface Props {
  post: Post;
}
const PostCard = ({ post }: Props) => {
  if (!post) return null;

  const { mutate } = useDeletePost();

  const handleDelete = () => {
    mutate(post.id);
  };

  return (
    <div className='w-full h-[293px] space-y-[16px] p-6 rounded-[8px] border border-gray-500 bg-white shadow-card relative overflow-auto no-scrollbar'>
      <h1 className='text-lg font-[500] leading-[1.56] text-dark-500'>
        {post.title}
      </h1>
      <p
        className='text-sm leading-[1.43] text-dark-500 line-clamp-8'
        title={post.body}
      >
        {post.body}
      </p>
      <div
        className='absolute top-[4px] right-[4px] cursor-pointer p-[6px]'
        onClick={handleDelete}
      >
        <Icons.delete />
      </div>
    </div>
  );
};

export default PostCard;
