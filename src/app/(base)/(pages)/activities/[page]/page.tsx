import Link from "next/link";

import { GET as routeHandler } from "../../../../api/activity/preview/[page]/route";

import ActivityTag from "@/components/ActivityTag";

import joinClasses from "@/util/joinClasses";
import PostData from "@/util/PostData";

function PostPreview({ postData }: { postData: PostData }) {
  return (
    <li className={joinClasses(
      "px-2 py-1.5 card",
      "shadow shadow-transparent hover:shadow-black/20",
      "transition-shadow"
    )}>
      <Link href={`/activity/${postData.postId}`}>
        <h1 className="text-2xl font-medium">{postData.title}</h1>
        {/* <h2 className="text-sm">{`by ${postData.author}`}</h2> */}

        <ul className="[&>*:not(:last-child)]:mr-1">
          {
            postData.tags.map((
              tagData: { name: string, color: string | undefined },
              i: number
            ) => (
              <li className="inline-block" key={`tag-${i}`}>
                <ActivityTag name={tagData.name} color={tagData.color} />
              </li>                        
            ))
          }
        </ul>

        <p className="mt-1 text-sm">{postData.blurb}</p>
      </Link>
    </li>
  )
}

function PostPreviewList({ pagePostData }: { pagePostData: PostData[] }) {
  return (
    <ul className="[&>*:not(:last-child)]:mb-2">
      {
        pagePostData.map((postData: PostData, i: number) => (
          <PostPreview postData={postData} key={`postData-${i}`} />
        ))
      }
    </ul>
  );
}

export default async function ActivityPostList({
  params
}: {
  params: { page: string }
}) {
  const response = await routeHandler(null, { params });
  const pagePostData = await response.json();

  return (
    <>
      <section className="p-2 mx-auto max-w-6xl">
        {
          pagePostData?.length > 0
            ? <PostPreviewList pagePostData={pagePostData} />
            : (
              <h1 className="text-center text-xl font-medium">
                Looks like there&apos;s nothing here... page {params.page} doesn&apos;t have anything!
              </h1>
            )
        }
      </section>
    </>
  )
}
