import BlockContent from "@sanity/block-content-to-react";
import { useNextSanityImage } from "next-sanity-image";
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "../sanityClient";

const BlogPost = (props) => {
    const { title, body, image } = props;
    const imageProps = useNextSanityImage(sanityClient, image);

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {title}
                    </li>
                </ol>
            </nav>

            <div className="post-content-wrap">
                <h1>{title}</h1>
                {imageProps && <Image {...imageProps} layout="intrinsic" alt="" />}

                <BlockContent blocks={body} />
            </div>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const pageSlug = context.query.slug;

    if (!pageSlug) {
        return {
            notFound: true,
        };
    }

    const query = encodeURIComponent(
        `*[ _type == "post" && slug.current == "${pageSlug}" ]`
    );
    const url = `${process.env.SANITY_URL}query=${query}`;

    const data = await fetch(url).then((res) => res.json());
    const post = data.result[0];

    if (!post) {
        return {
            notFound: true,
        };
    } else {
        return {
            props: {
                title: post.title,
                body: post.body,
                image: post.mainImage,
            },
        };
    }
};

export default BlogPost;
