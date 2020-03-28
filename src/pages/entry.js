/** @jsx jsx */
import { jsx } from '@emotion/core';
import { css } from '@emotion/core';
import { Fragment } from 'react';
import { Color, Space } from 'lib/theme';
import Anchor from 'components/Anchor';
import Box from 'components/Box';
import LargeHeader from 'components/Header/LargeHeader';
import ListLink from 'components/ListLink';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { textStyles } from 'components/Text/Text.styles';
import Routes from 'constants/routes';

const styles = {
  box: css({
    height: 'auto',
    paddingTop: 0,
  }),
  text: css({
    color: Color.GRAY_75,
  }),
  titleAndText: css({
    marginTop: `${Space.S50}px`,
    paddingRight: '20px',
  }),
  title: css({
    marginBottom: `${Space.S20}px`,
  }),
};

function EntryPortal() {
  return (
    <Fragment>
      <LargeHeader />
      <Box css={styles.box}>
        <ListLink
          href={Routes.REQUEST_SERVICES}
          title="Need services"
          text="Support for myself so I can keep working"
        />
        <ListLink
          href={Routes.REQUEST_SUPPLIES}
          title="Need supplies"
          text="Items for use in the facility where I work"
        />
        <div css={styles.titleAndText}>
          <Text css={styles.title} as="h3" type={TEXT_TYPE.HEADER_4}>
            You need support and supplies to keep fighting the coronavirus. We
            help you communicate your needs to people who can help.
          </Text>
          <Text css={styles.text} as="p" type={TEXT_TYPE.BODY_2}>
            Our platform gives a real-time view of the immediate needs of
            healthcare workers. We provide this information to the organizations
            of paid workers and volunteers that are ready and able to help.
          </Text>
          <Text css={styles.text} as="p" type={TEXT_TYPE.BODY_2}>
            Want to know more about who we’re working with, or have supplies or
            services you want to donate?
          </Text>
        </div>
        <Anchor href={Routes.FAQ} withIcon>
          <Text css={textStyles.BOLD} type={TEXT_TYPE.BODY_2}>
            Learn more
          </Text>
        </Anchor>
      </Box>
    </Fragment>
  );
}

export default EntryPortal;
