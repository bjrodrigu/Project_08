import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import { useLoginState } from "../../contexts/LoginContext";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import useLogout from "../../auth/useLogout";


// Component displays user profile dropdown on hover
export default function ReactRegisterButton() {
      // consume current outlet
      let location = useLocation();
      const navigate = useNavigate();
      // const {login, setLogin, user, setUser} = useLoginState();
      const { user, setUser, login, setLogin } = useLoginState();
      const handleLogout = useLogout();
      // show user if logged in
      if (login) {
            // get current user username
            const username = JSON.parse(sessionStorage.getItem("isLoggedIn") || '"User"');
            // TODO: button href handling for dropdown
            return (<>
                  <Dropdown title='User' className='rounded-pill'
                        style={{
                              top: '2vh',
                              left: '91vw',
                              position: 'fixed',
                              alignItems: 'center',
                              justifyContent: 'center',
                        }}>
                        <Dropdown.Toggle variant="outline-secondary" style={{
                              width: '5vw',
                              height: '5vw',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontSize: '1vw' 
                        }}>
                              {username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                              <Dropdown.Item
                                    variant="outline-secondary"
                                    onClick={() => { navigate("/userProfile") }}>
                                    Your Profile
                              </Dropdown.Item>
                              <Dropdown.Item variant="outline-secondary" >
                                    Favorites
                              </Dropdown.Item>
                              <Dropdown.Item
                                    variant="outline-danger"
                                    onClick={handleLogout}>
                                    Sign out
                              </Dropdown.Item>
                        </Dropdown.Menu>
                  </Dropdown>
            </>);
      }
      // show register on login page
      else if (location.pathname == '/login') {
            return <RegisterButton />;
      }
      else if (location.pathname == '/userProfile') {
            return <></>
      }
      // default case, return login
      else {
            return <LoginButton />;
      }

}