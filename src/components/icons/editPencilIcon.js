import * as React from 'react';

function EditPencilIcon({ className = '' }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <g fill="currentColor">
        <path
          d={`M11.116 3.023l-9.904 9.905a.394.394 0 00-.103.18L.011 17.516a.392.392 0 00.378.484.385.385 0
        00.095-.012L4.89 16.89a.39.39 0 00.18-.102l9.906-9.904-3.86-3.86zM17.429
        1.673L16.326.57c-.737-.736-2.02-.736-2.757 0l-1.35 1.35 3.86 3.86
        1.35-1.35c.368-.368.57-.858.57-1.379 0-.52-.202-1.01-.57-1.378z`}
        />
      </g>
    </svg>
  );
}

export default EditPencilIcon;
