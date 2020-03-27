import { css } from '@emotion/core';

export const styles = css`
  body {
    background: #fcfcfc;
    font-family: 'Inter', sans-serif;
  }
  .entryportal {
    background-color: white;
    margin-top: 40px;
    width: 400px;
    border-radius: 5px;
    padding: 40px 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    float: left;
    height: 280px;
  }

  .entryPortalFirst {
    margin-right: 50px;
  }

  .homeBox {
    width: 100%;
    margin: auto;
    text-align: center;
  }

  .logoText {
    font-weight: bold;
    margin-top: 50px;
  }

  .homeIntro {
    font-size: 14px;
    width: 400px;
    margin: auto;
  }

  .homeDescription {
    font-size: 14px;
    width: 300px;
    margin: 0px auto 55px;
  }

  .healthcarePro {
    margin-bottom: 30px;
  }

  .verifyContainer {
    width: 400px;
    border: solid 1px #ccc;
    border-radius: 5px;
    padding: 40px;
    margin-top: 20px;
  }

  .verifyContainer h2 {
    font-weight: bold;
    font-size: 25px;
  }

  .verifyContainer p {
    font-size: 16px;
  }

  .verifyContainer p.small {
    font-size: 12px;
  }

  .verificationSent {
    background-color: #007e33;
    padding: 15px 20px;
    color: #fff;
    font-weight: bold;
    border-radius: 10px;
  }

  .verificationSent .big {
    font-size: 13px;
  }

  .verificationSent .small {
    font-size: 12px;
  }

  .manageDropSiteLink {
    float: right;
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: bold;
  }

  h1,
  h2,
  h3 {
    font-family: 'Inter', sans-serif;
  }
  .logored {
    color: #333 !important;
  }

  .logoredSupply {
    margin-top: 20px;
  }

  .result {
    cursor: pointer;
  }
  .selected {
    background-color: #dee9fa;
  }
  .content {
    margin-left: auto;
    margin-right: auto;
  }
  .panelFull {
    float: left;
    width: 100%;
  }
  @media only screen and (min-width: 1200px) {
    .panel {
      float: left;
      width: 540px;
      margin-right: 50px !important;
    }
    .content {
      width: 1200px;
    }

    input#linkSubmit {
      width: 60%;
    }

    input#linkTitle {
      width: 30%;
    }
    .confirmationText,
    .errorText {
      float: left;
    }

    .hospitalNeedCard {
      width: 45%;
      margin-right: 5%;
      float: left;
    }

    .hospitalNeedsLeft {
      width: 70%;
      float: left;
    }
    .hospitalNeedNewSubmit {
      width: 300px;
      margin-top: 5px;
      float: right;
    }

    .alertSpinner {
      float: left;
      width: 20px;
      height: 20px;
      margin-top: 2px;
      margin-right: 10px;
    }

    .alertText {
      float: left;
    }

    .homeBoxesContainer {
      width: 850px;
      margin: auto;
    }

    .servingText {
      margin-top: 10px;
      margin-left: 10px;
      font-size: 12px;
      float: left;
    }

    .cartBannerContainer {
      width: 480px;
      margin: auto;
    }
    .cartBanner .cartText {
      margin-top: 5px;
      float: left;
    }
    .cartBanner button {
      margin-left: 20px;
      float: left;
    }
  }
  @media only screen and (max-width: 1199px) {
    .panel {
      width: 100%;
      margin: 20px;
      margin-bottom: 50px !important;
    }
    .content {
      width: 100%;
    }

    input#linkSubmit {
      width: 100%;
    }

    input#linkTitle {
      width: 100%;
    }

    .hospitalNeedCard {
      width: 100%;
    }

    .hospitalNeedNewSubmit {
      margin-top: 20px;
      width: 100%;
      float: left;
    }

    .alertSpinner {
      width: 20px;
      height: 20px;
      margin-top: 12px;
      margin-right: 20px;
      float: left !important;
    }

    .alertText {
      text-align: left;
    }

    .homeBoxesContainer {
      width: 400px;
      margin: auto;
    }

    .entryPortalFirst {
      margin-right: 0px !important;
    }

    .servingText {
      margin-top: 0px;
      margin-bottom: 15px;
      margin-left: 0px;
      font-size: 12px;
      float: left;
    }

    .dropSiteName {
      width: 100%;
    }
    .cartBanner .cartText {
      margin-bottom: 10px;
    }
    .cartBanner button {
      margin-left: 0px;
    }
  }
  .panel,
  .panelFull {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 30px;
    margin: 20px 0px;
    box-sizing: border-box;
    background-color: white;
  }

  .form {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 30px;
    margin: 30px;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    background-color: white;
  }

  .outlinedbox {
    border-radius: 2px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }

  .group-label {
    font-size: 20px;
    font-weight: 400;
    margin: 10px;
    margin-top: 20px;
    margin-left: 0px;
  }

  .addbutton {
    margin-top: 10px;
  }

  ul.linksList {
    margin-top: 20px;
    list-style-type: none;
  }

  .linkSubmissionContainer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: solid 1px #eee;
  }

  .linkSubmitGroup {
    width: 100%;
  }

  .submitLink {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .linkSubmitBtn {
    margin-top: 20px;
  }

  input#linkSubmit,
  input#linkTitle {
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    padding: 10px 10px;
    border-radius: 5px;
    float: left;
    color: #111;
  }

  .confirmationText,
  .errorText {
    font-size: 12px;
    margin-top: 10px;
  }

  .confirmationText {
    color: #006400;
  }

  .errorText {
    color: red;
  }

  .loginContainer {
    text-align: center;
    margin-top: 50px;
  }

  .linksListLink {
    float: left;
  }

  .status {
    float: left;
    font-size: 10px;
    margin-left: 10px;
    margin-top: 5px;
  }

  .statusPublished {
    color: #006400;
    float: left;
  }

  .statusPending {
    color: red;
    float: left;
  }

  .modActions {
    float: left;
    margin-left: 20px;
  }

  .modActionBtn {
    margin-right: 5px;
  }

  .hospitalNeedsBtn {
    float: left;
  }

  .hospitalNeedsLink {
    margin-top: 8px;
    float: left;
    font-size: 14px;
  }

  .hospitalNeedCard {
    margin-bottom: 30px;
  }

  .hospitalNeedCard h5 {
    font-weight: bold;
  }

  .hospitalNeedsTopBar {
    float: left;
    width: 100%;
    border-bottom: solid 1px #eee;
    margin-bottom: 20px;
    background-color: #000;
    padding: 40px;
    color: #fff;
  }

  .hospitalNeedsTopBarAdmin {
    float: left;
    width: 100%;
    border-bottom: solid 1px #eee;
    margin-bottom: 20px;
  }

  .hospitalNeedNewSubmit,
  .supplyInstructionsAddress,
  .supplyInstructionsAddressForm {
    text-align: center;
    border: solid 1px #ccc;
    padding: 20px;
    border-radius: 5px;
    color: #fff;
    background-color: #333;
  }

  .supplyInstructionsAddressForm {
    float: left;
    width: 100%;
  }

  .supplyInstructionsAddressForm .addressText {
    font-size: 30px;
  }

  .hospitalNeedNewSubmit .helperText,
  .supplyInstructionsAddress .helperText,
  .supplyInstructionsAddressForm .helperText {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .staffTable tbody th {
    font-weight: normal;
    font-size: 14px;
  }

  .staffNeedGroup {
    margin-bottom: 50px;
  }

  button:disabled {
    cursor: default;
  }

  .need-id {
    font-size: 12px;
    color: #888;
    float: right;
  }

  .statusSelectGroup {
    margin-left: 30px;
    float: left;
  }

  .statusSelectGroup select {
    font-size: 12px;
  }

  .formLabel {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .requestFormField {
  }

  .requestSelectType {
    margin-bottom: 30px;
  }

  .formError {
    padding-top: 10px;
    padding-bottom: 30px;
    font-size: 12px;
    color: red;
  }

  .deleteRequest {
    margin-left: 10px;
    float: left;
  }

  .dropSiteIdText {
    float: left;
  }

  .dropSiteTitle {
    float: left;
    width: 100%;
  }

  .dropSiteDescription {
    float: left;
  }
  .dropSiteName {
    float: left;
  }

  .deliveryInstructions {
    width: 100%;
    float: left;
    margin-top: 20px;
    text-align: center;
  }

  .qtyInput {
    margin-bottom: 15px;
  }

  .deliveryLabels {
    background-color: #333;
    width: 300px;
    color: #fff;
    padding: 20px;
    float: left;
    margin-right: 10px;
    margin-top: 10px;
  }

  .deliveryLabels h4 {
    font-size: 16px;
  }

  .deliveryLabels h6 {
    font-size: 12px;
  }

  .alertFixed {
    position: fixed;
    z-index: 999;
    width: 100%;
  }

  .newDropSiteContainer {
    width: 100%;
    text-align: center;
  }

  .centerPanel {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 30px;
    box-sizing: border-box;
    background-color: white;
    margin: 100px auto;
    width: 400px;
    display: inline-block;
  }

  .newDropSiteFormServingText {
    margin-bottom: 20px;
  }

  .requestLabel {
    font-size: 12px;
  }

  .dropSiteInstructionHeader {
    font-size: 20px;
    text-align: center;
    float: left;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
    font-weight: bold;
  }

  .finalizeDonationContainer {
    float: left;
    width: 100%;
  }

  .finalizeDonationLabel {
    text-align: center;
    width: 100%;
    float: left;
    font-size: 15px;
    margin-top: 30px;
  }

  .finalizeDonationBtn {
    width: 100%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .finalizeDonationBtn button {
    width: 280px;
    font-size: 20px;
  }

  .quantityBlock {
    float: left;
  }

  .formDisclaimer {
    font-size: 12px;
    margin-top: 5px;
  }

  .helpFooter {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    float: left;
    margin-top: 20px;
    margin-bottom: 100px;
  }

  .cartBanner {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #d4edda;
    color: #155724;
    font-weight: bold;
    padding: 20px 30px;
    text-align: center;
  }
`;
