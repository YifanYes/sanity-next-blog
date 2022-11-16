import Image from "next/image";

const PostCard = () => {
    return (
        <div className="col-lg-4">
            <div className="card">
                <Image
                    width="450"
                    height="500"
                    src={"https://via.placeholder.com/450"}
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title">Blog post One</h5>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the
                        bulk of the content.
                    </p>
                    <a href="blog-post-one" className="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
            </div>
        </div>
    );
};
export default PostCard;