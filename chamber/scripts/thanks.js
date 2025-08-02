const getString = window.location.search;
const data = new URLSearchParams(getString);

document.querySelector('.data').innerHTML = `
  <p>First Name: ${data.get('first')}</p>
  <p>Last Name: ${data.get('last')}</p>
  <p>Email: ${data.get('email')}</p>
  <p>Phone: ${data.get('phone')}</p>
  <p>Organization: ${data.get('organization')}</p>
  <p>Membership Level: ${data.get('membership')}</p>
  <p>Organization Description: ${data.get('org-description')}</p>
`;