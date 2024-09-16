Team Page Component
Preview
Code

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function TeamPage() {
  const params = useParams();
  const teamId = params.teamId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100 p-6">
      <Link href="/dashboard" className="btn btn-ghost mb-4">
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-4">Team Page</h1>
      <p className="text-xl">Team ID: {teamId}</p>
      {/* Add more team-specific content here */}
    </div>
  );
}