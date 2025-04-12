import React, { useMemo } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { Spinner } from 'components/lib';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getFullName } from 'services/global';

const DELIMETR = '^&)*@';

const dateFormat = date => {
  return date.split('T').shift();
};

const verificationFormat = verif => {
  if (verif === 'verified')
    return <div style={{ color: '#3f51b5' }}>VERIFIED</div>;
  if (verif === 'unverified')
    return <div style={{ color: '#f50057' }}>UNVERIFIED</div>;
  if (verif === 'legacy') return <div style={{ color: '#7d7d7d' }}>LEGACY</div>;
  return <div style={{ color: '#f7af11' }}>PENDING</div>;
};

const columns = [
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 120,
    renderCell: params => {
      const [username, first_name, last_name, is_artist] = params.value
        .split(DELIMETR)
        .pop()
        .split(',')
        .map(v => (v === 'null' ? null : v));
      if (is_artist === 'true') {
        const to = getArtistGalleryURL(username);

        return (
          <Link className="u-link" to={to}>
            {getFullName(first_name, last_name, username)}
          </Link>
        );
      }
      return <span>{getFullName(first_name, last_name, username)}</span>;
    },
  },
  {
    field: 'instagram',
    headerName: 'Instagram',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'created_at',
    headerName: 'Created Date',
    flex: 1,
    minWidth: 120,
    valueGetter: params => dateFormat(params.value),
  },
  {
    field: 'verification',
    headerName: 'Verification',
    flex: 1,
    minWidth: 120,
    renderCell: params => verificationFormat(params.value),
  },
];

export function ArtistsEmailsList({ artists, loading, updateRecipients }) {
  const [selectionModel, setSelectionModel] = React.useState([]);

  const rows = useMemo(() => {
    return artists.map(artist => {
      return {
        ...artist,
        name: getFullName(artist.first_name, artist.last_name, artist.username),
      };
    });
  }, [artists]);

  return (
    <div style={{ height: '634px', width: '100%' }}>
      {loading ? (
        <Spinner full />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onSelectionModelChange={newSelectionModel => {
            setSelectionModel(newSelectionModel);
            updateRecipients(newSelectionModel || []);
          }}
          selectionModel={selectionModel}
        />
      )}
    </div>
  );
}
