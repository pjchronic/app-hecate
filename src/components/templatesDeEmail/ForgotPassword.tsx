import React, { ReactElement } from 'react'

interface ForgotPasswordInterface {
    url: string;
    nome: string;
  }

const ForgotPassword = ({ url, nome }: ForgotPasswordInterface): ReactElement => {
    const primeiroNome: string = nome.match(/^\S+/)?.[0] || '';
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword
