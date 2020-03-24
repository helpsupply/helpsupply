/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import Text from './Text/Text'
import { TEXT_TYPE } from './Text/Text.styles'

class StyleGuide extends React.Component {
  render() {
    return (
      <div css={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '1em'}}>
        <h1>Style Guide</h1>
        <hr />
        <Text as='h1' type={TEXT_TYPE.HEADER_1}>Header 1</Text>
        <Text as='h2' type={TEXT_TYPE.HEADER_2}>Header 2</Text>
        <Text as='h3' type={TEXT_TYPE.HEADER_3}>Header 3</Text>
        <Text as='h4' type={TEXT_TYPE.HEADER_4}>Header 4</Text>
        <Text as='p' type={TEXT_TYPE.BODY_1}>Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc faucibus neque finibus ultrices a non risus.</Text>
        <Text as='p' type={TEXT_TYPE.BODY_2}>Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc faucibus neque finibus ultrices a non risus.</Text>
        <Text as='p' type={TEXT_TYPE.NOTE}>Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc faucibus neque finibus ultrices a non risus.</Text>
        <hr />
      </div>
    );
  }
}

export default StyleGuide;
