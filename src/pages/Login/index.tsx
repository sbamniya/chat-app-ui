import { useLoginMutation } from "@/hooks/auth";
import { getErrorMessage } from "@/utils/graphql";
import Notification from "@/utils/notification";
import { Button, Col, Form, Input, Row, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Login: React.FC = () => {
  const { mutateAsync: loginMutation, isLoading } = useLoginMutation();

  const navigate = useNavigate();

  const onLogin = async (values: { username: string; password: string }) => {
    try {
      const {
        login: { token, user },
      } = await loginMutation(values);

      localStorage.setItem("loggedInUserId", user.id);
      localStorage.setItem("loginToken", token);
      navigate("/");
    } catch (error) {
      Notification.error(getErrorMessage(error));
    }
  };

  return (
    <Row>
      <Col sm={{ span: 8, offset: 8 }} xs={12}>
        <Form layout="vertical" onFinish={onLogin}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter username",
              },
            ]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Space className={styles.buttons}>
            <Link to="/signup">
              <Button type="link">Create new account</Button>
            </Link>
            <Button loading={isLoading} htmlType="submit" type="primary">
              Login
            </Button>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
