import { instance } from "@/shared/api/axios-config";
import { IAuth, IToken } from "@/shared/interface/auth";

export const postUser = async (authProps: IAuth): Promise<IToken | Error> => {
  try {
    const { data }: { data: IToken } = await instance.post("/auth/login/", {
      login: authProps.phone,
      password: authProps.password,
    });

    sessionStorage.setItem("accessToken", data.accessToken);
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const registerUser = async (
  authProps: IAuth
): Promise<IToken | Error> => {
  try {
    const { data }: { data: IToken } = await instance.post("/auth/register/", {
      phone: authProps.phone,
      name: authProps.name,
      password: authProps.password,
      role: "trainer",
    });
    sessionStorage.setItem("accessToken", data.accessToken);
    return data;
  } catch (error) {
    return error as Error;
  }
};
