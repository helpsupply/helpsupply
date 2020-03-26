import moment from 'moment'

// Format incoming date
export const formatDate = (date) => {
  const momentDate = date ? moment(date) : moment()
  return momentDate.format('MMM D, h:mm a')
}
