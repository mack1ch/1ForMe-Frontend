import { Button, Form, Input, message } from "antd";
import styles from "./ui.module.scss";
import { useEffect, useState } from "react";
import { IClientEditForm } from "../inteface";
import { IUser } from "@/shared/interface/user";
import {
  changeClientCommentByID,
  changedClientData,
  getClientByID,
  getClientCommentByID,
} from "../api";
import { IComment } from "@/shared/interface/comment";
import { DRequestFields } from "../data";
import { isNonEmptyArray } from "@/shared/lib/check/emptyArray";
export const ClientEditForm = ({ clientID }: { clientID: number }) => {
  const [formData, setFormData] = useState<IClientEditForm>({
    name: "",
    phone: "",
    comment: "",
  });
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [user, setUser] = useState<IUser>();
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      const client: IUser | Error = await getClientByID(clientID);
      if (client instanceof Error) return;
      setUser(client);
      setFormData((prev) => ({
        ...prev,
        name: client.name + " " + client.surname,
        phone: client.phone,
      }));

      const clientComment: IComment | Error = await getClientCommentByID(
        clientID
      );
      if (clientComment instanceof Error) return;
      setFormData((prev) => ({
        ...prev,
        comment: clientComment.text,
      }));
    }
    fetchData();
  }, [clientID, user?.id]);
  useEffect(() => {
    // Проверяем готовность формы при изменении данных
    if (!isFormValid(formData)) {
      setButtonDisabled(true);
    } else setButtonDisabled(false);
  }, [formData, setButtonDisabled]);

  const isFormValid = (values: Partial<IClientEditForm>): boolean => {
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
  const onButtonSubmit = async () => {
    try {
      setButtonLoading(true);
      const response = await changedClientData(formData, clientID);
      const comment =
        formData.comment &&
        formData.comment?.length > 0 &&
        (await changeClientCommentByID(clientID, formData.comment));
      if (response instanceof Error && comment instanceof Error) {
        message.open({
          type: "error",
          content:
            "Неудалось выполнить запрос, проверьте правильность введенных данных",
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
        <div className={styles.layout}>
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
              autoFocus
              onChange={handleInputChange}
              value={formData.name}
              defaultValue={user?.name + " " + user?.surname}
              name={"name"}
              size="large"
              placeholder="Имя и фамилия"
            />
          </Form.Item>
          <Form.Item
            required
            label="Номер телефона"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Input
              autoFocus
              onChange={handleInputChange}
              value={formData.phone}
              name={"phone"}
              type="number"
              maxLength={11}
              size="large"
              placeholder="Номер телефона"
            />
          </Form.Item>
          <Form.Item
            label="Комментарий"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Input
              autoFocus
              onChange={handleInputChange}
              value={formData.comment}
              name={"comment"}
              size="large"
              placeholder="Комментарий к клиенту"
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button
              loading={isButtonLoading}
              disabled={isButtonDisabled}
              style={{ width: "100%" }}
              htmlType="submit"
              type="primary"
              size="large"
              onClick={onButtonSubmit}
            >
              Сохранить
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
