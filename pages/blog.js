import Image from "next/image"
import PostCard from "../components/PostCard"

const Blog = () => {
    return (
        <div className="container">
            <h1 className="my-5">Blog Page</h1>
            <div className="row">
                <PostCard />
                <PostCard />
            </div>
        </div>
    );
};

export default Blog;