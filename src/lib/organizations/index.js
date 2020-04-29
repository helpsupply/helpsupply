import MANYCMetadata from './manyc';
import WorkersNeedChildcareMetadata from './workersneedchildcare';
import NYCCovidCareMetadata from './nyccovidcare';
import EastVillageNeighborsMetadata from './evn';
import DummyMetadata from './dummy';

var OrganizationIndex = {
  ByZip: {},
  Metadata: {},
};

function RegisterOrganization(metadata) {
  metadata.ZipCodes.map((zip) => {
    OrganizationIndex.ByZip[zip] = (OrganizationIndex.ByZip[zip] || []).concat([
      [metadata.Kind, metadata.id],
    ]);
    return zip;
  });
  OrganizationIndex.Metadata[metadata.id] = metadata;
}

// We should compute this statically beforehand
RegisterOrganization(MANYCMetadata);
RegisterOrganization(WorkersNeedChildcareMetadata);
RegisterOrganization(NYCCovidCareMetadata);
RegisterOrganization(EastVillageNeighborsMetadata);
RegisterOrganization(DummyMetadata);

export default OrganizationIndex;
