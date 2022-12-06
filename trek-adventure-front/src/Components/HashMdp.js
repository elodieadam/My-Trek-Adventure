import { useState } from "react";

const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";
const passwordLength = 8;
const [NewPassword, setNewPassword] = useState("");

export default function createPassword() {
  let password = "";
  const characterList = `${numbers}${upperCaseLetters}${lowerCaseLetters}${specialCharacters}`;
  const characterListLength = characterList.length;

  for (let i = 0; i < passwordLength; i++) {
    const characterIndex = Math.round(Math.random() * characterListLength);
    password = password + characterList.charAt(characterIndex);
  }
  setNewPassword(password);
}
