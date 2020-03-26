schema

Default Welcome Intent

HCPSignup {phrases: "need", inputContext: null, outputContext: "hcp_signup", response: "We can help. What's the zip/postal code of the health facility you work at?"}
    - HCPSignupHospitalZip {phrases: "90210", inputContext: "hcp_signup", OPTIONS for outputContext: "one_facility_found" / "multiple_facility_found" / "no_facility_found"
        - HCPSignupFollowupOneResultYes {phrases: "yes", inputContext: "one_facility_found"}


HCPCreateNewDropSite
HCPSeeDropSiteDetails

HCPSignupFollowupMultipleResultsYes
HCPSignupFollowupMultipleResultsNo
HCPSignupFollowupOneResultYes
HCPSignupFollowupOneResultNo
