export type jwtPayloadT = {
  id: number;
  email: string;
  username: string;
};

export type jwtUserT = {
  id: number;
  email: string;
  username: string;
  iat: Date;
  exp: Date;
};

export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
