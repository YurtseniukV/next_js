import { ICommentModel } from "@/models/ICommentModel";
import { IPostModel } from "@/models/IPostModel";
import { IUserModel } from "@/models/IUserModel";

const base: string = 'https://jsonplaceholder.typicode.com';

const urlBuilder = {
    users:{
        userBaseUrl: '/users',
    allUsers: () => base + urlBuilder.users.userBaseUrl,
    singleUser: (id: number) => base + urlBuilder.users.userBaseUrl + '/' + id
    },
    posts:{
        postBaseUrl:'/posts',
        allPosts:()=>base+urlBuilder.posts.postBaseUrl,
        postsByUser: (userId: number) => base + urlBuilder.posts.postBaseUrl + '?userId=' + userId
    },
    comments:{
        commentsBaseUrl:'/comments',
        allComments:()=>base+urlBuilder.comments.commentsBaseUrl
    }

}

const userService = {

    getAllUsers: async (): Promise<IUserModel[]> => {
        let users = await fetch(
            urlBuilder.users.allUsers(),
            // {cache: 'no-store'} //  Server Side Rendering/ якщо дані змінюються рідко
            // {cache: 'force-cache'} // Static Site Generator/змінюють дуже рідко
            //{next: {revalidate: 60}} //дані змінюються часто і відомо яка послідовність// Incremental Static Regeneration - Техніка генерації статичних сторінок, де частини сайту оновлюються без перегенерації всіх сторінок
        ).then(value => value.json());
        return users;
    }
}

const postService = {

    getAllPosts: async (): Promise<IPostModel[]> => {
        let posts = await fetch(
            urlBuilder.posts.allPosts(),
            // {cache: 'no-store'} // Side Server Rendering
            // {cache: 'force-cache'} // SSG
            //{next: {revalidate: 60}} // ISR
        ).then(value => value.json());
        return posts;
    },
    getPostsByUserId: async (userId: number): Promise<IPostModel[]> => {
        const posts = await fetch(urlBuilder.posts.postsByUser(userId))
            .then(value => value.json());
        return posts;
    }
}

const commentService = {

    getAllComments: async (): Promise<ICommentModel[]> => {
        let comments = await fetch(
            urlBuilder.comments.allComments(),
            // {cache: 'no-store'} // Side Server Rendering
            // {cache: 'force-cache'} // SSG
            //{next: {revalidate: 60}} // ISR
        ).then(value => value.json());
        return comments;
    }
}



export {
    userService,
    commentService,
    postService
}