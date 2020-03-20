import BackendInterface from "./backend_interface"

class MockBackend extends BackendInterface {
	listDropSites(zipcode, radius) {
		return [
			{
				name: 'Kaiser Hospital',
				drop_address: '1 Mission St',
				location_id: 100,
				arbitrary_comments: 'Write "skittles" on the package'
			}
		]
	}
}

export default MockBackend;
