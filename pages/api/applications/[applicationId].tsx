import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get application data.
 *
 * Corresponds to /api/applications/[applicationId] route;
 */
export default function handleApplications(req: NextApiRequest, res: NextApiResponse) {
  // Get /applications collection in Cloud Firestore
  // GET: Return this application
  // PATCH: Modify an application
  // DELETE: Delete this applications
  const {
    method,
    query: { applicationId },
  } = req;
  if (method === 'GET') {
    res.status(200).json({
      id: applicationId,
    });
  } else if (method === 'PATCH') {
  } else if (method === 'DELETE') {
    // Maybe check for additional authorization so only organizers can delete individual applications?
  } else {
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
