import React from 'react';
import classnames from 'classnames';
import staticUrls from 'constants/images/static-urls';
import styles from './packing-instruction.module.scss';

const materials = [
  {
    src: staticUrls.image.packing1,
    label: 'Glassine paper or acid-free archival tissue paper',
  },
  {
    src: staticUrls.image.packing2,
    label: 'Plastic sheeting, poly wrap, or plastic bag',
  },
  { src: staticUrls.image.packing3, label: 'Bubble wrap' },
  {
    src: staticUrls.image.packing4,
    label: 'Foam board at least 1⁄2” thick or two-ply cardboard ',
  },
  { src: staticUrls.image.packing5, label: 'Packing tape' },
  { src: staticUrls.image.packing6, label: 'Cardboard corner protectors' },
];

function PackingInstruction() {
  const textCenter = classnames(styles.text, styles.center);
  const boldText = classnames(styles.text, styles.bolder);
  const imageInsuranceDesktop = classnames(
    styles.img_wrapper,
    styles.mobile_hide
  );
  const imageInsuranceMobile = classnames(
    styles.img_wrapper,
    styles.desktop_hide
  );
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <h1 className={styles.title}>
          Packaging information for insured shipping
        </h1>
        <h3 className={styles.subtitle}>
          All original artworks are shipped to the collector (customer or buyer)
          directly from the artist’s location via UPS. The regions we offer
          selling from, are those that UPS provides door to door shipment for.
        </h3>
        <div className={styles.information_wrapper}>
          <div className={styles.col}>
            <div className={styles.img_wrapper}>
              <img src={staticUrls.image.delivery} alt="packaging" />
            </div>
          </div>
          <div className={styles.col}>
            <p className={styles.text}>
              Whether you’ve sold a small or big artwork on canvas, please
              review our packaging guidelines below and follow it no matter what
              you were used to do when it came to packaging earlier. We do
              Understand that your artworks are very personal belongings and we
              guarantee to have well thought packaging through.
            </p>
            <p className={styles.text}>
              In the unfortunate event that your artwork is delivered with
              damage, any deviation for our guidelines will result in returning
              the artwork to you without getting your well deserved Commission
              Fee as we need to pay back the full purchasing price to the
              customer. Also we won’t earn any money in this scenario then.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Let’s start</h1>
        <h3 className={styles.subtitle}>
          First things first, make sure painting is dry
        </h3>
        <div className={textCenter}>
          Always make sure that your painting is completely dry before packaging
          it for shipment. Sometimes paint can appear dry when it’s not. Since
          drying time depends on such factors as the type and brand of paint,
          the drying mediums used, the paint colors, etc., you must research the
          correct drying time for the specific supplies you’ve used.
          <span className={boldText}>
            Our insurance will NOT cover damage to paintings as a result of
            shipping before the paint was completely dry.
          </span>
          For information about shipping insurance please read the chapter at
          the very end of this paper.
        </div>
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>You will need:</h1>
        <div className={styles.materials}>
          {materials.map((material, key) => (
            <div key={key} className={styles.materials__card}>
              <div className={styles.img_wrapper}>
                <img src={material.src} alt={material.label} />
              </div>
              <div>
                <p>{material.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Shipping insurance</h1>
        <div className={styles.information_wrapper}>
          <div className={styles.col}>
            <div className={imageInsuranceDesktop}>
              <img src={staticUrls.image.deliveryman} alt="packaging" />
            </div>
          </div>
          <div className={styles.col}>
            <p className={styles.text}>
              Draint partners up with our carrier for all shipments to insure
              artworks for the amount of the artists’ loan receivables. For
              example, if an artwork is sold for $1000, the artist is entitled
              to $900 of that sale (i.e. 90% of the total sale amount). If the
              artwork is damaged during shipping even though the artist properly
              packaged the work according to our guidelines, Draint will request
              refunds as high as 90% of the artwork selling price from the
              carrier.
            </p>
            <div className={imageInsuranceMobile}>
              <img src={staticUrls.image.deliveryman} alt="packaging" />
            </div>
            <p className={styles.text}>
              Should an artwork arrive damaged due to poor packaging procedures,
              we will deem the shipment non-insurable and Draint will hold the
              artist responsible for the damages. We will work with the buyer to
              have the artwork shipped back for a full refund.*
            </p>
            <p className={styles.text}>
              Once artworks are ready to be picked up, the artist must
              acknowledge that they’ve followed our Packaging Guidelines and/or
              consulted with us directly if these guidelines didn’t contain
              instructions specific to their artwork. In most situations, we’ll
              ask that artists send us photographs of the packed artwork before
              shipping to help us determine whether or not the packaging is
              adequate.
            </p>
            <p className={styles.text}>
              *In the cases where the artwork has been severely damaged due to
              packaging neglect, often carriers will not be willing to transport
              the damaged goods back to their origin. Draint holds the right to
              discard the damaged artwork(s) in those extremely rare cases. Its
              incredibly important to comply with our Packaging Guidelines to
              avoid this type of scenario by all means. We appreciate your
              cooperation with our Packaging Guidelines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PackingInstruction;
