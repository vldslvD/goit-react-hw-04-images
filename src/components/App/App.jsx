import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { getPictures } from 'pixaAPI';
import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  const [search, setSearch] = useState('');
  const [gallery, setGallery] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [pageAmount, setPageAmount] = useState(0);

  useEffect(() => {
    setGallery([]);
  }, [search]);

  useEffect(() => {
    async function startFetching() {
        try {
          setStatus('pending');
          const response = await getPictures(search, pageCount);
          setPageAmount(Math.ceil(response.data.totalHits / 12));
          setGallery(state => [...state, ...response.data.hits]);
          setStatus('resolved');
          
        } catch (error) {
          setError(error);
          setStatus('rejected');
        }
    }
    startFetching();
  }, [search, pageCount]);

  const handleSearch = newSearch => {
    setSearch(newSearch);
  };
  const handleLoadMore = () => {
    setPageCount(state => state + 1);
    scroll.scrollToBottom();
    };

  const renderError = message => {
    toast.error(message);
  };
  const renderInfo = message => {
    toast.info(message);
  };
  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      
      {<ImageGallery gallery={gallery} />}
      {status === 'pending' && <Loader />}
      {status === 'resolved' &&
        gallery.length === 0 &&
        renderInfo(`There are no pictures for ${search}`)}
      {status === 'rejected' && renderError(error.message)}
      {(gallery.length >= 12) && pageCount < pageAmount && (
        <Button onLoadMore={handleLoadMore} />
      )}
      <ToastContainer />
    </Container>
  );
};
