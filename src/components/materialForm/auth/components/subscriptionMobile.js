// import {
//   FormControl,
//   FormHelperText,
//   MenuItem,
//   Select,
// } from '@material-ui/core';
// import React from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import TextField from '@material-ui/core/TextField';
// import ModalPricing from '../layout/modal';
// import { plans } from '../../../../views/website/pricing/mockPricing';
// import StripeForm from '../../stripeForm/stripeForm';
// import SelectPaymentSystem from './selectPaymentSystem';
//
// const TEST = 'ff7b3bf0-2a82-4437-9672-64fc661ea1a7';
// // const TEST_NAME = 'Test';
// // const BASIC_NAME = 'Basic';
// // const ALL_IN_ONE_NAME = 'All-In-One';
// const PAYMENT_SYSTEM = 'PayPal';
//
// export default function subscriptionMobile(props) {
//   const {
//     subscription, selectedPlan, handleStripePlanSubscription, paymentSystem, handleEmailChange, emailInput,
//     handlePayPalPlanSubscription, load, invalidEmail, checkEmptyEmail, disableSubscribe, handlePaymentSystem,
//   } = props;
//   return (
//     <>
//       <div>
//         <SelectPaymentSystem
//           paymentSystem={paymentSystem}
//           handlePaymentSystem={handlePaymentSystem}
//         />
//       </div>
//       <div className="form-tools">
//         <FormControl variant="outlined" disabled={props.disabledSubscribeButton}>
//           {/* <InputLabel htmlFor="last_name">Subscription Plan</InputLabel> */}
//           {paymentSystem === PAYMENT_SYSTEM ? (
//             <Select
//               labelId="subscription_plan"
//               id="subscription_plan"
//               value={selectedPlan}
//               onChange={props.handleChangePlan}
//             >
//               <MenuItem value={subscription[0].id}>{subscription[0].name}</MenuItem>
//               <MenuItem value={subscription[2].id}>{subscription[2].name}</MenuItem>
//             </Select>
//           ) : (
//             <Select
//               labelId="subscription_plan"
//               id="subscription_plan"
//               value={selectedPlan}
//               onChange={props.handleChangePlan}
//             >
//               <MenuItem value={subscription[0].id}>{subscription[0].name}</MenuItem>
//               <MenuItem value={subscription[1].id}>{subscription[1].name}</MenuItem>
//               <MenuItem value={subscription[2].id}>{subscription[2].name}</MenuItem>
//             </Select>
//           )}
//           {selectedPlan !== TEST
//             ? (
//               <div>
//                 <FormHelperText id="subscription_plan_helper" style={{ fontSize: '12px' }}>
//                   <span style={{ display: 'flex', flexDirection: 'row' }}>
//                     <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.66' }}>
//                       <span style={{
//                         textAlign: 'start',
//                         fontSize: '12px',
//                         fontWeight: 800,
//                         color: '#8CC57D',
//                       }}
//                       >Sell your artworks...
//                       </span>
//                       <span style={{
//                         textAlign: 'start',
//                         fontSize: '12px',
//                         fontWeight: 800,
//                         color: '#707070',
//                       }}
//                       >CreditCard needed
//                       </span>
//                     </span>
//                     <span style={{ textAlign: 'end', width: '15%' }}>
//                       <ModalPricing plan={plans.find(el => el.id === selectedPlan)} />
//                     </span>
//                   </span>
//                 </FormHelperText>
//               </div>
//             )
//             : (
//               <div>
//                 <FormHelperText id="subscription_plan_helper" style={{ fontSize: '12px' }}>
//                   <span style={{ display: 'flex', flexDirection: 'row' }}>
//                     <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.66' }}>
//                       <span style={{
//                         textAlign: 'start',
//                         fontSize: '12px',
//                         fontWeight: 800,
//                         color: '#d66f6f',
//                       }}
//                       >Can&apos;t sell your artworks
//                       </span>
//                     </span>
//                     <span style={{ textAlign: 'end', width: '15%' }}>
//                       <ModalPricing plan={plans[0]} />
//                     </span>
//                   </span>
//                 </FormHelperText>
//               </div>
//             )}
//         </FormControl>
//         { (selectedPlan !== TEST && paymentSystem !== PAYMENT_SYSTEM)
//             && (
//               <>
//                 <StripeForm ref={props.stripeForm} />
//                 <FormControl variant="outlined" className="country-form">
//                   {load ? (
//                     <button
//                       type="button"
//                       variant="contained"
//                       color="primary"
//                       className="primary-button"
//                       onClick={handleStripePlanSubscription}
//                       disabled={props.disabledSubscribeButton}
//                     >
//                       <CircularProgress
//                         size={16}
//                         style={{ marginTop: '5px', color: 'white' }}
//                       />
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       variant="contained"
//                       color="primary"
//                       className="primary-button"
//                       onClick={handleStripePlanSubscription}
//                       disabled={props.disabledSubscribeButton}
//                     >
//                       Subscribe
//                     </button>
//                   )}
//                 </FormControl>
//               </>
//             )
//           }
//         { (selectedPlan !== TEST && paymentSystem === PAYMENT_SYSTEM)
//         && (
//           <>
//             <FormControl variant="outlined" className="country-form">
//               <div className="paypal-input-email-wrapper">
//                 <TextField
//                   className="paypal-email-input"
//                   error={invalidEmail}
//                   fullWidth
//                   id="paypal-email-helper-text"
//                   placeholder="PayPal Account Email"
//                   value={emailInput}
//                   onChange={handleEmailChange}
//                   onBlur={checkEmptyEmail}
//                   helperText={invalidEmail ? 'You have entered an invalid email address!'
//                     : 'Enter You PayPal Account Email'}
//                   variant="outlined"
//                 />
//               </div>
//               {load ? (
//                 <button
//                   type="button"
//                   variant="contained"
//                   color="primary"
//                   className="primary-button"
//                   onClick={handlePayPalPlanSubscription}
//                   disabled={props.disabledSubscribeButton || disableSubscribe}
//                 >
//                   <CircularProgress
//                     size={16}
//                     style={{ marginTop: '5px', color: 'white' }}
//                   />
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   variant="contained"
//                   color="primary"
//                   className="primary-button"
//                   onClick={handlePayPalPlanSubscription}
//                   disabled={props.disabledSubscribeButton || disableSubscribe}
//                 >
//                   Subscribe
//                 </button>
//               )}
//             </FormControl>
//           </>
//         )
//         }
//       </div>
//     </>
//   );
// }
