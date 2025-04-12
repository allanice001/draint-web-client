import axios from '../axiosInstance';

export const getInterview = profileId => axios.get('api/about/interview', { params: { profileId } });

export const getProfilesData = params => axios.get('api/about/interview/profile',  { params });

export const getQuestions = () => axios.get('api/about/interview/questions');

export const getInterviewPhoto = profileId => axios.get('api/about/interview/photo', { params: { profileId } });

export const saveInterview = (profileId, form) => axios.post('api/about/interview', { profileId, form });

export const createQuestion = (title) => axios.post('api/about/interview/create-question', { title });

export const editQuestion = (questionId, title) => axios.put('api/about/interview/update-question', { questionId, title });

export const deleteQuestion = (questionId) => axios.delete('api/about/interview/delete-question', { data: { questionId } });

export const updatePhoto = (profileId, src) => axios.put('api/about/interview/update-photo/', { profileId, src });
