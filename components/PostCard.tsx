import React from 'react'
import { Post } from '@/types'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useAuthState } from '@/context/auth'
import axios from 'axios'

interface PostCardProps {
  post: Post
  subMutate: () => void
}

const PostCard = ({
  post:
  {
    identifier,
    slug,
    title,
    body,
    subName,
    createAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub
  }, subMutate }: PostCardProps) => {
  const router = useRouter();
  const isInSubPage = router.pathname === '/r/[sub]'
  console.log('router.pathname', router.pathname)

  const { authenticated } = useAuthState();

  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");

    if (value === userVote) value = 0;

    try {
      await axios.post("/votes", { identifier, slug, value });
      subMutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className='flex mb-4 bg-white rounded'
      id={identifier}
    >
      {/* 좋아요 싫어요 기능 부분 */}
      <div className='flex-shrink-0 w-10 py-2 text-center rounded-l'>
        {/* 좋아요 */}
        <div
          className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
          onClick={() => vote(1)}
        >
          <i className={classNames("fas fa-arrow-up", {
            "text-red-500": userVote === 1
          })}>
          </i>
        </div>
        <p className='text-us font-bold'>{voteScore}</p>
        <div
          className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'
          onClick={() => vote(-1)}
        >
          <i className={classNames("fas fa-arrow-down", {
            "text-blue-500": userVote === -1
          })}>
          </i>
        </div>
      </div>
      <div className='w-full p-2'>
        {!isInSubPage && (
          <div className='flex items-center'>
            <Link href={`/r/${subName}`}>
              <Image
                src={sub!.imageUrl}
                alt="sub"
                className="rounded-full cursor-pointer"
                width={12}
                height={12}
              />
            </Link>
            <Link href={`/r/${subName}`} className='ml-2 text-xs font-bold cursor-pointer hover:underline'>
              /r/{subName}
            </Link>
            <span className='mx-1 text-xs text-gray-400'></span>
          </div>
        )}

        <p className='text-xs text-gray-400'>
          Posted by
          <Link href={`/r/${username}`} className='mx-1 hover:underline'>
            /u/{username}
          </Link>
          <Link href={url} className='mx-1 hover:underline'>
            {dayjs(createAt).format('YYYY-MM-DD HH:mm')}
          </Link>
        </p>

        <Link href={url} className='my-1 text-lg font-medium'>
          {title}
        </Link>
        {body && <p className='my-1 text-sm'>{body}</p>}
        <div className='flex'>
          <Link href={url}>
            <i className="mr-1 fas fa-comment-alt fa-xs"></i>
            <span>{commentCount}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard