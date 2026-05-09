import { Link } from 'react-router-dom';
import Page from '../components/ui/Page';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <Page className="grid place-items-center px-4 py-32 text-center">
      <div>
        <p className="gradient-text text-8xl font-black">404</p>
        <h1 className="mt-4 text-4xl font-black">This aisle does not exist.</h1>
        <Button as={Link} to="/" className="mt-8">Back home</Button>
      </div>
    </Page>
  );
}
