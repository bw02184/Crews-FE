import { majorCities, NONE } from '@/constants/address';

export const getAddressValue = (address) => {
  if (!address) return '';

  const { doName, siName, guName, dongName } = address;
  const hasAddress = doName !== NONE || siName !== NONE || guName !== NONE || dongName !== NONE;

  if (!hasAddress) return '';

  const parts = [];
  if (majorCities.includes(siName)) {
    // 주요 광역시일 경우 doName을 제외하고 siName, guName, dongName만 사용
    if (siName && siName !== NONE) parts.push(siName);
    if (guName && guName !== NONE) parts.push(guName);
    if (dongName && dongName !== NONE) parts.push(dongName);
  } else {
    // 일반 도 시 구 동
    if (doName && doName !== NONE) parts.push(doName);
    if (siName && siName !== NONE) parts.push(siName);
    if (guName && guName !== NONE) parts.push(guName);
    if (dongName && dongName !== NONE) parts.push(dongName);
  }

  return parts.join(' ');
};

export const isAddressEmpty = (address) => {
  if (!address) return true;

  const { doName, siName, guName, dongName } = address;
  if (doName === NONE && siName === NONE && guName === NONE && dongName === NONE) {
    return true;
  }

  if (!siName || siName.trim() === '' || siName === NONE) return true;
  if (!dongName || dongName.trim() === '' || dongName === NONE) return true;

  if (doName === NONE) {
    if (!guName || guName.trim() === '' || guName === NONE) return true;
  }

  return false;
};
