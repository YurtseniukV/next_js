import { IPostModel } from '@/models/IPostModel';
import React, { FC } from 'react';

interface IProps{
    params:{
        userId:string
    }
}

const UserPostsPage:FC<IProps> = async ({params:{userId}}) => {
    let posts:IPostModel[]=  await fetch('https://jsonplaceholder.typicode.com/posts?userId=' +userId)
        .then(value => value.json())
    return (
        <div>
            <ol>
                <li>{posts.map(post=> <ol>
                    <li>{post.id} - {post.title} : {post.body}</li>
                </ol>)}</li>
            </ol>
        </div>
    );
};

export default UserPostsPage;