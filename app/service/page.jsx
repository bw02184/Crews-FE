import ButtonL from '@/components/service/common/Button/ButtonL';
import ButtonM from '@/components/service/common/Button/ButtonM';
import ButtonS from '@/components/service/common/Button/ButtonS';
export default function Service() {
  return (
    <div>
      <h1>서비스 페이지</h1>
      버튼L
      <ButtonL style="deepYellow">버튼1</ButtonL>
      <ButtonL style="lightYellow">버튼2</ButtonL>
      버튼M
      <ButtonM leftText="M1" rightText="M2" />
      버튼S
      <ButtonS style="deepYellow">s1</ButtonS>
      <ButtonS style="lightYellow">s2</ButtonS>
    </div>
  );
}
