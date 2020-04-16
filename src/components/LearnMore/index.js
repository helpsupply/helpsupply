/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';

import { Head, Accordion } from 'components/Accordion';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import FAQ from './FAQ';
import About from './About';
import Contact from './Contact';

const faq = [
  {
    title: 'FAQ',
    content: () => {
      return <FAQ />;
    },
  },
  {
    title: 'About HS',
    content: () => {
      return <About />;
    },
  },
];

export const LearnMore = () => {
  return (
    <Fragment>
      <Accordion
        data={faq.map((faq, idx) => ({
          head: (
            <Head position={idx}>
              <Text as="h2" type={TEXT_TYPE.HEADER_4}>
                {faq.title}
              </Text>
            </Head>
          ),
          content: faq.content(),
        }))}
      />
      <Contact />
    </Fragment>
  );
};

export default LearnMore;
