import { useEffect, useState } from 'react';

import { isoCountries } from 'components/countries/list';

const addIds = list =>
  list.map((element, index) => ({ ...element, id: index + 1 }));
const renameProps = (list, keyMap) =>
  list.map(element => {
    const result = {};
    keyMap.forEach(([from, to]) => {
      result[to] = element[from];
    });

    return result;
  });

function useCountryList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = addIds(
      renameProps(isoCountries, [
        ['ccode', 'key'],
        ['cname', 'label'],
      ])
    );

    setList(data);
  }, []);

  return list;
}

export default useCountryList;
