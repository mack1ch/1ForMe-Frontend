"use client";

import Image from "next/image";
import styles from "./ui.module.scss";
import Arrow from "../../../../../public/icons/workTime/arrowDown.svg";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { DashDivider } from "@/shared/ui/divider-slice/dashDivider/ui/ui";
import { Form, message, Select, SelectProps } from "antd";
import { ITrainerSlot } from "@/shared/interface/slots";

import {
  createNewSlot,
  deleteSlotByID,
  editSlotByID,
  getAllStudios,
  getSlots,
} from "../api";
import { IStudio } from "@/shared/interface/user";
import Trash from "../../../../../public/icons/workTime/trash.svg";
import { IRegisterWorkTimeCard, ISelectOptions } from "../interface";
import { findOptionById, getOptionLabel } from "../model";

export const RegisterWorkTimeCard = ({
  style,
  slot,
  isArrowDisabled = false,
  date,
}: {
  style?: CSSProperties;
  slot?: ITrainerSlot;
  isArrowDisabled?: boolean;
  date?: string;
}) => {
  const [isCardOpen, setCardOpen] = useState(false);
  const [optionsStartSlots, setOptionsStartSlots] =
    useState<ISelectOptions[]>();
  const [optionsEndSlots, setOptionsEndSlots] = useState<ISelectOptions[]>();
  const [studios, setStudios] = useState<IStudio[]>();
  const studiosForSelectOptions: ISelectOptions[] | undefined = useMemo(
    () =>
      studios?.map((studio) => ({
        value: studio.id.toString(),
        label: studio.name,
      })),
    [studios]
  );
  const [inputValues, setInputValues] = useState<IRegisterWorkTimeCard>({
    end: slot?.end?.id || "",
    start: slot?.beginning?.id || "",
    studio: slot?.studio?.name || "",
    startRender: slot?.beginning?.beginning || "",
    endRender: slot?.end?.end || "",
    studioID: slot?.studio?.id || "",
    date: date,
    studioRender: slot?.studio?.name || "",
  });

  useEffect(() => {
    async function getStudios() {
      const studios: IStudio[] | Error = await getAllStudios();
      if (studios instanceof Error) return;
      setStudios(studios);
    }
    getStudios();
  }, []);
  useEffect(() => {
    async function getSlotsByIDStudio() {
      const slots = await getSlots(inputValues.studioID);
      if (slots instanceof Error) return;
      setOptionsStartSlots((prev) =>
        slots.map((item) => ({
          label: item.beginning,
          value: item.id.toString(),
        }))
      );
      setOptionsEndSlots((prev) =>
        slots.map((item) => ({
          label: item.end,
          value: item.id.toString(),
        }))
      );
    }
    getSlotsByIDStudio();
  }, [inputValues.studioID]);

  useEffect(() => {
    if (
      inputValues.start !== slot?.beginning?.id ||
      inputValues.end !== slot?.end?.id ||
      inputValues.studio !== slot?.studio?.id
    ) {
      handleUpdateSlot();
    }
  }, [inputValues, slot?.beginning?.id, slot?.end?.id]);
  const handleDeleteSlot = async () => {
    const response = await deleteSlotByID(slot?.id!);
    if (response instanceof Error) {
      message.open({
        type: "error",
        content: "Неудалось выполнить действие",
      });
    } else {
      message.open({
        type: "success",
        content: "Данные успешно изменены",
      });
      window.location.reload();
    }
  };

  const onSelectChange = async (
    value: string | number,
    key: string,
    options?: ISelectOptions[]
  ) => {
    if (key === "studio" && options) {
      console.log(value);
      setInputValues((prev) => ({
        ...prev,
        [key]: value,
        [`${key}Render`]: getOptionLabel(value, options),
        studioID: value,
      }));
    } else if (options) {
      setInputValues((prev) => ({
        ...prev,
        [key]: value,
        [`${key}Render`]: getOptionLabel(value, options),
      }));
    } else {
      setInputValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
    handleUpdateSlot(); // Обновление данных при выборе студии
  };

  const handleUpdateSlot = async () => {
    try {
      if (slot) {
        const res = await editSlotByID(slot?.id!, inputValues);
      } else if (inputValues.end && inputValues.start && inputValues.studio) {
        const res = await createNewSlot(inputValues);
        if (res instanceof Error) return;
        message.open({
          type: "success",
          content: "Расписание соханено",
        });
      }
    } catch (error) {
      message.error("Ошибка при обновлении расписания");
    }
  };

  return (
    <>
      <article style={{ ...style }} className={styles.article}>
        <div className={styles.closeWrap}>
          <div className={styles.left}>
            <span className={styles.divider} />
            <div className={styles.info}>
              <h4 className={styles.time}>
                {inputValues.startRender || inputValues.endRender
                  ? ` ${inputValues.startRender}–${inputValues.endRender}`
                  : "Записей нет"}
              </h4>
              <h4 className={styles.address}>
                {inputValues.studioRender
                  ? `Студия ${inputValues.studioRender}`
                  : "Выходной"}
              </h4>
            </div>
          </div>
          <button
            onClick={() => setCardOpen(!isCardOpen)}
            className={styles.icon}
            disabled={isArrowDisabled}
          >
            <Image
              className={isCardOpen ? styles.icon__open : styles.icon__close}
              src={Arrow}
              width={16}
              height={16}
              alt="Открыть"
            />
          </button>
        </div>
        <>
          <div
            style={{
              height:
                slot && isCardOpen ? "280px" : (isCardOpen && "230px") || "0",
            }}
            className={styles.openWrap}
          >
            <DashDivider style={{ marginBottom: "10px" }} />
            <Form
              className={styles.form}
              style={{ width: "100%" }}
              name="validateOnly"
              layout="vertical"
            >
              <div className={styles.formLayout}>
                <Form.Item
                  style={{ width: "100%" }}
                  label="Начало рабочего дня:"
                >
                  <Select
                    options={optionsStartSlots}
                    style={{ width: "100%" }}
                    defaultValue={slot?.beginning?.beginning}
                    placeholder="Выберите время"
                    onChange={(value) =>
                      onSelectChange(value, "start", optionsStartSlots)
                    }
                  />
                </Form.Item>
                <Form.Item
                  style={{ width: "100%" }}
                  label="Конец рабочего дня:"
                >
                  <Select
                    options={optionsEndSlots}
                    style={{ width: "100%" }}
                    defaultValue={slot?.end?.end}
                    placeholder="Выберите время"
                    onChange={(value) =>
                      onSelectChange(value, "end", optionsEndSlots)
                    }
                  />
                </Form.Item>
                <div className={styles.chooseStudio}>
                  <label className={styles.label}>Студия:</label>
                  <Select
                    onChange={(value: string) =>
                      onSelectChange(value, "studio", studiosForSelectOptions)
                    }
                    options={studiosForSelectOptions}
                    value={findOptionById(
                      inputValues.studioID.toString(),
                      studiosForSelectOptions
                    )?.label?.toString()}
                    placeholder="Выберите студию"
                    style={{ width: "60%" }}
                  />
                </div>
                {slot && (
                  <button onClick={handleDeleteSlot} className={styles.delete}>
                    Удалить{" "}
                    <Image src={Trash} width={16} height={16} alt="Мусорка" />
                  </button>
                )}
              </div>
            </Form>
          </div>
        </>
      </article>
    </>
  );
};
