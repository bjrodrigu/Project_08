import { Link } from 'react-router-dom';
import UserOverlay from './user/UserOverlay';

// Fixed top bar: logo + name on the left (links home), login / user menu on the right.
export default function BadgerHeader() {
      return (
            <header className="app-header">
                  <Link to="/" className="brand" aria-label="BadgerStudy home">
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="" />
                        <span>Badger<em>Study</em></span>
                  </Link>
                  <UserOverlay />
            </header>
      );
}
