import instance from './instance';

const mypageAPI = {
  // 전체 관심사 목록 조회
  getAllInterests: async () => {
    const response = await instance.get('interests/all');
    return response.data;
  },

  // 관심사 목록 조회
  getInterests: async () => {
    const response = await instance.get('interests');
    return response.data;
  },

  // 사용자 관심사 업데이트
  updateInterests: async (selectedInterests) => {
    const response = await instance.put('members/me/interests', {
      interestIds: selectedInterests,
    });
    return response.data;
  },

  // 닉네임 가져오기
  getNickname: async () => {
    const response = await instance.get('members/me/nickname');
    return response.data.nickname;
  },

  // 닉네임 수정
  updateNickname: async (nickname) => {
    const response = await instance.put('members/me/nickname', {
      nickname: nickname,
    });
    if (response.status !== 200) {
      throw new Error('닉네임 수정에 실패했습니다.');
    }
    return response.data;
  },

  // 비밀번호 수정
  updatePassword: async (current_password, new_password) => {
    try {
      const response = await instance.put('members/me/password', {
        current_password,
        new_password,
      });
      if (response.status !== 200) {
        throw new Error('비밀번호 수정에 실패했습니다.');
      }
      return response.data;
    } catch (error) {
      throw new Error('비밀번호 수정에 실패했습니다: ' + error.message);
    }
  },

  // 주소 가져오기
  getAddresses: async () => {
    try {
      const response = await instance.get('members/me/addresses');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  // 주소 수정
  updateAddresses: async (addresses) => {
    const response = await instance.patch('members/me/addresses', { addresses });
    return response.data;
  },

  // 모임카드 목록 조회
  getCrewCards: async () => {
    const response = await instance.get('members/me/cards');
    return response.data;
  },

  // 모임카드 연결
  attachCrewCard: async (cardId, crewId) => {
    const response = await instance.post('members/me/cards', {
      cardId,
      crewId,
    });
    return response.data;
  },

  // 모임카드 해지
  detachCrewCard: async (cardId) => {
    const response = await instance.delete(`members/me/cards/${cardId}`);
    return response.data;
  },

  // 개인 계좌 목록 조회
  getPersonalAccounts: async () => {
    const response = await instance.get('members/me/accounts');
    return response.data;
  },

  // 개인 계좌 연결
  attachPersonalAccount: async (accountId, crewId) => {
    const response = await instance.post('members/me/accounts', {
      accountId,
      crewId,
    });
    return response.data;
  },

  // 개인 계좌 해지
  detachPersonalAccount: async (accountId) => {
    const response = await instance.delete(`members/me/accounts/${accountId}`);
    return response.data;
  },

  // 회비 납부 정보 조회
  getFeePaymentInfo: async (crewId) => {
    const response = await instance.get(`crews/${crewId}/fees`);
    return response.data;
  },

  // 회비 납부하기
  payCrewFee: async (crewId, amount, accountId) => {
    const response = await instance.post(`crews/${crewId}/fees/payment`, {
      amount,
      accountId,
    });
    return response.data;
  },

  // 거래 내역 조회
  getTransactionHistory: async (accountId) => {
    const response = await instance.get(`members/me/accounts/${accountId}/transactions`);
    return response.data;
  },

  // 프로필 정보 조회
  getProfile: async () => {
    const response = await instance.get('members/me/profile');
    return response.data;
  },

  // 프로필 이미지 업데이트
  updateProfileImage: async (formData) => {
    const response = await instance.put('members/me/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default mypageAPI;
