export type UserState = {
    user: {
      access_token: string;
    };
    loginUser: any;
}

export type LoginData = {
    email: string;
    password: string;  
}
  
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photos: [];
}

export type Props = {
    images: File[];
}

export type UserJwtPayload =  {
  jti: string
  iat: number
}

export type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    photos: FileList | File[] | null;
};