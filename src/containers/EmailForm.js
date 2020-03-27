/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import Form from 'components/Form';
import FormGroup from 'components/Form/FormGroup';
import InputText from 'components/InputText';
import Note from 'components/Note';
import Anchor from 'components/Anchor';
import HeaderInfo from 'components/Form/HeaderInfo';

function EmailForm({ backend, match }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [dropsite, setDropsite] = useState(match.params.dropsite);

  useEffect(() => {
    setDropsite(match.params.dropsite);
  }, [match.params.dropsite]);

  const handleSubmit = (event) => {
    event.preventDefault();
    backend
      .signupWithEmail(email, dropsite)
      .then(() => {
        setSent(true);
      })
      .catch(alert);
    // TODO: handle exceptions
  };

  if (sent) {
    return (
      <HeaderInfo
        title="Thank you"
        description="We just sent you an email with a link to verify your email. It should arrive within a couple minutes."
      />
    );
  }

  return (
    <Form
      onSubmit={handleSubmit}
      title="Enter your work email address"
      description="We need to verify your email before you request supplies."
      disabled={!email}
    >
      <FormGroup mb={20}>
        <InputText label="Work email" customOnChange={setEmail} />
      </FormGroup>
      <Note>
        Note: we will never share your email address with any other parties.{' '}
        <Anchor href="/">Learn more</Anchor>
      </Note>
    </Form>
  );
}

export default EmailForm;
