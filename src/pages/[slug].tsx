import { client } from "@/client";
import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { gql } from "graphql-request";
export default function Home({ data }) {
  return (
    <>
      <h1>{data?.title}</h1>
      <RichTextRenderer node={data?.text.json} />
    </>
  );
}
export async function getStaticProps({ params }) {
  const gqlResponse = await client.request(
    gql`
      query allBlogArticle($slug: String) {
        allBlogArticle(where: { slug: { eq: $slug } }) {
          edges {
            node {
              text {
                json
              }
              title
              slug
              id
            }
          }
        }
      }
    `,
    { slug: params?.slug }
  );
  return {
    props: {
      data: gqlResponse?.allBlogArticle?.edges?.[0]?.node
        ? gqlResponse.allBlogArticle.edges?.[0].node
        : null,
    }, // will be passed to the page component as props
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
