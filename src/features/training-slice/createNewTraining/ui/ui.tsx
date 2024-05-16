import { Button, Form, message, Select, TimePickerProps } from "antd";
import styles from "./ui.module.scss";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import Timer from "../../../../../public/icons/trainings/timer.svg";
import { IUser } from "@/shared/interface/user";
import {
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
import Image from "next/image";

export const CreateNewTraining = ({
  clientID,
  editTrainingData,
  date,
}: {
  clientID?: number;
  editTrainingData?: ITraining;
  date?: string;
}) => {
  const [formData, setFormData] = useState<IFormData>({
    date: "",
    slotID: null,
    dateInput: null,
    clientID: clientID || null,
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
  const currentClient = selectClientsOptions?.find(
    (option) => option.value === formData.clientID?.toString()
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

        // setTimeUntilTraining(
        //   `${days !== 0 ? formatDayCount(days) + "," : ""} ${
        //     hours !== 0 ? formatHoursCount(hours) + "," : ""
        //   } ${formatMinutesCount(minutes)} до начала тренировки`)
        setTimeUntilTraining(
          `${days !== 0 && formatDayCount(days) + ","} ${
            minutes !== 0 && formatHoursCount(minutes)
          } ${days == 0 && minutes == 0 ? formatMinutesCount(minutes) : ""}`
        );
      } else {
        setTimeUntilTraining("Тренировка уже началась или прошла");
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
        slotID: editTrainingData?.slot.id || null,
        clientID: editTrainingData.client.id || null,
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
  };

  const onHandleClientChange = (value: string) => {
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
      const response = editTrainingData
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
      message.open({
        type: "error",
        content: "Проблема на сервере, мы уже работаем над устранением",
      });
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    async function fetchSlots() {
      const slots = await getSlots(formData.date.toString(), formData?.clubID!);
      if (slots instanceof Error) return;
      setSlots(slots);
    }
    fetchSlots();
  }, [formData.clubID, formData.date]);
  useEffect(() => {
    if (date) {
      const parsedDate = parseDateTime(date);
      setFormData((prev) => ({
        ...prev,
        date: parsedDate[0].formatDate,
        dateInput: dayjs(parsedDate[0].formatDate, "DD.MM.YYYY"),
        clientID: parsedDate[0].formatClubID,
        slotID:
          slots?.find((slot) => slot.beginning === parsedDate[0].formatTime)
            ?.id || null,
      }));
    }
  }, [date, slots]);
  return (
    <>
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
              onChange={onHandleClientChange}
              style={{ width: "100%" }}
              showSearch
              filterOption={customFilterOption}
              filterSort={customFilterSort}
              options={selectClientsOptions}
              value={
                editTrainingData
                  ? findOptionById(
                      formData.clientID?.toString() || null,
                      selectClientsOptions
                    )?.label?.toString()
                  : formData.clientID
                  ? currentClient?.label?.toString()
                  : defaultClient?.label?.toLocaleString()
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
              onChange={handleDateChange}
              value={formData.dateInput}
              placeholder="Дата тренировки"
              style={{ width: "100%", fontSize: "16px" }}
            />
          </Form.Item>
          <Form.Item
            label="Время занятия:"
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "flex-start",
            }}
          >
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
          </Form.Item>
          <Form.Item
            style={{
              width: "100%",
              textAlign: "start",
              alignItems: "center",
            }}
          >
            {editTrainingData && (
              <span className={styles.time}>
                {/* <Image src={Timer} width={22} height={22} alt="Timer" /> */}
                <p className={styles.p}>
                  До начала тренировки{" "}
                  <strong className={styles.strong}>{timeUntilTraining}</strong>
                </p>
              </span>
            )}
          </Form.Item>
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
                timeUntilTraining === "Тренировка уже началась или прошла"
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
        </div>
      </Form>
    </>
  );
};
