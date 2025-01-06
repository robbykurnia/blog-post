import { Modal, Input, Form, Button, message, notification } from "antd";
import { useEffect, useState } from "react";

import type { FormProps } from "antd";
import { setLocalStorage } from "@/utils/localStorage";
import { createUser } from "@/repositories/create-user";
import { useCreateUser } from "@/repositories/create-user/use-create-user";
import { useRouter } from "next/router";

type FieldType = {
  name?: string;
  token?: string;
};

const CredentialModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const createUserMutation = useCreateUser();
  const router = useRouter();

  const [notif, notifHolder] = notification.useNotification();

  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { name, token } = values;

    if (!name || !token) return;

    setLocalStorage("name", name);
    setLocalStorage("token", token);
    setLoading(true);

    createUserMutation.mutate(
      {
        email: `${name.toLowerCase().trim()}@gmail.com`,
        gender: "female",
        name: name,
        status: "active",
      },
      {
        onSuccess: (data) => {
          setLocalStorage("user", data);
          setLoading(false);

          notif.success({
            message: "User created successfully",
          });

          router.push("/post");
        },
        onError: (error) => {
          setLoading(false);

          notif.error({
            message: "Error creating user",
            description: `Error: ${error}`,
          });
        },
      }
    );
  };

  return (
    <>
      {notifHolder}
      <Modal footer={<></>} title="Welcome" open={isModalVisible}>
        <Form
          name="credential"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Go Rest Token"
            name="token"
            rules={[{ required: true, message: "Please input your token!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CredentialModal;
