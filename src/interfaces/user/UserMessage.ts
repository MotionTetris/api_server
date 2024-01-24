export enum UserMessage {
  USER_CREATED = 'S100::회원가입이 완료되었습니다.',
  PASSWORD_CHANGED = 'S101::비밀번호가 변경되었습니다.',
  USER_DELETED = 'S102::회원 탈퇴가 완료되었습니다.',
}

export function generateUserMessage(userMessage: UserMessage) {
  const message = userMessage.split('::');
  return {
    code: message[0],
    message: message[1],
  };
}
