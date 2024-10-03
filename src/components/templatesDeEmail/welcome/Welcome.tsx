import React, { ReactElement } from "react";

interface welcomeInterface {
    nome: string
}

const Welcome = ({nome}: welcomeInterface): ReactElement => {
  const primeiroNome: string = nome.match(/^\S+/)?.[0] || "";
  return <div>Welcome</div>;
};

export default Welcome;
