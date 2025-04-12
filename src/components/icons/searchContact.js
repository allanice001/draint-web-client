import * as React from 'react';

function SearchContactIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d={`M23.203 21.853l-5.522-5.522a9.645 9.645 0 002.194-6.136c0-5.343-4.336-9.68-9.68-9.68-5.348 0-9.68 
        4.337-9.68 9.68 0 5.344 4.332 9.68 9.68 9.68 2.33 0 4.463-.82 6.132-2.19l5.521 5.518a.956.956 0 
        001.355-1.35zm-13.008-3.905c-4.28 0-7.758-3.478-7.758-7.753s3.479-7.758 7.758-7.758c4.275 0 7.758 
        3.483 7.758 7.758s-3.483 7.753-7.758 7.753z`}
        fill="currentColor"
      />
    </svg>
  );
}

export { SearchContactIcon };
