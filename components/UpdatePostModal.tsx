import { Modal, Input, Form, Button, notification, Space } from "antd";

import type { FormProps } from "antd";

import { useUpdatePost } from "@/repositories/update-post/use-update-post";

type FieldType = {
  title?: string;
  body?: string;
};

interface UpdatePostModalProps {
  show: boolean;
  id: number;
  title: string;
  body: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const UpdatePostModal = (props: UpdatePostModalProps) => {
  const { show, body, id, title, onSuccess, onCancel } = props;
  const updatePostMutation = useUpdatePost();

  const [notif, notifHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { title, body } = values;

    if (!title || !body) return;

    updatePostMutation.mutate(
      {
        body,
        title,
        postID: id,
      },
      {
        onSuccess: (data) => {
          onSuccess();
        },
        onError: (error) => {
          notif.error({
            message: "Error updating post",
            description: `Error: ${error}`,
          });
        },
      }
    );
  };

  return (
    <>
      {notifHolder}
      <Modal footer={<></>} title="Update post" open={show} onCancel={onCancel}>
        <Form
          name="update-post"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ body, title }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input your post title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Body"
            name="body"
            rules={[
              { required: true, message: "Please input your post body!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label={null} labelAlign="right">
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePostModal;
