import { Link } from 'react-router-dom';
import UserOverlay from './user/UserOverlay';

// Fixed top bar: logo + name on the left (links home), login / user menu on the right.
export default function BadgerHeader() {
      return (
            <header className="app-header">
                  <Link to="/" className="brand" aria-label="StudyBadger home">
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="" />
                        <span>Study<em>Badger</em></span>
                  </Link>
                  <UserOverlay />
            </header>
      );
}
