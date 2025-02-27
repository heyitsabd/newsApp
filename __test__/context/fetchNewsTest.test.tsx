// __test__/fetchNewsTest.tsx
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AppProvider, useAppContext } from '@/context/AppContext';

const TestComponent = () => {
  const { news, fetchNews, selectedCategory, loading } = useAppContext();

  return (
    <div>
      <button onClick={() => fetchNews('technology')}>Fetch Technology</button>
      <p data-testid="category">{selectedCategory}</p>
      <p data-testid="loading">{loading ? 'Loading...' : 'Done'}</p>
      <ul>
        {news.map((article: any, index: any) => (
          <li key={index}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

describe('fetchNewsTest', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    process.env.NEWS_API_KEY = 'mock-api-key'; // Mock API key
  });

  it('should fetch news when fetchNews is called', async () => {
    const mockNews = { status: 'ok', articles: [{ title: 'Tech News' }] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockNews),
    });

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      screen.getByText('Fetch Technology').click();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('category=technology')
    );
    expect(screen.getByText('Tech News')).toBeInTheDocument();
  });
});
