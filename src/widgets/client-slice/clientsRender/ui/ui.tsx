"use client";
import { ClientCard } from "@/entities/client-slice/clientCard";
import { useEffect, useState } from "react";
import { IUser } from "@/shared/interface/user";
import { getClients } from "../api";
import { LackData } from "@/shared/ui/error-slice/lackData";
import { parseDateToDoteFormate } from "@/shared/lib/parse/date";
import styles from "./ui.module.scss";
import { AutoComplete } from "antd";
import { searchClients, SearchFunction } from "../model";
export const Clients = () => {
  const [clients, setClients] = useState<IUser[]>();
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchUsers = await getClients();
      if (!(fetchUsers instanceof Error)) {
        setClients(fetchUsers);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (clients) {
      const filtered = searchClients(autoCompleteValue, clients);
      setFilteredClients(filtered);
    }
  }, [autoCompleteValue, clients]);
  return (
    <>
      <div className={styles.layout}>
        {clients && clients.length > 0 && (
          <AutoComplete
            value={autoCompleteValue}
            onSearch={(text) => setAutoCompleteValue(text)}
            placeholder="Найти клиента"
            style={{ width: "100%" }}
            size="large"
          />
        )}
        {clients ? (
          <section className={styles.render}>
            {filteredClients.length > 0 ? (
              filteredClients.map((item) => (
                <ClientCard client={item} key={item.id} />
              ))
            ) : (
              <LackData>нет клиентов</LackData>
            )}
          </section>
        ) : (
          <LackData>нет клиентов</LackData>
        )}
      </div>
    </>
  );
};
