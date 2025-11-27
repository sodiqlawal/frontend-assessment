import CreatePostModal from '@/components/CreatePostModal';
import { Icons } from '@/components/icons';
import useController from '@/hooks/useController';
import { cn } from '@/utils';
import { HTMLAttributes } from 'react';

const CreatePostCard = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const modalController = useController();

  return (
    <div className={cn('w-full', className)}>
      <div
        className='p-6 flex flex-col w-full items-center h-[293px] justify-center gap-2 rounded-[8px] bg-white border border-dashed border-gray-500 cursor-pointer group'
        onClick={modalController.open}
      >
        <div className='p-[2px] group-hover:scale-[1.06] duration-300'>
          <Icons.addCircle />
        </div>
        <p className='text-sm font-semibold leading-[1.43] text-dark-600'>
          New Post
        </p>
      </div>
      <CreatePostModal controller={modalController} />
    </div>
  );
};

export default CreatePostCard;
