export interface ITokenDetails {
  id: number;
  iat: number;
  exp: number;
  sub: string;
  username?: string;
  roles?: string[];
}
