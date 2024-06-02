import { Button, Form, message, Modal, Select, TimePickerProps } from "antd";
import styles from "./ui.module.scss";
import { DatePicker } from "antd";
import { Children, useEffect, useState } from "react";

import { IUser } from "@/shared/interface/user";
import {
  cancelTrainerByID,
  changeTraining,
  createTraining,
  getClubs,
  getSlots,
  getTariffs,
  getTrainerClients,
} from "../api";
import { IFormData, ISelectOptions } from "../interface";
import {
  customFilterOption,
  customFilterSort,
  findOptionById,
  formatDayCount,
  formatHoursCount,
  formatMinutesCount,
  parseDateTime,
} from "../model";
import { useRouter } from "next/navigation";
import { IClubSlot } from "@/shared/interface/slots";
import dayjs from "dayjs";
import { ITraining } from "@/shared/interface/training";
import { formatDateToDayAndDateFormat } from "@/shared/lib/parse/date";
import { ITariff } from "@/shared/interface/tariff";
import { convertToCurrencyFormat } from "@/shared/lib/parse/money";
import { RangePickerProps } from "antd/es/date-picker";

export const CreateNewTraining = ({
  clientID,
  editTrainingData,
  date,
}: {
  clientID?: number;
  editTrainingData?: ITraining;
  date?: string;
}) => {
  const [isTrainingEnd, setIsTrainingEnd] = useState<boolean>(true);
  const [tariffArray, setTariffArray] = useState<ITariff[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsModalConfirmLoading, setIsModalConfirmLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    date: "",
    slotID: null,
    dateInput: null,
    clientID: clientID ? [clientID] : null,
    tariffID: null,
    clubID: null,
  });

  const [selectClientsOptions, setSelectClientsOptions] =
    useState<ISelectOptions[]>();
  const dateFormat = "DD.MM.YYYY";
  const [slots, setSlots] = useState<IClubSlot[]>();
  const [selectTariffsOptions, setSelectTariffsOptions] =
    useState<ISelectOptions[]>();
  const [selectClubsOptions, setSelectClubsOptions] =
    useState<ISelectOptions[]>();
  const defaultClient = selectClientsOptions?.find(
    (option) => option.value === clientID?.toString()
  );
  const router = useRouter();
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [timeUntilTraining, setTimeUntilTraining] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const currentDate = new Date();
      const trainingDate = new Date(
        `${editTrainingData?.date}T${editTrainingData?.slot.beginning}`
      );
      if (trainingDate > currentDate) {
        const diff = trainingDate.getTime() - currentDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setIsTrainingEnd(false);
        setTimeUntilTraining(
          `${days !== 0 ? formatDayCount(days) + "," : ""}
          ${hours !== 0 ? formatHoursCount(hours) + "," : ""}
          ${minutes !== 0 ? formatMinutesCount(minutes) : ""} ${
            days == 0 && minutes == 0 ? formatMinutesCount(minutes) : ""
          }`
        );
      } else {
        setIsTrainingEnd(true);
        setTimeUntilTraining("Тренировка уже началась или завершена");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [editTrainingData]);

  useEffect(() => {
    setButtonDisabled(!isFormValid(formData));
  }, [formData]);
  useEffect(() => {
    if (editTrainingData) {
      setFormData((prev) => ({
        ...prev,
        clientID: [editTrainingData.client.id] || null,
        slotID: editTrainingData?.slot.id || null,
        tariffID:
          editTrainingData?.subscription?.transaction?.tariff?.id ||
          editTrainingData.transaction.tariff.id ||
          null,
        clubID: editTrainingData.club.id,
        date: editTrainingData.date,
        dateInput: editTrainingData?.date
          ? dayjs(editTrainingData?.date, "YYYY-MM-DD")
          : null,
      }));
    }
  }, [editTrainingData]);
  const currentClient = selectClientsOptions?.find(
    (option) => option.value === formData.clientID?.toString()
  );
  const currentTariff = selectTariffsOptions?.find(
    (option) => option.value === formData.tariffID?.toString()
  );

  const selectTariffInArray = tariffArray?.find(
    (option) => option.id.toString() === formData.tariffID
  );

  const isFormValid = (formData: IFormData): boolean => {
    return (
      formData.date !== "" &&
      !!formData.slotID &&
      formData.tariffID !== null &&
      formData.clubID !== null
    );
  };
  const handleSlotSelection = (slotID: number) => {
    setFormData((prev) => ({
      ...prev,
      slotID: slotID,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      const clients: IUser[] | Error = await getTrainerClients();
      const tariffs = await getTariffs();
      const clubs = await getClubs();

      if (
        clients instanceof Error ||
        tariffs instanceof Error ||
        clubs instanceof Error
      )
        return;

      setTariffArray(tariffs);
      setSelectTariffsOptions((prev) =>
        tariffs.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }))
      );
      setSelectClubsOptions((prev) =>
        clubs.map((club) => ({
          label: club.address + " / " + club.name,
          value: club.id.toString(),
        }))
      );
      setSelectClientsOptions((prev) =>
        clients.map((item) => ({
          label: item.name + " " + item.surname,
          value: item.id.toString(),
        }))
      );
    }
    fetchData();
  }, []);

  const handleDateChange: TimePickerProps["onChange"] = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      date: dateString,
      dateInput: date,
    }));
    async function fetchSlots() {
      const slots = await getSlots(formData.date.toString(), formData?.clubID!);
      if (slots instanceof Error) return;
      setSlots(slots);
    }
    fetchSlots();
  };
  useEffect(() => {
    async function fetchSlots() {
      const slots =
        formData.date &&
        (await getSlots(formData.date.toString(), formData?.clubID!));
      if (slots instanceof Error || !slots) return;
      setSlots(slots);
    }

    fetchSlots();
  }, [formData?.clubID, formData.date]);

  const onHandleClientChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      clientID: [value],
    }));
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };

  const onHandleClientMultiplyChange = (value: string) => {
    // @ts-ignore
    setFormData((prev) => ({
      ...prev,
      clientID: value,
    }));
  };

  const onHandleTariffChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tariffID: value,
    }));
  };
  const onHandleClubChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      clubID: value,
    }));
  };
  const handleCreateTraining = async () => {
    try {
      setButtonLoading(true);
      const response: any = editTrainingData
        ? await changeTraining(formData, editTrainingData.id)
        : await createTraining(formData);

      if (response instanceof Error) {
        message.open({
          type: "error",
          content: "Неудалось выполнить запрос",
        });
        setButtonLoading(false);
        return;
      } else {
        router.push(`/app/dashboard`);

        message.open({
          type: "success",
          content: `Тренировка успешно ${
            editTrainingData ? "изменена" : "создана"
          } на ${formatDateToDayAndDateFormat(
            response.date.toString().toLowerCase()
          )}`,

          duration: 4,
        });
        setButtonLoading(false);
      }
    } catch {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (date) {
      const parsedDate = parseDateTime(date);
      setFormData((prev) => ({
        ...prev,
        date: parsedDate[0].formatDate,
        dateInput: dayjs(parsedDate[0].formatDate, "DD.MM.YYYY"),
        clubID: parsedDate[0].formatClubID,
        slotID:
          slots?.find((slot) => slot.beginning === parsedDate[0].formatTime)
            ?.id || null,
      }));
    }
  }, [date, slots]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalConfirmLoading(true);
    const trainingCancel = await cancelTrainerByID(editTrainingData?.id || "");

    if (trainingCancel instanceof Error) {
      message.open({
        type: "error",
        content: "Неудалось выполнить запрос",
      });
      setIsModalOpen(false);
      setIsModalConfirmLoading(false);
    } else {
      message.open({
        type: "success",
        content: "Тренировка отменена",
      });
      setIsModalOpen(false);
      setIsModalConfirmLoading(false);
      router.push("/app/dashboard");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Вы действительно хотите отменить тренировку?"
        open={isModalOpen}
        onOk={handleOk}
        okType="danger"
        confirmLoading={IsModalConfirmLoading}
        okText="Удалить"
        cancelText="Отмена"
        onCancel={handleCancel}
      >
        <p>
          Если вы отмените тренировку, то деньги будут возвращены клиенту, а
          слот станет свободным
        </p>
      </Modal>

      <Form style={{ width: "100%" }} name="validateOnly" layout="vertical">
        <div className={styles.formLayout}>
          {!editTrainingData && (
            <Form.Item
              label="Тариф:"
              style={{
                width: "100%",
                textAlign: "start",
                alignItems: "flex-start",
              }}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                filterOption={customFilterOption}
                filterSort={customFilterSort}
                options={selectTariffsOptions}
                size="middle"
                onChange={onHandleTariffChange}
                placeholder="Выберите тариф"
              />
            </Form.Item>
          )}
          <Form.Item
            label="Клиент:"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Select
              mode={
                editTrainingData
                  ? undefined
                  : currentTariff?.label === "Сплит"
                  ? "multiple"
                  : undefined
              }
              onChange={
                editTrainingData
                  ? onHandleClientChange
                  : currentTariff?.label === "Сплит"
                  ? onHandleClientMultiplyChange
                  : onHandleClientChange
              }
              style={{ width: "100%" }}
              showSearch
              filterOption={customFilterOption}
              filterSort={customFilterSort}
              options={selectClientsOptions}
              maxCount={
                currentTariff?.label === "Сплит" &&
                selectTariffInArray?.clientsAmount
                  ? selectTariffInArray.clientsAmount
                  : undefined
              }
              value={
                editTrainingData
                  ? findOptionById(
                      formData.clientID
                        ? formData.clientID[0].toString()
                        : null,
                      selectClientsOptions
                    )?.label?.toString()
                  : formData.clientID
                  ? currentClient?.label?.toString()
                  : defaultClient?.label?.toString()
              }
              defaultValue={defaultClient?.label?.toString()}
              size="middle"
              placeholder="Выберите клиента"
            />
          </Form.Item>

          <Form.Item
            label="Зал:"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Select
              style={{ width: "100%" }}
              showSearch
              value={findOptionById(
                formData.clubID?.toString() || null,
                selectClubsOptions
              )?.label?.toString()}
              onChange={onHandleClubChange}
              filterOption={customFilterOption}
              filterSort={customFilterSort}
              options={selectClubsOptions}
              size="middle"
              placeholder="Выберите зал"
            />
          </Form.Item>
          <Form.Item
            label="Дата:"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <DatePicker
              format={dateFormat}
              inputReadOnly
              disabledDate={disabledDate}
              onChange={handleDateChange}
              value={formData.dateInput}
              placeholder="Дата тренировки"
              style={{ width: "100%", fontSize: "16px" }}
            />
          </Form.Item>
          {slots && (
            <div className={styles.slotWrap}>
              {slots?.map((slot) => {
                if (slot.isAvailable) {
                  return (
                    <button
                      onClick={() => handleSlotSelection(slot.id)}
                      key={slot.id}
                      style={{
                        background: formData.slotID === slot.id ? "#000" : "",
                        color: formData.slotID === slot.id ? "#fff" : "",
                      }}
                      className={styles.slot}
                    >
                      {slot.beginning}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          )}
          {editTrainingData && (
            <>
              <Form.Item
                style={{
                  width: "100%",
                  textAlign: "start",
                  alignItems: "center",
                }}
              >
                <span className={styles.time}>
                  <p className={styles.p}>
                    {!isTrainingEnd && `Тренировка через${" "}`}
                    <strong className={styles.strong}>
                      {timeUntilTraining}
                    </strong>
                  </p>
                </span>
              </Form.Item>
            </>
          )}
          <div className={styles.trainingCostLayout}>
            <label className={styles.label}>Стоимость тренировки:</label>
            <p className={styles.cost}>
              {selectTariffInArray?.cost &&
                convertToCurrencyFormat(
                  selectTariffInArray?.cost.toString() || ""
                )}
              {selectTariffInArray?.cost && " ₽"}
            </p>
          </div>

          <Form.Item
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
            <Button
              htmlType="submit"
              onClick={handleCreateTraining}
              loading={isButtonLoading}
              disabled={
                editTrainingData &&
                timeUntilTraining === "Тренировка уже началась или завершена"
                  ? true
                  : !editTrainingData && isButtonDisabled
              }
              style={{ width: "100%" }}
              type="primary"
              size="large"
            >
              Сохранить
            </Button>
          </Form.Item>
          {editTrainingData && !isTrainingEnd && (
            <Form.Item
              style={{
                marginTop: "-12px",
                width: "100%",
                textAlign: "start",
                alignItems: "center",
              }}
            >
              <Button
                onClick={showModal}
                style={{ width: "100%" }}
                size="large"
                danger
              >
                Отменить тренировку
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </>
  );
};
