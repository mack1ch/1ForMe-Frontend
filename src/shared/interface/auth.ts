export interface IAuth {
  name?: string;
  phone: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  phone: string;
}
