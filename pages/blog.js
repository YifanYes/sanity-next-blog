import { useState, useEffect } from "react";
import PostCard from "../components/PostCard"

const Blog = ({ posts }) => {
    const [mappedPosts, setMappedPosts] = useState([]);

    useEffect(() => {
        if (Array.isArray(posts) && !posts.length) setMappedPosts([]);
        else {
            setMappedPosts(
                posts.map((post) => {
                    return {
                        ...post
                    };
                })
            );
        }
    }, [posts]);

    return (
        <div className="container">
            <h1 className="my-5">Blog Page</h1>

            <div className="row">
                {mappedPosts &&
                    mappedPosts.length &&
                    mappedPosts.map((post, index) => (
                        <PostCard data={post} key={index} />
                    ))}
            </div>
        </div>
    );
};

export const getServerSideProps = async (context) => {

    const query = encodeURIComponent(`*[ _type == "post" ]`);
    const url = `${process.env.SANITY_URL}query=${query}`;

    const data = await fetch(url).then((res) => res.json());
    const posts = data.result;

    if (!posts || !posts.length === 0) {
        return {
            props: {
                posts: [],
            },
        };
    } else {
        return {
            props: {
                posts,
            },
        };
    }
};

export default Blog;