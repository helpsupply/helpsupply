/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants';

import { IconButton } from 'components/Button';

import { ReactComponent as Back } from 'static/icons/back-circle.svg';

import styles from './BackButton.styles';

const goBack = ({ history }) => () => {
  const { host } = window.location;
  const { referrer } = document;

  if (history.length > 1 && referrer && referrer.includes(host)) {
    history.goBack();
  } else {
    history.push(Routes.HOME);
  }
};

const BackButton = ({ onClick }) => {
  const history = useHistory();

  return (
    <div css={styles.root}>
      <IconButton onClick={onClick || goBack({ history })}>
        <Back />
      </IconButton>
    </div>
  );
};

export default BackButton;
