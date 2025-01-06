import { useState, type MouseEvent } from "react";

import { Card, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

import { useDeletePost } from "@/repositories/delete-post/use-delete-post";

import UpdatePostModal from "./UpdatePostModal";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  loading?: boolean;
  avatar?: string;
  refetchPosts?: () => void;
}

const PostCard = (props: PostCardProps) => {
  const { body, id, title, loading = false, refetchPosts = () => null } = props;
  const [showUpdatePost, setShowUpdatePost] = useState(false);
  const deletePostMutation = useDeletePost();

  const [notif, notifHolder] = notification.useNotification();

  const onDelete = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();

    deletePostMutation.mutate(
      {
        postID: id,
      },
      {
        onSuccess: () => {
          refetchPosts();
          notif.success({
            message: "Post deleted successfully",
          });
        },
        onError: (error) => {
          notif.error({
            message: "Error deleting post",
            description: `Error: ${error}`,
          });
        },
      }
    );
  };

  const onUpdate = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setShowUpdatePost(true);
  };

  const onCancel = () => {
    setShowUpdatePost(false);
  };
  const onSuccess = () => {
    setShowUpdatePost(false);

    notif.success({
      message: "Post updated successfully",
    });

    refetchPosts();
  };

  return (
    <>
      {notifHolder}
      <Link href={`/post/${id}`} className="my-4">
        <Card
          loading={loading}
          actions={[
            <EditOutlined key="edit" onClick={onUpdate} />,
            <DeleteOutlined key="delete" onClick={onDelete} />,
          ]}
        >
          <Card.Meta
            description={
              <>
                <p className="font-bold">{title}</p>
                <p>{body}</p>
              </>
            }
          />
        </Card>
      </Link>
      {showUpdatePost && (
        <UpdatePostModal
          show={showUpdatePost}
          body={body}
          title={title}
          id={id}
          onCancel={onCancel}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default PostCard;
