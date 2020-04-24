/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';

const MetaData = () => (
  <Helmet>
    <meta
      property="og:description"
      content="Connecting healthcare workers to volunteer-powered grocery shopping, childcare and mental health services."
    />
    <meta property="og:url" content="http://help.supply" />
    <meta property="og:site_name" content="Help Supply" />
    <meta name="twitter:site" content="@HelpSupply" />
    <meta name="twitter:image:alt" content="Help Supply Logo" />
    <meta name="twitter:image:alt" content="Help Supply Logo" />
    <meta property="fb:app_id" content="" />
  </Helmet>
);

export default MetaData;
