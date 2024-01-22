export interface SignedToken {
  accessToken: string;
}

export interface TokenPayload {
  id: number;
  name: string;
  email: string;
}

export interface TokenConfig {
  expiresIn: string;
  subject: string;
  issuer: string;
  audience: string;
}
