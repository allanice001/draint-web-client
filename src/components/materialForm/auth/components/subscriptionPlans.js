// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { plans, features } from '../../../../views/website/pricing/mockPricing';
// import PlansList from '../../../pricing/layouts/plansList';
// import ModalSubscribeDialog from './modalSubscribeDialog';
// import SubscriptionMobile from './subscriptionMobile';
// import displayMessage from '../../../../redux/global/notiifcation/actions/displayMessage';
// import Icons from '../../../icons';
// import styles from './subscriptionPlans.module.scss';
//
// const TEST_NAME = 'Test';
//
// class SubscriptionPlans extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       windowWidth: window.innerWidth,
//     };
//   }
//
//   async componentDidMount() {
//     window.addEventListener('resize', this.handleResize);
//   }
//
//   componentWillUnmount = () => {
//     window.removeEventListener('resize', this.handleResize);
//   };
//
//   handleConfirmButton = async () => {
//     const { props } = this;
//     const stripe = props.checkedPlan === TEST_NAME
//       ? {}
//       : await props.stripeForm.current.cardForm.current.wrappedInstance.handleSubmit();
//     if (stripe.error) {
//       props.displayMessage(stripe.error.message, 'error');
//     } else {
//       await props.handleStripePlanSubscription(stripe);
//       props.redirectUser();
//     }
//   };
//
//   handleChangePlan = (event) => {
//     const { props } = this;
//     props.handleChangePlan(event.target.value);
//   };
//
//   handleResize = () => {
//     this.setState({ windowWidth: window.innerWidth });
//   };
//
//   render() {
//     const {
//       subscription,
//       selectedPlan,
//       handleChangeUserCountry,
//       country,
//       artistFlag,
//       alternateView,
//       handleEmailChange,
//       checked,
//       handleChecked,
//       subscriptionPlans,
//       countries,
//       user,
//       paymentSystem,
//       emailInput,
//       invalidEmail,
//       handlePaymentSystem,
//       handlePayPalPlanSubscription,
//       load,
//       checkEmptyEmail,
//       disableSubscribe,
//       subscribedPlan,
//       isArtist,
//       handleOpenSubscribeModal,
//       handleCloseSubscribeModal,
//       openModal,
//       checkedPlan,
//     } = this.props;
//     const { windowWidth } = this.state;
//     return (
//       <>
//         {windowWidth > 1000 && !alternateView && (
//           <div className={styles.desktop}>
//             <div className={styles.header}>
//               <div className={styles.header__card}>
//                 <div className={`${styles.lead} ${styles.lead__desktop}`}>
//                   <p>
//                     Thousands of artists manage their online appearance with
//                     Draint already.
//                   </p>
//                   <p>Happy you join us as well!</p>
//                 </div>
//
//                 <div className={styles.toggle}>
//                   <button
//                     type="button"
//                     className={`${styles.active} ${styles.toggle__button}`}
//                   >
//                     Monthly
//                   </button>
//                   <button type="button" className={styles.toggle__button}>
//                     Yearly
//                   </button>
//                 </div>
//               </div>
//
//               {plans.map(plan => (
//                 <PlansList
//                   load={load}
//                   features={features}
//                   loadSize={15}
//                   plan={plan}
//                   user={user}
//                   key={plan.name}
//                   subscribedPlan={subscribedPlan}
//                   handleOpenSubscribeModal={handleOpenSubscribeModal}
//                   isArtist={isArtist}
//                 />
//               ))}
//             </div>
//
//             <div className={styles.body}>
//               {features.map((name, i) => (
//                 <div className={styles.row} key={i}>
//                   <div className={styles.name}>{name}</div>
//                   <div className={styles.cell}>
//                     <Icons.CheckCircle
//                       className={plans[0].features[i] ? '' : styles.disabled}
//                     />
//                   </div>
//                   <div className={styles.cell}>
//                     <Icons.CheckCircle
//                       className={plans[1].features[i] ? '' : styles.disabled}
//                     />
//                   </div>
//                   <div className={styles.cell}>
//                     <Icons.CheckCircle
//                       className={plans[2].features[i] ? '' : styles.disabled}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         {(windowWidth < 1000 || alternateView) && (
//           <SubscriptionMobile
//             handleEmailChange={handleEmailChange}
//             emailInput={emailInput}
//             invalidEmail={invalidEmail}
//             checkEmptyEmail={checkEmptyEmail}
//             disableSubscribe={disableSubscribe}
//             load={load}
//             handlePayPalPlanSubscription={handlePayPalPlanSubscription}
//             paymentSystem={paymentSystem}
//             handlePaymentSystem={handlePaymentSystem}
//             subscription={subscription}
//             selectedPlan={selectedPlan}
//             subscriptionPlans={subscriptionPlans}
//             artistFlag={artistFlag}
//             handleChecked={handleChecked}
//             checked={checked}
//             alternateView={alternateView}
//             country={country}
//             countries={countries}
//             handleChangeUserCountry={handleChangeUserCountry}
//             handleChangePlan={this.handleChangePlan}
//             stripeForm={this.props.stripeForm}
//             handleStripePlanSubscription={this.handleConfirmButton}
//             disabledSubscribeButton={this.props.disabledSubscribeButton}
//           />
//         )}
//         <ModalSubscribeDialog
//           load={load}
//           handleEmailChange={handleEmailChange}
//           emailInput={emailInput}
//           invalidEmail={invalidEmail}
//           checkEmptyEmail={checkEmptyEmail}
//           disableSubscribe={disableSubscribe}
//           handlePaymentSystem={handlePaymentSystem}
//           handlePayPalPlanSubscription={handlePayPalPlanSubscription}
//           paymentSystem={paymentSystem}
//           open={openModal}
//           subscribedPlan={checkedPlan}
//           handleCloseSubscribeModal={handleCloseSubscribeModal}
//           handleChangeUserCountry={handleChangeUserCountry}
//           handleStripePlanSubscription={this.handleConfirmButton}
//           stripeForm={this.props.stripeForm}
//         />
//       </>
//     );
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       displayMessage,
//     },
//     dispatch,
//   );
// }
//
// export default connect(null, mapDispatchToProps)(SubscriptionPlans);
