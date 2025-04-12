/* eslint-disable max-len */
import * as React from 'react';

function Chat(props) {
  return (
    <svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <path
        d="M18.574 1.818H2.637A2.633 2.633 0 000 4.454v10.547a2.633 2.633 0 002.637 2.637h.879v2.637a.879.879 0 001.3.773c.018-.017.053-.017.07-.035 4.836-3.242 3.752-2.52 4.835-3.235a.884.884 0 01.474-.14h8.38A2.633 2.633 0 0021.21 15V4.454a2.633 2.633 0 00-2.637-2.636zm-7.031 10.546H4.395c-1.159 0-1.164-1.757 0-1.757h7.148c1.159 0 1.163 1.758 0 1.758zm5.273-3.515H4.395c-1.159 0-1.164-1.758 0-1.758h12.421c1.159 0 1.164 1.758 0 1.758z"
        fill="#806BFF"
      />
      <path
        d="M27.363 8.849H22.97V15a4.396 4.396 0 01-4.395 4.395H10.46l-1.67 1.107v1.53a2.633 2.633 0 002.637 2.636h8.642l5.045 3.375c.689.383 1.371-.082 1.371-.738v-2.637h.88A2.633 2.633 0 0030 22.032V11.486a2.633 2.633 0 00-2.637-2.637z"
        fill="#806BFF"
      />
    </svg>
  );
}

export default Chat;
