import { render, screen, act,fireEvent } from '@testing-library/react';
import { AppProvider, useAppContext } from '@/context/AppContext';
import Navbar from "@/app/Components/Navbar";
import { ThemeContext } from "@/context/ThemeContext";
import { useState } from 'react';

global.fetch = jest.fn(); 

const TestComponent = () => {
  const { news, fetchNews, selectedCategory, handleSearch, loading } = useAppContext();
  const [search, setSearch] = useState<string>('');

  return (
    <div>
      <button onClick={() => fetchNews('technology')}>Fetch Technology</button>
      <button onClick={() => handleSearch(search)}>Search</button>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
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

describe('AppProvider Context', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    process.env.NEWS_API_KEY = 'mock-api-key';
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

  it('should fetch search results when handleSearch is called', async () => {
    const mockSearchResults = { status: 'ok', articles: [{ title: 'Search Result' }] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSearchResults),
    });
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'query' } });
  
    await act(async () => {
      screen.getByText('Search').click(); 
    });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('everything?q=query')
    );
    expect(screen.getByText('Search Result')).toBeInTheDocument();
  });
    
});
