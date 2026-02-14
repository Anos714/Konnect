import { Document, Types } from "mongoose";
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  bio?: string;
  nativeLang?: string;
  learningLang?: string;
  location?: string;
  isOnboarded: boolean;
  friends: Types.ObjectId[];
  matchPassword(password: string): Promise<boolean>;
}
