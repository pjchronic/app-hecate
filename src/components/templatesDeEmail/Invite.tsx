import React, { ReactElement } from 'react'

interface InviteProps {
    url: string;
    nome: string;
  }

const Invite = ({ url, nome }: InviteProps): ReactElement => {
    const primeiroNome: string = nome.match(/^\S+/)?.[0] || '';
  return (
    <div>invite</div>
  )
}

export default Invite
