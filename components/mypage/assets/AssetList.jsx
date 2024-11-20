'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Flex, Box, Text } from '@radix-ui/themes';
import styles from './AssetList.module.css';

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (index) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset, i) => ({
        ...asset,
        isSelected: i === index ? !asset.isSelected : asset.isSelected,
      })),
    );
  };

  const fetchAssetData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dummyData = [
        {
          img: '/dev/img_bank.jpg',
          name: 'KB국민ONE통장',
          accountNumber: '110467158676',
          isSelected: false,
        },
        {
          img: '/dev/img_bank.jpg',
          name: '우리CUBE통장',
          accountNumber: '110467158676',
          isSelected: false,
        },
        {
          img: '/dev/img_bank.jpg',
          name: '신한 주거래 우대통장',
          accountNumber: '110467158676',
          isSelected: false,
        },
      ];

      setAssets(dummyData);
    } catch (error) {
      console.error('자산 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssetData();
  }, []);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '200px' }}>
        마이데이터를 불러옵니다...
      </Flex>
    );
  }

  if (!assets || assets.length === 0) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '200px' }}>
        연결 가능한 자산이 없습니다.
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="20px">
      <ul className={styles.assetList}>
        {assets.map((asset, i) => (
          <li key={`asset${i}`} className={styles.assetItem}>
            <Flex align="center" justify="between" className={styles.itemContent}>
              <Flex align="center" gap="10px">
                <Box className={styles.imgBox}>
                  <Box className={styles.profileImg} style={{ backgroundImage: `url(${asset.img})` }}>
                    <Image src={asset.img} width={36} height={36} alt={asset.name} />
                  </Box>
                </Box>
                <Flex direction="column" gap="2px">
                  <Text as="p" size="2" weight="medium">
                    {asset.name}
                  </Text>
                  <Text as="p" size="3" color="gray">
                    {asset.accountNumber}
                  </Text>
                </Flex>
              </Flex>
              <input
                type="checkbox"
                id={`asset-${i}`}
                checked={asset.isSelected}
                onChange={() => handleSelect(i)}
                className={styles.checkboxInput}
              />
              <label htmlFor={`asset-${i}`} className={`blue_bg ${styles.selectButton}`}>
                {asset.isSelected ? '선택해제' : '선택하기'}
              </label>
            </Flex>
          </li>
        ))}
      </ul>
    </Flex>
  );
}
