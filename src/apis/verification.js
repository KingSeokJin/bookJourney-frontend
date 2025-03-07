import apiClient from '../apis/instance/apiClient'; // axios 인스턴스 가져오기

// 이메일 인증 요청 API
export const requestEmailVerification = async (email) => {
  try {
    if (!email) {
      throw new Error('이메일은 필수 입력 항목입니다.');
    }

    const response = await apiClient.post(
      '/users/emails/vertifications-requests',
      { email }
    );

    if (response.data.code === 200) {
      return response.data; // 성공 응답 반환
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          '이메일 인증 요청 중 오류가 발생했습니다.'
      );
    } else {
      throw new Error('네트워크 오류 또는 서버 응답 없음');
    }
  }
};

// 이메일 인증번호 검증 API 추가
export const verifyEmailCode = async (email, code) => {
  try {
    if (!email) {
      throw new Error('이메일은 필수 입력 항목입니다.');
    }
    if (!code) {
      throw new Error('인증할 코드를 입력해주세요.');
    }

    const response = await apiClient.post('/users/emails/vertifications', {
      email,
      code,
    });

    if (response.data.code === 200 && response.data.data.verified) {
      return true; // 인증 성공
    } else {
      throw new Error('인증에 실패하였습니다.');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || '인증번호 확인 중 오류가 발생했습니다.'
      );
    } else {
      throw new Error('네트워크 오류 또는 서버 응답 없음');
    }
  }
};

// 닉네임 중복 확인 API
export const checkNicknameAvailability = async (nickname) => {
  try {
    if (!nickname) {
      throw new Error('닉네임을 입력해주세요.');
    }

    const response = await apiClient.post('/users/nickname', {
      nickName: nickname,
    });

    if (response.data.code === 200) {
      return response.data.data.verified; // 닉네임 사용 가능 여부 반환
    } else {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || '닉네임 중복 확인 중 오류 발생'
      );
    } else {
      throw new Error('네트워크 오류 또는 서버 응답 없음');
    }
  }
};
