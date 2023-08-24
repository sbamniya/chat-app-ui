import { useSignupMutation } from "@/hooks/auth";
import { getErrorMessage } from "@/utils/graphql";
import Notification from "@/utils/notification";
import { Button, Col, Form, Input, Row, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Signup: React.FC = () => {
  const { mutateAsync: signupMutation, isLoading } = useSignupMutation();

  const navigate = useNavigate();

  const onSignup = async (values: { username: string; password: string }) => {
    try {
      const {
        signup: { token, user },
      } = await signupMutation(values);
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
        <Form layout="vertical" onFinish={onSignup}>
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
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter password" />
          </Form.Item>
          <Space className={styles.buttons}>
            <Link to="/login">
              <Button type="link">Already a member</Button>
            </Link>
            <Button loading={isLoading} htmlType="submit" type="primary">
              Signup
            </Button>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;
