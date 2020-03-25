/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { formatDate } from 'lib/utils/datetime'
import { numberWithCommas } from 'lib/utils/number'
import { SecondaryButton } from 'components/Button'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import { styles } from './Request.styles'

export const Request = ({ date, donation, id, name, onDelete, request }) => {
  const numberDonation = +donation
  const numberRequest = +request
  const progress = (numberDonation / numberRequest) * 100
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Text as="p" type={TEXT_TYPE.CONTENT}>
          Request ID #{id}
        </Text>
        <SecondaryButton onDelete={onDelete}>
          <Text type={TEXT_TYPE.NOTE}>Delete</Text>
        </SecondaryButton>
      </div>
      <div css={styles.requestName}>
        <Text>{name}</Text>{' '}
        <Text css={styles.amount}>{numberWithCommas(numberRequest)}</Text>
      </div>
      <div css={[styles.section, styles.progressInfo]}>
        <Text type={TEXT_TYPE.CONTENT}>
          {progress ? `${numberDonation} donations` : 'No donations yet'}
        </Text>
        <Text type={TEXT_TYPE.CONTENT}>{progress}% Completed</Text>
      </div>
      <div css={styles.progressBar}>
        <div css={[styles.progress, { width: `${progress}%` }]} />
      </div>
      <Text as="p" type={TEXT_TYPE.CONTENT} css={styles.date}>
        Added {formatDate(date)}
      </Text>
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
