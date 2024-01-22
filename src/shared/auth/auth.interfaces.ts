export interface SignedToken {
  accessToken: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export type Issuer = 'login' | 'forget';
export type Audience = 'users' | 'admins';

export interface TokenPayload {
  id: number;
  name: string;
  email: string;
  issuer: Issuer;
  audience: Audience;
}

export type TokenAgent = Pick<TokenPayload, 'issuer' | 'audience'>;
export interface TokenConfig {
  expiresIn: string;
  subject: string;
  issuer: string;
  audience: string;
}
