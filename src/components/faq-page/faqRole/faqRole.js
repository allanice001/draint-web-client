import * as Button from 'components/shared/button';

import EditIcon from '@material-ui/icons/Edit';
import FaqForm from '../faqForm/faq-form';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { RoleItem } from './roleItem';
import { categoryValidation } from '../../../constants/components/faq-page';
import classnames from 'classnames';
import { useStyles } from './faqRoleStyles';
import useTheme from 'hooks/use-theme';

export const FaqRole = props => {
  const {
    isEditorOrAdmin,
    categories,
    icons,
    faqCategory,
    masterView,
    onCategoryMasterClick,
    onEditCategoryClick,
    editMode,
    onCancelEditClick,
    onAcceptEditClick,
  } = props;
  const { isMobile } = useTheme();

  const classes = useStyles();

  const dynamicClass = (fistStyle, secondStyle, title) =>
    classnames(fistStyle, { [secondStyle]: faqCategory === title });

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {!masterView ? (
          <>
            <div className={classes.titleBlock}>
              <span>How can we help you?</span>
            </div>
            {isMobile && <p className="subtitle-1">Select category</p>}
          </>
        ) : null}
        <ul className={classes.roleList}>
          {categories.map((item, index) => (
            <li key={item.id} className={classes.block}>
              {!masterView ? (
                <NavLink
                  to={`/faq/${item.title}`}
                  onClick={() => onCategoryMasterClick(item)}
                >
                  <RoleItem
                    item={item}
                    icon={icons[index]}
                    classBlock={dynamicClass(
                      classes.roleItem,
                      classes.activeRoleItem,
                      item.title
                    )}
                    classIcon={classes.icons}
                    classTitle={classes.roleTitle}
                    classDescription={classes.roleDescription}
                  />
                </NavLink>
              ) : (
                <>
                  {editMode === item.id ? (
                    <div className={classes.formContainer}>
                      <FaqForm
                        name="category"
                        initialValues={{
                          category: item.title,
                          description: item.description,
                        }}
                        secondName="description"
                        area
                        editRole
                        className={classes.form}
                        fieldClass={classes.formInput}
                        onCancelEditClick={onCancelEditClick}
                        onAcceptClick={onAcceptEditClick}
                        secondFieldValidate={
                          categoryValidation.descriptionMaxLength
                        }
                        firstFieldValidate={categoryValidation.titleMaxLength}
                      />
                    </div>
                  ) : (
                    <div className={classes.masterCategory}>
                      <RoleItem
                        item={item}
                        icon={icons[index]}
                        classBlock={dynamicClass(
                          classes.roleItem,
                          classes.activeRoleItem,
                          item.title
                        )}
                        classIcon={classes.icons}
                        classTitle={classes.roleTitle}
                        classDescription={classes.roleDescription}
                        classEditIcon={classes.editIcon}
                        editIcon={true}
                        onEditClick={onEditCategoryClick}
                        onClick={() => onCategoryMasterClick(item)}
                      />
                      {isEditorOrAdmin && (
                        <Button.Warning
                          className={classes.editIcon}
                          xs
                          icon={<EditIcon />}
                          onClick={() => onEditCategoryClick(item.id)}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
