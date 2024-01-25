export enum UserMessage {
  // Success messages.
  SUCC_USER_CREATED = 'S100::회원가입이 완료되었습니다.',
  SUCC_PASSWORD_CHANGED = 'S101::비밀번호가 변경되었습니다.',
  SUCC_USER_DELETED = 'S102::회원 탈퇴가 완료되었습니다.',
  SUCC_VERIFY_USER = 'S103::이메일 인증이 완료되었습니다.',
  
  // Error messages.
  FAIL_USER_SIGNIN_NON_VERIFY = 'E100::인증되지 않은 회원입니다. 가입 시 기입했던 이메일을 확인하세요.',
  FAIL_USER_SIGNIN = 'E101::아이디 또는 비밀번호가 다릅니다.',

  FAIL_USER_SIGNUP_INVAILD_NICKNAME = 'E110::중복되거나 올바르지 않은 닉네임입니다.',
  FAIL_USER_SIGNUP_INVAILD_EMAIL = 'E111::중복되거나 올바르지 않은 이메일입니다.',
  FAIL_USER_SIGNUP_INVAILD_PASSWORD = 'E112::올바르지 않은 비밀번호입니다.'
}

export function generateUserMessage(userMessage: UserMessage) {
  const message = userMessage.split('::');
  return {
    code: message[0],
    message: message[1],
  };
}
