import Item from '../../models/Item';
import SearchedItem from './SearchedItem';
import { Fragment, useEffect, useState } from 'react';

const DUMMY_DATA: Item[] | [] = [
  new Item('title1', 'author1'),
  new Item('title2', 'author2'),
  new Item('title3', 'author3'),
];

const SearchedItems = () => {
  const [items, setItems] = useState<Item[] | []>([]);

  useEffect(() => {
    // FIXME
    // http request to get items data

    setItems(DUMMY_DATA);
  }, [setItems]);

  let dispItems = items.map((item) => {
    return (
      <SearchedItem title={item.title} id={item.id} author={item.author} />
    );
  });

  return (
    <Fragment>
      {dispItems}
      {(!dispItems || dispItems.length === 0) && <p>No item found!</p>}
    </Fragment>
  );
};

export default SearchedItems;
