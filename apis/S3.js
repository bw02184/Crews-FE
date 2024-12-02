import AWS from 'aws-sdk';

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 런타임 환경 변수로 관리
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 런타임 환경 변수로 관리
  region: process.env.AWS_REGION, // 런타임 환경 변수로 관리
});
export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { userId, fileType } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID가 필요합니다.' });
    }

    const fileName = `${userId}_profile.jpg`; // 회원 ID 기반 파일명 생성
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `profiles/${fileName}`, // 'profiles/' 폴더에 저장
      Expires: 60, // 유효 시간 (초)
      ContentType: fileType, // 업로드 파일 타입
    };

    try {
      const signedUrl = await s3.getSignedUrlPromise('putObject', params);
      return res.status(200).json({ signedUrl, fileName });
    } catch (error) {
      console.error('S3 업로드 URL 생성 오류:', error);
      return res.status(500).json({ error: 'S3 업로드 URL 생성 중 오류가 발생했습니다.' });
    }
  } else if (method === 'DELETE') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID가 필요합니다.' });
    }

    const fileName = `${userId}_profile.jpg`; // 회원 ID 기반 파일명
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `profiles/${fileName}`, // 'profiles/' 폴더에서 파일 삭제
    };

    try {
      await s3.deleteObject(params).promise();
      return res.status(200).json({ message: '파일이 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error('S3 파일 삭제 오류:', error);
      return res.status(500).json({ error: 'S3 파일 삭제 중 오류가 발생했습니다.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
