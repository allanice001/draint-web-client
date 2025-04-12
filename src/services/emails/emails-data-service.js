export const getTemplateData = (data) => {
  if (data.using_template) {
    const  parse_data = JSON.parse(data.message)
    return {
      template: parse_data.template_name,
      id: parse_data.template_id,
      attachments: parse_data.attachments,
      recipients: data.contacts,
      profile_id: data.profile_id,
      subject: data.subject,
      message: '',
    }
  }
  return {
    template: 'welcome-contact-new',
    id: null,
    attachments: {},
    message: data.message,
    subject: data.subject,
    recipients: data.contacts,
    profile_id: data.profile_id,
    name: data.contacts[0].name,
  }
}
