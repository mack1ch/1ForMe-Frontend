"use client";

import { Button, ConfigProvider, Form, message } from "antd";
import styles from "./ui.module.scss";
import { useState } from "react";
import { FormInputs } from "@/entities/auth-slice/formInputs/ui/ui";
import { useRouter } from "next/navigation";
import { IAuth } from "@/shared/interface/auth";
import { postUser, registerUser } from "../api";
import { getAccessToken } from "@/shared/lib/auth/auth-token";
import { TAuth } from "../theme";

export const Auth = () => {
  const [activeButton, setActiveButton] = useState<"login" | "register">(
    "login"
  );
  const [form] = Form.useForm();
  const router = useRouter();
  const [formData, setFormData] = useState<IAuth>({
    phone: "",
    password: "",
    name: "",
  });
  const [isButtonDisable, setButtonDisable] = useState(true);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const handleButtonClick = (buttonId: "login" | "register") => {
    setActiveButton(buttonId);
  };
  const onButtonSubmit = async () => {
    if (activeButton === "login") {
      try {
        setButtonLoading(true);
        const response = await postUser(formData);
        if (!!getAccessToken() && response instanceof Error) {
          router.push("/");
        }
        if (response instanceof Error) {
          message.open({
            type: "error",
            content: "Неверный логин или пароль",
          });
          setButtonLoading(false);
          return;
        } else if (!!getAccessToken()) {
          router.push("/app/dashboard/");
        }
        return;
      } catch (error) {
        message.open({
          type: "error",
          content: "Неверный логин или пароль",
        });
        setButtonLoading(false);
      }
    } else {
      try {
        setButtonLoading(true);
        const response = await registerUser(formData);
        if (!!getAccessToken() && response instanceof Error) {
          router.push("/app/dashboard/");
        }
        if (response instanceof Error) {
          message.open({
            type: "error",
            content: "Пользователь уже существует",
          });
          setButtonLoading(false);
          return;
        } else if (!!getAccessToken()) {
          router.push("/app/dashboard/");
        }
        return;
      } catch (error) {
        message.open({
          type: "error",
          content: "Пользователь уже существует",
        });
        setButtonLoading(false);
      }
    }
  };
  return (
    <>
      <ConfigProvider theme={TAuth}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <button
              className={`${styles.header_button} ${
                activeButton === "login" ? styles.header_button_active : ""
              }`}
              onClick={() => handleButtonClick("login")}
            >
              {activeButton !== "login"
                ? "/Войти".toLocaleUpperCase()
                : "Войти".toLocaleUpperCase()}
            </button>
            <button
              className={`${styles.header_button} ${
                activeButton === "register" ? styles.header_button_active : ""
              }`}
              onClick={() => handleButtonClick("register")}
            >
              {activeButton !== "register"
                ? "/Регистрация".toLocaleUpperCase()
                : "Регистрация".toLocaleUpperCase()}
            </button>
          </header>
          <main style={{ width: "100%" }}>
            <Form
              style={{ width: "100%" }}
              name="validateOnly"
              layout="vertical"
            >
              <FormInputs
                type={activeButton}
                formData={formData}
                setFormData={setFormData}
                setSubmitted={setButtonDisable}
                placeholder="Номер телефона"
              />
            </Form>
            <Form.Item style={{ width: "100%" }}>
              <Button
                onClick={onButtonSubmit}
                loading={isButtonLoading}
                disabled={isButtonDisable}
                style={{ width: "100%" }}
                htmlType="submit"
                type="primary"
                size="large"
              >
                {activeButton === "login"
                  ? "Войти".toUpperCase()
                  : "Регистрация".toUpperCase()}
              </Button>
            </Form.Item>
          </main>
        </div>
      </ConfigProvider>
    </>
  );
};
