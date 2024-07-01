import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UserPostsLayout metadata'
};

type Props = { children: React.ReactNode };

const UserPostsLayout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default UserPostsLayout;
