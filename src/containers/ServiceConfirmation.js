/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';

import { PrimaryButton } from 'components/Button';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

function ServiceConfirmation() {
  const history = useHistory();

  const handleSubmit = () => {
    history.push(Routes.DASHBOARD);
  };

  return (
    <Fragment>
      <Text>We have your request</Text>
      <PrimaryButton type="submit" onClick={handleSubmit}>
        <Text type={TEXT_TYPE.BODY_1}>View my requests</Text>
      </PrimaryButton>
    </Fragment>
  );
}

export default ServiceConfirmation;
