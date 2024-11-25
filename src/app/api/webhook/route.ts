import { NextResponse } from 'next/server';

// Webhook URL должен быть сохранен в переменных окружения
const BITRIX24_WEBHOOK_URL = process.env.BITRIX24_WEBHOOK_URL;

if (!BITRIX24_WEBHOOK_URL) {
  console.error('BITRIX24_WEBHOOK_URL is not set in environment variables');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Здесь вы можете добавить любую необходимую обработку данных
    const processedData = {
      fields: {
        TITLE: body.title || 'New Request',
        NAME: body.name || 'Unknown',
        PHONE: body.phone || '',
        EMAIL: body.email || '',
        COMMENTS: body.comments || ''
      }
    };

    // Отправка данных в Битрикс24
    const bitrixResponse = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.lead.add.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedData),
    });

    if (!bitrixResponse.ok) {
      throw new Error('Failed to send data to Bitrix24');
    }

    const bitrixData = await bitrixResponse.json();

    return NextResponse.json({ success: true, leadId: bitrixData.result });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

