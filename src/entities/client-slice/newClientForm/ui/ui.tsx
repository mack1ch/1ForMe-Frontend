"use client";

import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import styles from "./ui.module.scss";
import { IClient, ISelectOptions } from "../interface";
import { createClient, getChatTypes } from "../api";
import { useRouter } from "next/navigation";
import { RequestFields } from "../data";
import { isNonEmptyArray } from "@/shared/lib/check/emptyArray";
import InputMask from "react-input-mask";
import { formatTelNumber } from "@/shared/lib/parse/phone";
export const NewClientForm = () => {
  const [form] = Form.useForm();
  const [chatSelectOptions, setChatSelectOptions] =
    useState<ISelectOptions[]>();
  const [inputValues, setInputValues] = useState<IClient>({
    name: "",
    phone: "",
    messenger: "",
    userNameInMessenger: undefined,
  });
  const router = useRouter();
  const currentMessengerLabel = chatSelectOptions?.find(
    (option) => option.value === inputValues.messenger
  );

  const isFormValid = (values: Partial<IClient>): boolean => {
    const basicFieldsValid = RequestFields.every((fieldName) => {
      const fieldValue = values[fieldName];
      return (
        fieldValue !== undefined &&
        fieldValue !== null &&
        fieldValue !== "" &&
        (Array.isArray(fieldValue) ? isNonEmptyArray(fieldValue) : true)
      );
    });

    const messengerFieldsValid = !(
      (currentMessengerLabel?.label === "Telegram" ||
        currentMessengerLabel?.label === "Instagram") &&
      (!values.userNameInMessenger || values.userNameInMessenger.trim() === "")
    );

    return basicFieldsValid && messengerFieldsValid;
  };

  useEffect(() => {
    async function getChats() {
      const chats = await getChatTypes();
      if (chats instanceof Error) return;
      setChatSelectOptions((prev) =>
        chats.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }))
      );
    }
    getChats();
  }, []);
  const successMassage = () => {
    message.open({
      type: "success",
      content: "Клиент добавлен",
    });
  };
  const handleInputChange = (name: string, value: string | number | null) => {
    if (name === "phone") {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: formatTelNumber(value?.toString()),
      }));
    } else {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async () => {
    try {
      const res: any = await createClient(inputValues);

      if (res instanceof Error) {
        // @ts-ignore
        message.error(res.response.data.message);
      }
      if (!(res instanceof Error)) {
        successMassage();
        router.push("/app/clients");
      }
    } catch (error) {
      message.error("Ошибка на сервере, мы уже работаем над устранением");
    }
  };

  return (
    <>
      <Form
        form={form}
        name="createClient"
        style={{ width: "100%" }}
        layout="vertical"
        className={styles.form}
      >
        <Form.Item style={{ marginBottom: "8px" }} name="name">
          <Input
            value={inputValues.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Имя и фамилия"
            size="large"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "8px" }} name="phone">
          <InputMask
            mask="+79999999999"
            maskChar={null}
            type="tel"
            value={inputValues.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          >
            {
              //@ts-ignore
              (inputProps) => (
                <Input
                  type="number"
                  placeholder="Номер телефона"
                  size="large"
                  prefix={<PhoneOutlined />}
                  {...inputProps}
                />
              )
            }
          </InputMask>
        </Form.Item>
        <Form.Item style={{ marginBottom: "8px" }} name="messanger">
          <Select
            options={chatSelectOptions}
            value={inputValues.messenger}
            onChange={(e) => handleInputChange("messenger", e)}
            placeholder="Мессенджер"
            size="large"
          />
        </Form.Item>
        {(currentMessengerLabel?.label === "Telegram" ||
          currentMessengerLabel?.label === "Instagram") && (
          <Form.Item name="userNameInMessenger">
            <Input
              value={inputValues.userNameInMessenger}
              onChange={(e) =>
                handleInputChange("userNameInMessenger", e.target.value)
              }
              placeholder={`Имя пользователя в формате @username`}
              size="large"
            />
          </Form.Item>
        )}
        <Form.Item shouldUpdate noStyle>
          {() => (
            <Button
              type="primary"
              style={{ width: "100%" }}
              size="large"
              htmlType="submit"
              disabled={!isFormValid(inputValues)}
              onClick={handleSubmit}
            >
              Добавить
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
