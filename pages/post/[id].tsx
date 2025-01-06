import { useGetPostDetail } from "@/repositories/get-post-detail";
import type { GetServerSidePropsContext } from "next";

import type { ParsedUrlQuery } from "querystring";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useGetUserDetail } from "@/repositories/get-user-detail";

interface Params extends ParsedUrlQuery {
  id?: string;
}

interface PostDetailPage {
  id: number;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<Params>
) {
  const { id = "" } = context.params || {};
  return {
    props: { id: Number(id) },
  };
}

const PostDetailPage = (props: PostDetailPage) => {
  const { id } = props;
  const { data: postDetail, isLoading: postDetailLoading } = useGetPostDetail({
    id,
  });
  const { data: user, isLoading: userLoading } = useGetUserDetail({
    id: postDetail?.data?.user_id,
  });

  const loading = postDetailLoading || userLoading;

  return (
    <div className="m-4">
      <Card
        loading={loading}
        actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
      >
        <Card.Meta
          title={user?.data?.name}
          description={
            <>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <p className="font-bold">{postDetail?.data?.title}</p>
              <p>{postDetail?.data?.body}</p>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default PostDetailPage;
