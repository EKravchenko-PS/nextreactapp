import { NextResponse } from 'next/server';

const BITRIX24_WEBHOOK_URL = process.env.BITRIX24_WEBHOOK_URL;

if (!BITRIX24_WEBHOOK_URL) {
  console.error('BITRIX24_WEBHOOK_URL is not set in environment variables');
}

async function downloadFile(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download file: ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

async function uploadFileToBitrix24(dealId: string, fileName: string, fileContent: Buffer): Promise<string> {
  const formData = new FormData();
  formData.append('id', dealId);
  formData.append('fileContent', new Blob([fileContent]), fileName);

  const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.deal.update`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error(`Failed to upload file to Bitrix24: ${response.statusText}`);

  const result = await response.json();
  if (!result.result) throw new Error('Failed to update deal in Bitrix24');

  return 'File uploaded successfully';
}

export async function POST(request: Request) {
  try {
    const { dealId, documentUrl, fileName } = await request.json();

    if (!dealId || !documentUrl || !fileName) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const fileContent = await downloadFile(documentUrl);
    const result = await uploadFileToBitrix24(dealId, fileName, fileContent);

    return NextResponse.json({ success: true, message: result });
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

