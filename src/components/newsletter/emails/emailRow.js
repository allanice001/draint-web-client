import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';

export function ArtistEmailsRow({
  row,
  checkedAccounts,
  index,
  handleEmailChecked,
  selectedAll,
}) {
  const [checked, checking] = React.useState(false);

  const isChecked = useCallback(() => {
    checking(false);
    // eslint-disable-next-line no-restricted-syntax
    for (const element of checkedAccounts) {
      if (element === row.id) checking(true);
    }
  }, [checkedAccounts, row.id]);

  React.useEffect(() => {
    isChecked();
  }, [isChecked]);

  const emailCheck = async () => {
    handleEmailChecked(row, !checked);
    checking(!checked);
  };

  const dateFormat = date => {
    const fullDate = new Date(date);
    return fullDate.toDateString();
  };

  const verificationFormat = verif => {
    if (verif === 'verified')
      return <div style={{ color: '#3f51b5' }}>VERIFIED</div>;
    if (verif === 'unverified')
      return <div style={{ color: '#f50057' }}>UNVERIFIED</div>;
    if (verif === 'legacy')
      return <div style={{ color: '#7d7d7d' }}>LEGACY</div>;
    return <div style={{ color: '#f7af11' }}>PENDING</div>;
  };

  const isEmptyField = field => {
    if (!field) return 'EMPTY';
    if (field === 'null null') return 'Noname';
    return field;
  };

  return (
    <TableRow key={index + 1}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">
        <Link alt="artist" to={getArtistGalleryURL(row.username)}>
          {isEmptyField(`${row.first_name} ${row.last_name}`)}
        </Link>
      </TableCell>
      <TableCell align="center">{isEmptyField(row.instagram)}</TableCell>
      <TableCell align="center">{dateFormat(row.created_at)}</TableCell>
      <TableCell align="center">
        {verificationFormat(row.verification)}
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={selectedAll ? true : checked}
          color="primary"
          onChange={() => emailCheck()}
          disabled={selectedAll}
        />
      </TableCell>
    </TableRow>
  );
}
