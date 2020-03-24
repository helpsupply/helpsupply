/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import Text from './Text'
import Anchor from './Anchor'
import InputText from './InputText'
import { PrimaryButton, SecondaryButton } from './Button'
import { TEXT_TYPE } from './Text/Text.styles'

class StyleGuide extends React.Component {
  render() {
    return (
      <div
        css={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '1em',
        }}>
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
            <PrimaryButton>
              <Text>Primary Button</Text>
            </PrimaryButton>
          </div>
          <div>
            <PrimaryButton disabled>
              <Text>Primary Button Disabled</Text>
            </PrimaryButton>
          </div>
          <div>
            <SecondaryButton>
              <Text type={TEXT_TYPE.NOTE}>Secondary Button</Text>
            </SecondaryButton>
          </div>
          <div>
            <SecondaryButton disabled>
              <Text type={TEXT_TYPE.NOTE}>Secondary Button Disabled</Text>
            </SecondaryButton>
          </div>
        </div>
        <hr />
        <div css={{ width: 500, '> div': { marginBottom: 10 } }}>
          <div>
            <InputText label="Label" />
          </div>
        </div>
      </div>
    )
  }
}

export default StyleGuide
