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
    const response = await instance.post('members/me/nickname', {
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
      const response = await instance.post('members/me/password', {
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
    const response = await instance.post('members/me/addresses', { addresses });
    return response.data;
  },
};

export default mypageAPI;
