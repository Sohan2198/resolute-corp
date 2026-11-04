import DesignPage from '../DesignPage';

/** Any unknown address: the design's 404 page, marked noindex. */
export default function NotFound() {
  return <DesignPage pageKey="notFound" />;
}
