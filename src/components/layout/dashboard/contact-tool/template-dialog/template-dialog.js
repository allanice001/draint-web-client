import React, { useEffect, useState } from 'react';

import BasicModal from 'components/basic-modal/basic-modal';
import classNames from 'classnames';
import { getTemplates } from 'dataLayer/contact-tool/contact-tool';
import staticUrls from 'constants/images/static-urls';
import styles from './template-dialog.module.scss';

const TemplateItem = ({
  src = staticUrls.image.template,
  title,
  selectTemplate,
  id,
  active = 0,
  disabled,
}) => {
  const onClickAction = () => {
    if (!disabled) {
      selectTemplate(id);
    }
  };

  const itemClass = classNames(styles.template_item, {
    [styles.active_template_item]: id === active,
    [styles.disabled_template_item]: disabled,
  });

  return (
    <div className={itemClass} onClick={onClickAction}>
      <img alt="template" className={styles.item_image} src={src} />
      <div className={styles.item_title}>{title}</div>
    </div>
  );
};

const TemplateDialog = ({ handleClose, open, handleSetTemplate }) => {
  const [step] = useState(0);
  const [template, setTemplate] = useState(0);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getTemplates().then(res => {
      setTemplates([...res.data]);
      setTemplate(res.data[0].id);
    });
  }, []);

  const selectTemplate = id => {
    setTemplate(id);
  };

  const chooseTemplateContent = () => (
    <div className={styles.choose_template}>
      {templates.map((el, index) => (
        <TemplateItem
          key={`template-items-${index}`}
          title={el.settings.title}
          id={el.id}
          selectTemplate={selectTemplate}
          active={template}
          disabled={el.disabled}
        />
      ))}
    </div>
  );

  const chooseTemplateFooter = () => (
    <button
      type="button"
      onClick={() => {
        const choseTemplate = templates.filter(val => val.id === template);
        handleSetTemplate(choseTemplate[0]);
        handleClose();
      }}
      className="primary-button"
    >
      Confirm Template
    </button>
  );

  const content = [chooseTemplateContent];
  const footer = [chooseTemplateFooter];

  const StepperContent = ({ step }) => content[step]();
  const StepperFooter = ({ step }) => (
    <div className={styles.choose_template_footer}>{footer[step]()}</div>
  );

  return (
    <BasicModal
      title="Choose template"
      isOpen={open}
      handleClose={handleClose}
      customWidth={styles.maxWidth}
      footer={<StepperFooter step={step} />}
    >
      <div className={styles.template_content}>
        <StepperContent step={step} />
      </div>
    </BasicModal>
  );
};

export default TemplateDialog;
