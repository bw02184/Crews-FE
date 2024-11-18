import SearchForm from '@/components/search/SearchForm';
import SearchResult from '@/components/search/SearchResult';

export default function SearchPage({ searchParams }) {
  return <>{searchParams.q == undefined ? <SearchForm /> : <SearchResult q={searchParams.q} />}</>;
}
