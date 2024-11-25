'use client'

import { useState } from 'react';

export default function ApiTest() {
  const [result, setResult] = useState('');

  const testApi = async (method: string, body?: object) => {
    try {
      const options: RequestInit = { method };
      if (body) {
        options.body = JSON.stringify(body);
        options.headers = { 'Content-Type': 'application/json' };
      }
      const response = await fetch('/api', options);
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + (error as Error).message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">API Test Page</h1>
      <div className="space-x-4 mb-4">
        <button onClick={() => testApi('GET')} className="px-4 py-2 bg-blue-500 text-white rounded">
          Test GET
        </button>
        <button onClick={() => testApi('POST', { test: 'data' })} className="px-4 py-2 bg-green-500 text-white rounded">
          Test POST
        </button>
        <button onClick={() => testApi('PUT', { update: 'data' })} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Test PUT
        </button>
        <button onClick={() => testApi('DELETE')} className="px-4 py-2 bg-red-500 text-white rounded">
          Test DELETE
        </button>
      </div>
      <pre className="bg-gray-100 p-4 rounded">{result}</pre>
    </div>
  );
}

