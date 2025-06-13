import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>These are not movies you looking for...</p>
      <Link to="/">Come Back </Link>
    </div>
  );
};

export default NotFoundPage;
