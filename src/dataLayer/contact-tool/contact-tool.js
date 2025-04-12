import axios from '../axiosInstance';

export const getTemplates = () => axios.get('/api/contacts/template');

export const confirmContactToolSubscription = (id, secret, type) => axios.post(
  '/api/contacts/newsletter',
  { id, secret, type },
);

export const deleteContact = id => axios.delete('/api/contacts/contact', { params: { id } });

export const deleteMessage = id => axios.delete('/api/contacts/message', { params: { id } });
