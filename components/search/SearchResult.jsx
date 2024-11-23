'use client';

import { Flex } from '@radix-ui/themes';
import { Header, ImageCard } from '../common';
import styles from '@/components/search/SearchResult.module.css';
import Image from 'next/image';
import { agits } from '@/constants/dummy';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function SearchResult({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async ({ keyword }) => {
    router.push(`/service/search?q=${keyword}`);
  };

  return (
    <div className="page">
      <Header side="left">검색결과</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            <form onSubmit={handleSubmit(onSubmit)} className={styles.search_form}>
              <input
                {...register('keyword')}
                type="text"
                id="keyword"
                placeholder="키워드를 입력해주세요!"
                defaultValue={params}
              />
              <button type="submit">
                <Image src="/icons/ico_search.svg" width={15} height={15} alt="검색하기" />
              </button>
            </form>
            <div className="result_list">
              <Flex direction="column" gap="10px" asChild>
                <ul>
                  {agits.map((agit, i) => {
                    return (
                      <li key={`agit${i}`}>
                        <ImageCard data={agit}></ImageCard>
                      </li>
                    );
                  })}
                </ul>
              </Flex>
            </div>
          </Flex>
        </section>
      </div>
    </div>
  );
}
