import { useState } from "react";
import { useRouter } from "next/router";

import { Button, Card, Form, Input, List, notification } from "antd";

import type { FormProps } from "antd";
import type { GetServerSideProps } from "next";

import { useGetPosts } from "@/repositories/get-posts";
import { useCreatePost } from "@/repositories/create-post/use-create-post";

import PostCard from "@/components/PostCard";

interface PostsPageProps {
  page: number;
  pageSize: number;
}

interface FieldType {
  body?: string;
  title?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const pageSize = query.pageSize ? parseInt(query.pageSize as string, 10) : 10;
  const page = query.page ? parseInt(query.page as string, 10) : 1;

  return {
    props: {
      pageSize,
      page,
    },
  };
};

const PostsPage = (props: PostsPageProps) => {
  const { page, pageSize } = props;
  const pagination = { page, pageSize };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    data,
    isLoading,
    refetch: refetchPosts,
  } = useGetPosts({ page, pageSize });
  const createPostMutation = useCreatePost();
  const [notif, notifHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const onPaginationChange = (page: number, pageSize: number) => {
    router.push(
      `/post?${page ? `page=${page}` : ""}${
        pageSize ? `&pageSize=${pageSize}` : ""
      }`
    );
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { body, title } = values;
    if (!body || !title) return;

    createPostMutation.mutate(
      {
        body,
        title,
      },
      {
        onSuccess: (data) => {
          setLoading(false);

          notif.success({
            message: `Post created successfully with post id: ${data.id} and user id: ${data.user_id}`,
          });

          refetchPosts();
          form.resetFields();
        },
        onError: (error) => {
          setLoading(false);

          notif.error({
            message: "Error creating post",
            description: `Error: ${error}`,
          });
        },
      }
    );
  };

  return (
    <>
      {notifHolder}
      <div className="m-4">
        {/* <Input.Search
          placeholder="Search posts..."
          style={{ marginBottom: "10px" }}
        /> */}
        <Card>
          <Form
            form={form}
            name="create-post"
            onFinish={onFinish}
            autoComplete="off"
            labelAlign="left"
            labelWrap
            labelCol={{ flex: "80px" }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Body"
              name="body"
              rules={[{ required: true, message: "Body" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <List
          loading={isLoading}
          itemLayout="vertical"
          size="large"
          pagination={{
            current: pagination.page,
            pageSizeOptions: ["5", "10", "20"],
            pageSize: pagination.pageSize,
            total: data?.meta.pagination.total,
            onChange: onPaginationChange,
          }}
          dataSource={data?.data}
          renderItem={(item) => (
            <PostCard
              body={item.body}
              title={item.title}
              id={item.id}
              refetchPosts={refetchPosts}
            />
          )}
        />
      </div>
    </>
  );
};

export default PostsPage;
