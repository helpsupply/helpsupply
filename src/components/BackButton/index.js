/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';

import { IconButton } from 'components/Button';

import { ReactComponent as Back } from 'static/icons/back-circle.svg';

import styles from './BackButton.styles';

const goBack = ({ history }) => () => {
  if (history.length > 1) {
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
