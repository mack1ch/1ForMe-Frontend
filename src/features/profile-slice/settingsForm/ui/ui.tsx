"use client";

import styles from "./ui.module.scss";
import { IUser } from "@/shared/interface/user";
import { ChangeEvent, useEffect, useState } from "react";
import {
  changeAuthUserData,
  getAllSports,
  getAllStudios,
  getAuthUser,
} from "../api";
import { Button, Form, Input, message, Select, TimePickerProps } from "antd";
import { DRequestFields } from "../data";
import { ISelectOptions, ISettingsFormUser } from "../interface";
import { isNonEmptyArray } from "@/shared/lib/check/emptyArray";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import InputMask from "react-input-mask";
import { formatTelNumber } from "@/shared/lib/parse/phone";

const { TextArea } = Input;

export const SettingsForm = () => {
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [allStudios, setAllStudios] = useState<ISelectOptions[]>();
  const [allSports, setAllSports] = useState<ISelectOptions[]>();
  const dateFormat = "DD.MM.YYYY";
  const [formData, setFormData] = useState<ISettingsFormUser>({
    name: "",
    surname: "",
    birthday: "",
    experience: undefined,
    phone: "",
    description: "",
    birthDayInput: null,
    sports: undefined,
    studiosID: undefined,
  });
  useEffect(() => {
    async function getUser() {
      const authUser: IUser | Error = await getAuthUser();
      const allSports = await getAllSports();
      const allStudios = await getAllStudios();
      if (
        authUser instanceof Error ||
        allSports instanceof Error ||
        allStudios instanceof Error
      )
        return;
      setAllStudios((prev) =>
        allStudios.map((item) => ({
          value: item.id.toString(),
          label: item.name + " " + item.address,
        }))
      );
      setAllSports((prev) =>
        allSports.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }))
      );

      setFormData((prev) => ({
        ...prev,
        name: authUser.name,
        surname: authUser.surname,
        birthday: authUser.birthday?.toString(),
        birthDayInput: authUser.birthday ? dayjs(authUser.birthday) : null,
        phone: authUser.phone,
        studiosID:
          authUser.trainerProfile?.studios?.map((item) => item.id) || undefined,
        description: authUser.trainerProfile.description,
        experience: authUser.trainerProfile.experience,
        sports: authUser.trainerProfile.sports.map((item) =>
          item.id.toString()
        ),
      }));
    }
    getUser();
  }, []);
  useEffect(() => {
    // Проверяем готовность формы при изменении данных
    if (!isFormValid(formData)) {
      setButtonDisabled(true);
    } else setButtonDisabled(false);
  }, [formData, setButtonDisabled]);

  const isFormValid = (values: Partial<ISettingsFormUser>): boolean => {
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
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "phone") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: formatTelNumber(value.toString()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSportSelectChange = (sports: string[] | number[]) => {
    setFormData((prev) => ({
      ...prev,
      sports: sports,
    }));
  };
  const handleStudiosSelectChange = (studios: string[] | number[]) => {
    setFormData((prev) => ({
      ...prev,
      studiosID: studios,
    }));
  };
  const onChangeBirthday: TimePickerProps["onChange"] = (time, timeString) => {
    setFormData((prev) => ({
      ...prev,
      birthday: timeString.toString(),
      birthDayInput: time,
    }));
  };

  const onButtonSubmit = async () => {
    try {
      setButtonLoading(true);
      const response = await changeAuthUserData(formData);
      if (response instanceof Error) {
        message.open({
          type: "error",
          content: "Неудалось выполнить запрос",
        });
        setButtonLoading(false);
        return;
      } else {
        message.open({
          type: "success",
          content: "Данные успешно обновлены",
        });
        setButtonLoading(false);
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "Проблема на сервере, мы уже работаем над устранением",
      });
      setButtonLoading(false);
    }
  };

  return (
    <>
      <Form style={{ width: "100%" }} name="validateOnly" layout="vertical">
        <div className={styles.formLayout}>
          <Form.Item
            required
            label="Имя"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Input
              size="large"
              onChange={handleInputChange}
              name="name"
              value={formData.name}
            />
          </Form.Item>
          <Form.Item
            required
            label="Фамилия"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Input
              size="large"
              onChange={handleInputChange}
              name="surname"
              value={formData.surname}
            />
          </Form.Item>
          <Form.Item
            required
            label="Контактный номер"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <InputMask
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              mask="+79999999999"
              maskChar={null}
            >
              {
                //@ts-ignore
                (inputProps) => (
                  <Input size="large" {...inputProps} name="phone" />
                )
              }
            </InputMask>
          </Form.Item>

          <Form.Item
            required
            label="Ваши направления"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Select
              mode="multiple"
              placeholder="Выберите подходящий спорт"
              size="large"
              onChange={handleSportSelectChange}
              options={allSports}
              value={formData.sports}
              getPopupContainer={(trigger) => trigger.parentNode}
            />
          </Form.Item>
          <Form.Item
            required
            label="Ваши студии"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Select
              mode="multiple"
              placeholder="Выберите студии для работы"
              size="large"
              onChange={handleStudiosSelectChange}
              options={allStudios}
              value={formData.studiosID?.map((item) => item.toString())}
            />
          </Form.Item>
          <Form.Item
            label="Дата рождения"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <DatePicker
              format={dateFormat}
              inputReadOnly
              placeholder="Выберите день рождения"
              style={{ width: "100%" }}
              size="large"
              onChange={onChangeBirthday}
              name="birthday"
              value={formData.birthDayInput}
            />
          </Form.Item>
          <Form.Item
            label="Лет опыта"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Input
              type="number"
              size="large"
              onChange={handleInputChange}
              name="experience"
              value={formData.experience}
            />
          </Form.Item>

          <Form.Item
            label="О себе"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <TextArea
              autoSize
              size="large"
              onChange={(e) => handleInputChange(e)}
              name="description"
              value={formData.description}
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button
              onClick={onButtonSubmit}
              style={{ width: "100%" }}
              size="large"
              type="primary"
              loading={isButtonLoading}
              disabled={isButtonDisabled}
              htmlType="submit"
            >
              Сохранить
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
