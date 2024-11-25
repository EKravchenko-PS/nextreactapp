import Script from 'next/script'

export default function Home() {
  return (
    <html>
      <head>
        <title>Тестирование обработки документа Битрикс24</title>
      </head>
      <body>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Тестирование обработки документа Битрикс24</h1>
          <form id="testForm" className="space-y-4">
            <div>
              <label htmlFor="dealId" className="block mb-1">ID сделки:</label>
              <input type="text" id="dealId" name="dealId" required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="documentUrl" className="block mb-1">URL документа:</label>
              <input type="url" id="documentUrl" name="documentUrl" required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="fileName" className="block mb-1">Имя файла:</label>
              <input type="text" id="fileName" name="fileName" required className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Отправить</button>
          </form>
          <div id="result" className="mt-4"></div>
        </div>

        <Script id="form-handler">{`
          document.getElementById('testForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
              const response = await fetch('/api/process-document', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              const result = await response.json();
              
              if (result.success) {
                document.getElementById('result').textContent = 'Документ успешно обработан: ' + result.message;
              } else {
                document.getElementById('result').textContent = 'Произошла ошибка при обработке документа: ' + (result.error || 'Неизвестная ошибка');
              }
            } catch (error) {
              console.error('Error:', error);
              document.getElementById('result').textContent = 'Произошла ошибка при отправке запроса.';
            }
          });
        `}</Script>
      </body>
    </html>
  )
}

