import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to our API Server</h1>
      <p className="mb-4">This server can handle various HTTP methods. Try them out:</p>
      <ul className="list-disc pl-5">
        <li>GET /api</li>
        <li>POST /api (with JSON body)</li>
        <li>PUT /api (with JSON body)</li>
        <li>DELETE /api</li>
      </ul>
      <div className="mt-8">
        <Link href="/api-test" className="text-blue-500 hover:underline">
          Go to API Test Page
        </Link>
      </div>
    </div>
  );
}

