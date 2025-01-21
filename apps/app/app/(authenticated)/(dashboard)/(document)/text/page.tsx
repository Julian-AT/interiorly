import { redirect } from 'next/navigation';

const DocumentRedirectPage = async () => {
  await redirect('/');
  return null;
};

export default DocumentRedirectPage;
