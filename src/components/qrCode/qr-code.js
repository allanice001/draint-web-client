import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import BasicModal from 'components/basic-modal/basic-modal';
import Icons from 'components/icons';
import QRCode from 'qrcode.react';
import React from 'react';
import styles from './qr-code.module.scss';

export function QRcodeGenerator(props) {
  const [open, setOpen] = React.useState(false);

  const download = () => {
    const canvas = document.getElementById('QRcodeGenerator');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = props.title ? `${props.title}.png` : 'QR.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={`${styles.qr} ${props.className}`}>
      <button
        type="button"
        className={styles.qr__btn}
        onClick={() => {
          const analytic = AnalyticHelper.create();
          analytic.createEvent('QRCodeGenerated');
          setOpen(!open);
        }}
      >
        <span className={styles.icon}>
          <Icons.CodeQR />
        </span>
        Generate QR code
      </button>

      <BasicModal
        titleCenter={styles.titleCenter}
        isOpen={open}
        title="QR"
        maxWidth="xs"
        handleClose={() => setOpen(false)}
        footer={
          <button
            type="button"
            className={`secondary-button ${styles.qr__download_btn}`}
            onClick={download}
          >
            Download
          </button>
        }
      >
        <QRCode
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          id="QRcodeGenerator"
          value={props.url || window.location.toString()}
          size={props.size || 252}
          bgColor={props.bgColor || '#fff'}
          fgColor={props.fgColor || '#806BFF'}
          level="H"
        />
      </BasicModal>
    </div>
  );
}
