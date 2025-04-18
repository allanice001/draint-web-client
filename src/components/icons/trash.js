import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15.312 8.695a.562.562 0 00-.562.562V19.88a.562.562 0 001.124 0V9.257a.562.562 0
          00-.562-.562zM8.68 8.695a.562.562 0 00-.563.562V19.88a.562.562 0 001.124 0V9.257a.562.562 0 00-.562-.562z"
        fill="#000"
      />
      <path
        d="M3.846 7.145v13.848c0 .819.3 1.587.825 2.139A2.768 2.768 0 006.679
          24h10.634a2.767 2.767 0 002.009-.868c.524-.552.824-1.32.824-2.139V7.145a2.147
          2.147 0 00-.55-4.222h-2.878V2.22A2.208 2.208 0 0014.492 0H9.5a2.208 2.208 0 00-2.226
          2.22v.703H4.397a2.147 2.147 0 00-.55 4.222zm13.467 15.73H6.68c-.961
          0-1.709-.825-1.709-1.882V7.194h14.052v13.799c0 1.057-.748 1.883-1.709 1.883zM8.4
          2.22a1.082 1.082 0 011.102-1.096h4.99a1.083 1.083 0 011.102 1.096v.703H8.4V2.22zM4.397
          4.047h15.198a1.012 1.012 0 110 2.023H4.397a1.012 1.012 0 110-2.023z"
        fill="#000"
      />
      <path
        d="M11.992 8.695a.562.562 0 00-.562.562V19.88a.562.562 0 001.124
        0V9.257a.562.562 0 00-.562-.562z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgComponent;
