// import React from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// // import { Button } from '@material-ui/core';
// import { Spinner } from 'components/loader/spinner-loader/spinner';
// // import textFormComponent from '../fields/textFields';
// import { required } from '../validators';
// import { isoCountries as countries } from '../../countries/list';
// // import selectCountryField from '../fields/selectorCountryField';
// import radioButtonsComponent from '../fields/radioBtnField';
//
// import Input from '../input/input';
// import Select from '../select/select';
//
// import styles from '../../../views/dashboard/settings/form.module.scss';
//
// let AccountProfStatusForm = (props) => {
//   const { Form, handleSubmit, disabled = false } = props;
//   if (!Form) return <Spinner />;
//   const { syncErrors, anyTouched } = Form;
//   const isError = syncErrors && Object.keys(syncErrors).length;
//   const handleBtnDisabled = !anyTouched || isError;
//   const isStatus = !Form.values
//     || !Form.values.is_employee
//     || Form.values.is_employee === 'false';
//   return (
//     <section className={styles.section}>
//       <h3 className={`group-title ${styles.title}`}>
//         Your Professional Status
//       </h3>
//
//       <form className="password-change" onSubmit={handleSubmit}>
//         <Field
//           name="is_employee"
//           component={radioButtonsComponent}
//           validate={required}
//           disabled={disabled}
//           className={styles.form__field}
//           buttons={[
//             {
//               value: 'false',
//               label: 'Hobby Artist',
//             },
//             {
//               value: 'true',
//               label: 'Registered Artist',
//             },
//           ]}
//         />
//         <Field
//           name="legal_name"
//           component={Input}
//           className={styles.form__field}
//           validate={!isStatus && required}
//           label="Company"
//           disabled={isStatus || disabled}
//         />
//         <Field
//           name="vat"
//           component={Input}
//           className={styles.form__field}
//           validate={!isStatus && required}
//           label="VAT"
//           disabled={isStatus || disabled}
//         />
//         <Field
//           name="country"
//           component={Select}
//           className={styles.form__field}
//           validate={!isStatus && required}
//           label="Country"
//           disabled={isStatus || disabled}
//           list={countries.map(country => ({ label: country.name, value: country.ccode }))}
//         />
//         <div className={styles.form__footer}>
//           <button
//             className={`primary-button ${styles.form__button}`}
//             type="submit"
//             disabled={handleBtnDisabled}
//           >
//             Change
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };
//
// AccountProfStatusForm = reduxForm({
//   form: 'accountProfStatusForm',
//   destroyOnUnmount: false,
// })(AccountProfStatusForm);
//
// function mapStateToProps(store) {
//   if (store.dashboard.settings.account) {
//     return {
//       Form: store.form.accountProfStatusForm,
//       enableReinitialize: true,
//       initialValues: {
//         ...store.dashboard.settings.account,
//       },
//     };
//   }
//   return {};
// }
//
// export default AccountProfStatusForm = connect(mapStateToProps)(
//   AccountProfStatusForm,
// );
