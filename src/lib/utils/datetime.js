import moment from 'moment';

// Format incoming date
export const formatDate = (date) => {
  const momentDate = date ? moment(new Date(date)) : moment();
  return momentDate.format('MMM D, h:mma');
};

// Format service date
export const formatServiceDate = (date) => {
  const momentDate = date ? moment(new Date(date)) : moment();
  return momentDate.format('dddd MMMM wo');
};
