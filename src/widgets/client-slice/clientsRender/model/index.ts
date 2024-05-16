import { IClient } from "@/entities/client-slice/newClientForm/interface";
import { IUser } from "@/shared/interface/user";

export const sortClientItems = (
  clientItems: IClient[],
  sortBy: keyof IClient
) => {
  if (!clientItems) return clientItems;
  return clientItems.sort((a, b) => {
    const aSortValue = a[sortBy];
    const bSortValue = b[sortBy];

    if (aSortValue != null && bSortValue != null) {
      if (aSortValue < bSortValue) {
        return -1;
      } else if (aSortValue > bSortValue) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
};

export type SearchFunction = (searchText: string, clients: IUser[]) => IUser[];

export const searchClients: SearchFunction = (searchText, clients) => {
  if (searchText) {
    const filteredArray = clients.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredArray;
  } else {
    return clients;
  }
};
