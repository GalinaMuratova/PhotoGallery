export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  avatar: string | null;
  displayName: string;
}

export interface Photo {
  user: {
    _id: string;
    displayName: string;
    role: string;
  };
  _id: string;
  title: string;
  image: string;
}

export interface PhotoMutation {
  title: string;
  image: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
