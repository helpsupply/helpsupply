/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback } from 'react';
import { Routes } from 'constants/Routes';
import { useTranslation } from 'react-i18next';
import { useForm, FormContext } from 'react-hook-form';

import Anchor from '../Anchor';
import { PrimaryButton, SecondaryButton } from '../Button';
import Card from '../Card';
import InputDate from '../InputDate';
import InputDropdown from '../InputDropdown';
import InputText from '../InputText/InputText';
import Request from '../Request';
import Text from '../Text';
import { TEXT_TYPE } from '../Text/constants';
import TextArea from '../TextArea';

function StyleGuide() {
  const { t } = useTranslation();
  const methods = useForm({
    mode: ['onChange'],
  });

  const handleSubmit = useCallback((e) => {
    console.log('test submit', e);
  }, []);

  return (
    <div
      css={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '1em',
      }}
    >
      <h1>Style Guide</h1>

      <hr />

      <Text as="h1" type={TEXT_TYPE.HEADER_1}>
        Header 1
      </Text>
      <Text as="h2" type={TEXT_TYPE.HEADER_2}>
        Header 2
      </Text>
      <Text as="h3" type={TEXT_TYPE.HEADER_3}>
        Header 3
      </Text>
      <Text as="h4" type={TEXT_TYPE.HEADER_4}>
        Header 4
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_1}>
        Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        at nunc faucibus neque finibus ultrices a non risus.
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        at nunc faucibus neque finibus ultrices a non risus.
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE}>
        Note. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at
        nunc faucibus neque finibus ultrices a non risus.
      </Text>
      <Anchor href={Routes.HOME}>Anchor Link</Anchor>

      <hr />

      <div css={{ '> div': { marginBottom: 10 } }}>
        <div>
          <PrimaryButton onClick={() => false}>
            <Text>Primary Button</Text>
          </PrimaryButton>
        </div>

        <div>
          <PrimaryButton disabled onClick={() => false}>
            <Text>Primary Button Disabled</Text>
          </PrimaryButton>
        </div>

        <div>
          <SecondaryButton onClick={() => false}>
            <Text type={TEXT_TYPE.NOTE}>Secondary Button</Text>
          </SecondaryButton>
        </div>

        <div>
          <SecondaryButton disabled onClick={() => false}>
            <Text type={TEXT_TYPE.NOTE}>Secondary Button Disabled</Text>
          </SecondaryButton>
        </div>
      </div>

      <hr />

      <div css={{ '> div': { marginBottom: 15 } }}>
        <div>
          <InputText label="Label" name="example" />
        </div>

        <div>
          <InputDropdown
            name="example"
            label="Select supply type"
            options={[
              { label: 'Foo', value: 'foo' },
              { label: 'Bar', value: 'bar' },
            ]}
          />
        </div>

        <div>
          <hr />
          <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <InputDate
                name="example date"
                label={t('global.form.daypicker.placeholder')}
              />
              <button type="submit">test submit</button>
            </form>
          </FormContext>
          <hr />
        </div>

        <div>
          <TextArea label="i.e.: All donated items must be unused and sealed in original packaging." />
        </div>
      </div>

      <hr />

      <Card
        onClick={() => false}
        editLabel="Edit"
        label="Donation requirements"
        details="Unused, in original packaging"
      />

      <div
        css={{
          padding: '20px 10px',
          background: '#F5F5F5',
        }}
      >
        <Request
          date="2020-03-26T05:31:40.665Z"
          donation="0"
          id="1454"
          name="N95 Masks"
          onDelete={() => false}
          requestQuantity="1750"
          requestTitle="example"
        />
        <Request
          date="2020-03-26T05:31:40.665Z"
          donation="400"
          id="1454"
          name="Surgical Masks"
          onDelete={() => false}
          requestQuantity="800"
          requestTitle="example"
        />
      </div>
    </div>
  );
}

export default StyleGuide;
