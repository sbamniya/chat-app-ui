import SelectUsers from "@/components/SelectUsers";
import { useStartConversationMutation } from "@/hooks/conversations";
import { getErrorMessage } from "@/utils/graphql";
import Notification from "@/utils/notification";
import { Button, Form, Input, Modal, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

const StartChat: React.FC = () => {
  const { mutateAsync: startConversationMutation, isLoading: isCreating } =
    useStartConversationMutation();

  const [messageForm] = useForm();

  const startConversation = (value: { receiverIds: string[] }) => {
    const onSubmit = async ({ message }: { message: string }) => {
      try {
        const data = await startConversationMutation({ ...value, message });
        messageForm.resetFields();
        console.log(data);
      } catch (error) {
        Notification.error(getErrorMessage(error));
      }
    };

    Modal.confirm({
      title: "Start a new chat",
      content: (
        <Form layout="vertical" form={messageForm} onFinish={onSubmit}>
          <Form.Item
            name="message"
            label="Message"
            rules={[
              {
                required: true,
                message: "Please enter message to start chat.",
              },
            ]}
          >
            <Input placeholder="Enter a message to start chat" />
          </Form.Item>
        </Form>
      ),
      onOk: messageForm.submit,
    });
  };

  return (
    <Form onFinish={startConversation}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form.Item
          name="receiverIds"
          rules={[
            {
              required: true,
              message: "Please select user to start chat with",
            },
          ]}
          wrapperCol={{
            span: 24,
          }}
        >
          <SelectUsers allowClear mode="multiple" />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isCreating}>
          Start Chat
        </Button>
      </Space>
    </Form>
  );
};

export default StartChat;
