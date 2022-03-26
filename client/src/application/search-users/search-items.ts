import { useItemAdapter, useSearchStorage } from '../../services';

export const useSearchItems = () => {
  const itemAdapter = useItemAdapter();
  const storage = useSearchStorage();

  const searchItems = (searchTerm: string) => {
    console.log('searchTerm', searchTerm);
    console.log(storage.search);
  };

  return { searchItems };
};
