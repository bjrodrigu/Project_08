import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import { useLoginState } from "../../contexts/LoginContext";
import { useLocation } from "react-router";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";


// Component displays user profile dropdown on hover
export default function ReactRegisterButton() {
      // consume current outlet
      let location = useLocation();
      // const {login, setLogin, user, setUser} = useLoginState();
      const login = false; //Test Snippet

      // show user if logged in
      if(login) {
            // TODO: button href handling for dropdown
            return (<>
                        <Dropdown title='User' className='rounded-pill'
                                    style={{
                                    left: '91vw', 
                                    position: 'fixed',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }}>
                              <Dropdown.Toggle variant="outline-secondary" style={{
                                    width: '5vw', 
                                    height: '5vw', 
                                    borderRadius: '50%'}}>
                                    User
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                    <Dropdown.Item variant="outline-secondary" >
                                          Favorites
                                    </Dropdown.Item>
                                    <Dropdown.Item variant="outline-danger">
                                          Sign out
                                    </Dropdown.Item>
                              </Dropdown.Menu>
                        </Dropdown>
            </>);
      } 
      // show register on login page
      else if(location.pathname == '/login') {
            return <RegisterButton />;
      } 
      // default case, return login
      else {
            return <LoginButton />;
      }

}