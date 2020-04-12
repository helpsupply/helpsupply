import MANYCMetadata from './manyc';

var OrganizationIndex = {
  ByZip: {},
  Metadata: {},
};

function RegisterOrganization(metadata) {
  metadata.ZipCodes.map((zip) => {
    OrganizationIndex.ByZip[zip] = (OrganizationIndex.ByZip[zip] || []).concat([
      [metadata.Kind, metadata.id],
    ]);
  });
  OrganizationIndex.Metadata[metadata.id] = metadata;
}

// We should compute this statically beforehand
RegisterOrganization(MANYCMetadata);

export default OrganizationIndex;
