import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { gql } from "graphql-request";

import { GraphQLClient } from "graphql-request";

export default function page({ data }) {
  return (
    <>
      <h1>{data?.title}</h1>
      <RichTextRenderer node={data?.text.json} />
    </>
  );
}
export async function getStaticProps({ params }) {
  const client = new GraphQLClient(
    `https://caisy.io/api/v3/e/${process.env.CAISY_ID}/graphql`,
    {
      headers: {
        "x-caisy-apikey": process.env.CAISY_API_KEY,
      },
    }
  );
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
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "my-first-article" } }],
    fallback: false, // can also be true or 'blocking'
  };
}
