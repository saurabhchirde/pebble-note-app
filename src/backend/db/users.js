import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Saurabh",
    lastName: "Chirde",
    email: "saurabh.chirde@gmail.com",
    password: bcyrpt.hashSync("saurabh@123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "User",
    email: "test@gmail.com",
    password: bcyrpt.hashSync("test@123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
