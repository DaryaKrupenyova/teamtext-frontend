export interface LoginData {
  emailValue: string;
  passwordValue: string;
}

export interface RegisterData {
  emailValue: string;
  passwordValue: string;
  passwordValue2: string;
}

export interface AuthErrorResponse {
  data?: {
    email?: string;
    password?: string;
  };
}
