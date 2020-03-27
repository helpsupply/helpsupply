/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { TEXT_TYPE } from './Text/constants';
import Text from './Text';
import { PrimaryButton, SecondaryButton } from './Button';
import InputText from './InputText';
import Autosuggest from './Autosuggest';
import TextArea from './TextArea';
import Anchor from './Anchor';
import InputDropdown from './InputDropdown';
import Card from './Card';
import Request from './Request';

class StyleGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: [],
    };
  }

  componentDidMount() {
    this.props.backend.listDropSites().then((data) => {
      const facilities = data.map((facility) => ({
        name: facility.dropSiteName,
        address: facility.dropSiteAddress,
        id: facility.id,
      }));
      this.setState({ facilities });
    });
  }

  render() {
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
          Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean at nunc faucibus neque finibus ultrices a non risus.
        </Text>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean at nunc faucibus neque finibus ultrices a non risus.
        </Text>
        <Text as="p" type={TEXT_TYPE.NOTE}>
          Note. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          at nunc faucibus neque finibus ultrices a non risus.
        </Text>
        <Anchor href="/">Anchor Link</Anchor>
        <hr />
        <div css={{ width: 500, '> div': { marginBottom: 10 } }}>
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
        <div css={{ width: 500, '> div': { marginBottom: 15 } }}>
          <div>
            <InputText label="Label" />
          </div>
          <div>
            <Autosuggest
              label="City or medical facility"
              suggestions={this.state.facilities}
            />
          </div>
          <div>
            <InputDropdown
              placeholder="Select supply type"
              options={[
                { label: 'Foo', value: 'foo' },
                { label: 'Bar', value: 'bar' },
              ]}
            />
          </div>
          <div>
            <TextArea label="i.e.: All donated items must be unused and sealed in original packaging." />
          </div>
        </div>
        <hr />
        <Card
          onClick={() => false}
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
            request="1750"
          />
          <Request
            date="2020-03-26T05:31:40.665Z"
            donation="400"
            id="1454"
            name="Surgical Masks"
            onDelete={() => false}
            request="800"
          />
        </div>
      </div>
    );
  }
}

export default StyleGuide;
