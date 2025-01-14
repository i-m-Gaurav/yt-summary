import { useState, ChangeEvent } from 'react';

const UrlForm: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSummarize = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('https://kumargaurav.app.n8n.cloud/webhook/ytube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSummary(data.text);
    } catch (error) {
      console.error('Error summarizing video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" p-4 sm:p-6 md:p-8 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text mb-4">
          Video Summarizer
        </h1>
        <p className="text-gray-600 text-lg">
          Get quick summaries of YouTube videos
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value)}
              placeholder="Enter YouTube video URL"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
            />
          </div>

        
          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transform hover:-translate-y-0.5'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Summarizing...
              </div>
            ) : (
              'Summarize Video'
            )}
          </button>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Summary</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};



export default UrlForm;