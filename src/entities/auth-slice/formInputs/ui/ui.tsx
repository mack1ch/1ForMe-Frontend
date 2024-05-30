"use client";

import { ConfigProvider, Form, Input } from "antd";
import styles from "./ui.module.scss";
import { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { isNonEmptyArray } from "@/shared/lib/check/emptyArray";
import { IAuth } from "@/shared/interface/auth";
import { DRequestFields } from "../data";
import { inputTheme } from "../theme";
import InputMask from "react-input-mask";
import { formatTelNumber } from "@/shared/lib/parse/phone";

export const FormInputs = ({
  placeholder,
  setSubmitted,
  formData,
  setFormData,
}: {
  placeholder: string;
  setSubmitted: (arg: boolean) => void;
  formData: IAuth;
  setFormData: React.Dispatch<React.SetStateAction<IAuth>>;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: formatTelNumber(value),
    }));
  };

  useEffect(() => {
    // Проверяем готовность формы при изменении данных
    if (!isFormValid(formData)) {
      setSubmitted(true);
    } else setSubmitted(false);
  }, [formData, setSubmitted]);

  const isFormValid = (values: Partial<IAuth>): boolean => {
    return DRequestFields.every((fieldName) => {
      const fieldValue = values[fieldName];
      return (
        fieldValue !== undefined &&
        fieldValue !== null &&
        fieldValue !== "" &&
        (Array.isArray(fieldValue) ? isNonEmptyArray(fieldValue) : true)
      );
    });
  };

  return (
    <>
      <ConfigProvider theme={inputTheme}>
        <div className={styles.layout}>
          <Form.Item
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <InputMask
              mask="+79999999999"
              onChange={handleInputChange}
              value={formData.phone}
              maskChar={null}
              type="tel"
            >
              {
                //@ts-ignore
                (inputProps) => (
                  <Input
                    autoFocus
                    maxLength={13}
                    name="phone"
                    size="large"
                    autoComplete="tel"
                    placeholder={placeholder}
                    type="number"
                    prefix={
                      <UserOutlined
                        style={{ color: "#cfcfcf" }}
                        className="site-form-item-icon"
                      />
                    }
                    {...inputProps}
                  />
                )
              }
            </InputMask>
          </Form.Item>
          <Form.Item
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: "#cfcfcf" }}
                  className="site-form-item-icon"
                />
              }
              autoComplete="current-password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              size="large"
              placeholder="Введите пароль"
            />
          </Form.Item>
        </div>
      </ConfigProvider>
    </>
  );
};
