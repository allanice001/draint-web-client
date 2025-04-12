import Icons from 'components/icons';

export const MODAL_TOPIC_CONTENT = {
  headerDialog: 'Do you really want to delete a topic?',
  titleDialog: 'The topic with all questions will be deleted permanently',
  buttonConfirmValue: 'Confirm',
  buttonRejectValue: 'Cancel',
};

export const MODAL_QUESTION_CONTENT = {
  headerDialog: 'Do you really want to delete a question?',
  titleDialog: 'The question will be deleted permanently',
  buttonConfirmValue: 'Confirm',
  buttonRejectValue: 'Cancel',
};

export const ICONS = [
  Icons.Palette({ fill: '#806BFF', width: '34px', height: '34px' }),
  Icons.Artwork({ fill: '#806BFF', width: '34px', height: '34px' }),
  Icons.DashboardOrders({ fill: '#806BFF', width: '34px', height: '34px' }),
  Icons.DashboardSales({ fill: '#806BFF', width: '34px', height: '34px' }),
];

export const plusIcon = Icons.PlusSmall;

export const validationMaxValue = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const categoryValidation = {
  descriptionMaxLength: validationMaxValue(85),
  titleMaxLength: validationMaxValue(50),
};

export const FAQ_PAGE_META_HELMET_SCRIPT = [
  {
    type: 'application/ld+json',
    innerHTML: `{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
       mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I change my profile information?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'To change your profile information, please visit your profile settings under https://draint.art/dashboard/settings ' +
              "and change the information. Please, don't forget to click ''Save'' after you're done, so nothing will get lost.",
          },
        },
        {
          '@type': 'Question',
          name: "I can't change my information, what now?",
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              "If you can't change your information, please make sure that you click on ''Save'' before leaving the page. " +
              'If an error appears while saving, please contact our support team and we will help you personally!',
          },
        },
        {
          '@type': 'Question',
          name: 'How to delete my account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              "To delete your account, please visit your profile settings under https://draint.art/dashboard/settings - scroll down to ''Delete account''. " +
              'You will enter a 30 day waiting period during which your account will be hidden, and you will be given an opportunity ' +
              'to withdraw the decision and reactivate your account by logging in. After 30 days your account will be permanently deleted.',
          },
        },
      ],
    }`,
  },
];
