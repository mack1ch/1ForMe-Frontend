import {
  Button,
  DatePicker,
  Form,
  message,
  Select,
  Switch,
  TimePicker,
} from "antd";
import styles from "./ui.module.scss";
import { DashDivider } from "@/shared/ui/divider-slice/dashDivider/ui/ui";
import { customFilterOption, customFilterSort } from "../model";
import { use, useEffect, useState } from "react";
import { IFormData, ISelectOptions, ITrainings } from "../interface";
import {
  getClubs,
  getSlots,
  getTariffs,
  getTrainerClients,
  postSubscription,
} from "../api";
import { ITariff } from "@/shared/interface/tariff";
import { convertToCurrencyFormat } from "@/shared/lib/parse/money";
import { numberToOrdinal } from "@/shared/lib/parse/number";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { IClubSlot } from "@/shared/interface/slots";
import { formatDateToDayAndDateFormat } from "@/shared/lib/parse/date";
import { RangePickerProps } from "antd/es/date-picker";

export const CreateSubscription = ({ clientID }: { clientID?: number }) => {
  const dateFormat = "DD.MM.YYYY";
  const router = useRouter();
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isFirstWorkOut, setIsFirstWorkOut] = useState<boolean>(false);
  const [selectClientsOptions, setSelectClientsOptions] =
    useState<ISelectOptions[]>();
  const [tariffs, setTariffs] = useState<ITariff[]>();
  const [selectTariff, setSelectTariff] = useState<ITariff>();
  const [trainings, setTrainings] = useState<ITrainings[]>(
    Array.from({ length: selectTariff?.trainingAmount || 0 }, () => ({}))
  );
  const [selectedSlots, setSelectedSlots] = useState<{
    [key: string]: number | null;
  }>(
    Array.from({ length: selectTariff?.trainingAmount || 0 }, (_, i) => {
      const date = trainings[i]?.date || "";
      return { [date]: null };
    }).reduce((acc, obj) => ({ ...acc, ...obj }), {})
  );

  const [trainingSlots, setTrainingSlots] = useState<IClubSlot[][]>(
    Array.from({ length: selectTariff?.trainingAmount || 0 }, () => [])
  );
  const [formData, setFormData] = useState<IFormData>({
    tariffID: null,
    clubID: null,
    clientID: clientID || null,
  });
  const [selectTariffOptions, setSelectTariffsOptions] = useState<
    ISelectOptions[]
  >([]);
  const [selectClubsOptions, setSelectClubsOptions] = useState<
    ISelectOptions[]
  >([]);
  const currentClient = clientID
    ? selectClientsOptions?.find(
        (option) => option.value === formData.clientID?.toString()
      )
    : undefined;
  useEffect(() => {
    async function fetchData() {
      try {
        const [tariffs, clubs, clients] = await Promise.all([
          getTariffs(),
          getClubs(),
          getTrainerClients(),
        ]);
        if (
          !(
            tariffs instanceof Error ||
            clubs instanceof Error ||
            clients instanceof Error
          )
        ) {
          setTariffs(tariffs);
          setSelectClientsOptions((prev) =>
            clients.map((item) => ({
              label: item.name + " " + item.surname,
              value: item.id.toString(),
            }))
          );
          const filteredTariffs = tariffs.filter(
            (item) => item.trainingAmount !== 4 && item.trainingAmount !== 9
          );

          setSelectTariffsOptions(
            filteredTariffs.map((item) => {
              return {
                label: `${
                  item.name
                } / ${item.trainingAmount?.toString()} тренировок`,
                value: item.id.toString(),
              };
            })
          );

          // Initialize trainings, selectedSlots, and trainingSlots here
          setTrainings(
            Array.from({ length: tariffs[0]?.trainingAmount || 0 }, () => ({}))
          );
          setSelectedSlots(
            Array.from({ length: tariffs[0]?.trainingAmount || 0 }, (_, i) => {
              const date = trainings[i]?.date || "";
              return { [date]: null };
            }).reduce((acc, obj) => ({ ...acc, ...obj }), {})
          );
          setTrainingSlots(
            Array.from({ length: tariffs[0]?.trainingAmount || 0 }, () => [])
          );
        }
        if (!(clubs instanceof Error)) {
          setSelectClubsOptions(
            clubs.map((club) => ({
              label: `${club.address} / ${club.name}`,
              value: club.id.toString(),
            }))
          );
        }
      } catch (error) {}
    }
    fetchData();
  }, []);

  const handleSelectChange =
    (key: "clubID" | "tariffID" | "clientID") => (value: string) => {
      if (key === "tariffID") {
        const selectTariff = tariffs?.find(
          (item) => item.id.toString() === value
        );
        setSelectTariff(selectTariff);
      }
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  const handleSlotClick = (slotId: number, date: string) => {
    setSelectedSlots((prevSelectedSlots) => ({
      ...prevSelectedSlots,
      [date]: slotId,
    }));
  };
  useEffect(() => {
    setTrainings((prevTrainings) =>
      prevTrainings.slice(0, selectTariff?.trainingAmount || 0)
    );
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots };
      Object.keys(newSelectedSlots).forEach((date) => {
        if (!trainings.find((training) => training.date === date)) {
          delete newSelectedSlots[date];
        }
      });
      return newSelectedSlots;
    });
  }, [isFirstWorkOut, selectedSlots]);

  const handleTrainingChange = async (
    index: number,
    value: dayjs.Dayjs | null,
    valueString: string,
    type: "date" | "time"
  ) => {
    setTrainings((prevTrainings) => {
      const newTrainings = [...prevTrainings];
      newTrainings[index] = {
        ...newTrainings[index],
        [type]: valueString,
        [`${type}Input`]: value,
      };
      return newTrainings;
    });

    if (type === "date" && valueString) {
      const clubID = formData.clubID;
      const date = valueString;
      const slots = await getSlots(date, clubID!);
      if (!(slots instanceof Error)) {
        setTrainingSlots((prevSlots) => {
          const newSlots = [...prevSlots];
          newSlots[index] = slots;
          return newSlots;
        });
      } else {
      }
    }

    // Добавляем этот блок кода для предотвращения автоматического выбора слота для других тренировок
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots };
      if (!newSelectedSlots[trainings[index]?.date || ""]) {
        newSelectedSlots[trainings[index]?.date || ""] = null;
      }
      return newSelectedSlots;
    });
  };

  const handleCreateSubscription = async () => {
    try {
      setButtonLoading(true);
      const response = await postSubscription(
        formData,
        trainings,
        selectedSlots
      );
      if (response instanceof Error) {
        message.open({
          type: "error",
          content:
            "Неудалось выполнить запрос. Проверьте правильность введенных данных",
        });
        setButtonLoading(false);
        return;
      } else {
        router.push(`/app/dashboard`);
        message.open({
          type: "success",
          content: `Абонемент успешно создан на ${formatDateToDayAndDateFormat(
            response.trainings[0].date.toString().toLowerCase()
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
  const isFormValid = (formData: IFormData): boolean => {
    return (
      formData.clientID !== "" &&
      formData.tariffID !== null &&
      formData.clubID !== null
    );
  };
  useEffect(() => {
    setButtonDisabled(!isFormValid(formData));
  }, [formData]);

  const tariffValueIfIsFirstWorkOut =
    isFirstWorkOut && selectTariff?.trainingAmount
      ? tariffs?.find(
          (tariff) =>
            tariff.trainingAmount === selectTariff.trainingAmount!! - 1
        )
      : undefined;
  const tariffValueIfIsFirstWorkOutFalse =
    !isFirstWorkOut && selectTariff?.trainingAmount
      ? tariffs?.find(
          (tariff) =>
            tariff.trainingAmount === selectTariff.trainingAmount!! + 1
        )
      : undefined;
  useEffect(() => {
    if (tariffValueIfIsFirstWorkOut) {
      setFormData((prev) => ({
        ...prev,
        tariffID: tariffValueIfIsFirstWorkOut.id,
      }));
      setSelectTariff(tariffValueIfIsFirstWorkOut);
    } else if (tariffValueIfIsFirstWorkOutFalse) {
      setFormData((prev) => ({
        ...prev,
        tariffID: tariffValueIfIsFirstWorkOutFalse.id,
      }));
      setSelectTariff(tariffValueIfIsFirstWorkOutFalse);
    }
  }, [selectTariff, tariffValueIfIsFirstWorkOut, isFirstWorkOut]);
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <Form style={{ width: "100%" }} name="validateOnly" layout="vertical">
        <div className={styles.formLayout}>
          <Form.Item label="Тариф:" style={{ width: "100%" }}>
            <Select
              onChange={handleSelectChange("tariffID")}
              options={selectTariffOptions}
              filterOption={customFilterOption}
              filterSort={customFilterSort}
              showSearch
              value={
                selectTariff
                  ? selectTariff?.name +
                    " / " +
                    selectTariff?.trainingAmount +
                    " тренировок"
                  : undefined
              }
              placeholder="Выберите тариф"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Клиент:" style={{ width: "100%" }}>
            <Select
              onChange={handleSelectChange("clientID")}
              style={{ width: "100%" }}
              showSearch
              value={clientID ? currentClient?.label?.toString() : undefined}
              filterOption={customFilterOption}
              filterSort={customFilterSort}
              options={selectClientsOptions}
              defaultValue={currentClient?.label?.toString()}
              size="middle"
              placeholder="Выберите клиента"
            />
          </Form.Item>
          <Form.Item label="Зал:" style={{ width: "100%" }}>
            <Select
              onChange={handleSelectChange("clubID")}
              options={selectClubsOptions}
              filterOption={customFilterOption}
              filterSort={customFilterSort}
              showSearch
              placeholder="Выберите зал"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <div className={styles.subscriptionCostLayout}>
            <label className={styles.label}>Стоимость абонемента:</label>
            <p className={styles.cost}>
              {selectTariff?.cost &&
                convertToCurrencyFormat(selectTariff?.cost.toString() || "")}
              {selectTariff?.cost && " ₽"}
            </p>
          </div>

          <div className={styles.switchLayout}>
            <label className={styles.switchLabel}>
              Включить первую тренировку
            </label>
            <Switch onChange={setIsFirstWorkOut} value={isFirstWorkOut} />
          </div>

          {selectTariff?.trainingAmount && (
            <DashDivider style={{ margin: "8px 0" }} />
          )}
          <div className={styles.trainingsWrap}>
            {Array.from(
              { length: selectTariff?.trainingAmount || 0 },
              (_, index) => (
                <div key={index} className={styles.trainingsLayout}>
                  <label className={styles.label}>{`${numberToOrdinal(
                    index + 1
                  )} занятие:`}</label>

                  <div className={styles.inputLayout}>
                    <DatePicker
                      inputReadOnly
                      disabledDate={disabledDate}
                      format={dateFormat}
                      style={{ width: "100%" }}
                      placeholder="Выберите дату"
                      value={trainings[index]?.dateInput || null}
                      onChange={(date, dateString) => {
                        if (!Array.isArray(dateString)) {
                          handleTrainingChange(index, date, dateString, "date");
                        }
                      }}
                    />
                  </div>
                  <div className={styles.slotsWrap}>
                    {trainingSlots[index]
                      ?.filter((slot) => slot.isAvailable)
                      .map((slot) => (
                        <button
                          key={slot.id}
                          className={styles.slot}
                          onClick={() =>
                            handleSlotClick(
                              slot.id,
                              trainings[index].date || ""
                            )
                          }
                          style={{
                            backgroundColor:
                              slot.id ===
                              selectedSlots[trainings[index].date || ""]
                                ? "#000"
                                : "",
                            color:
                              slot.id ===
                              selectedSlots[trainings[index].date || ""]
                                ? "#fff"
                                : "",
                          }}
                        >
                          {slot.beginning}
                        </button>
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
          <Button
            disabled={isButtonDisabled}
            loading={isButtonLoading}
            onClick={handleCreateSubscription}
            htmlType="submit"
            style={{ width: "100%", marginTop: "12px" }}
            type="primary"
            size="large"
          >
            Сохранить
          </Button>
        </div>
      </Form>
    </>
  );
};
