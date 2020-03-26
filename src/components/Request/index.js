/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { formatDate } from 'lib/utils/datetime'
import { numberWithCommas } from 'lib/utils/number'
import { SecondaryButton } from 'components/Button'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import { styles } from './Request.styles'
import Note from 'components/Note'

export const Request = ({ date, donation, id, name, onDelete, request }) => {
  const numberDonation = +donation
  const numberRequest = +request
  const progress = (numberDonation / numberRequest) * 100
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Note>Request ID #{id}</Note>
        <SecondaryButton onDelete={onDelete}>
          <Text type={TEXT_TYPE.NOTE}>Delete</Text>
        </SecondaryButton>
      </div>
      <div css={styles.requestName}>
        <Text>{name}</Text>{' '}
        <Text css={styles.amount}>{numberWithCommas(numberRequest)}</Text>
      </div>
      <div css={[styles.section, styles.progressInfo]}>
        <Note>
          {progress ? `${numberDonation} donations` : 'No donations yet'}
        </Note>
        <Note>{progress}% Completed</Note>
      </div>
      <div css={styles.progressBar}>
        <div css={[styles.progress, { width: `${progress}%` }]} />
      </div>
      <Note css={styles.date}>Added {formatDate(date)}</Note>
    </div>
  )
}

Request.propTypes = {
  date: PropTypes.string.isRequired,
  donation: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  request: PropTypes.string.isRequired,
}

export default Request
