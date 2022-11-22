import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authcontext } from "../context/authContext";

const Header = () => {
  const authContext = useContext(authcontext);
  // console.log(authContext.currentUser.img);
  return (
    <div className="header">
      <div className="img">
        <Link to="/">
          <img
            src="https://i.pinimg.com/originals/d4/18/f6/d418f6fc7dcba805af2213d8f27a5d1d.jpg"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="menu">
        <Link to="/?cat=art" className="link">
          <h6>ART</h6>
        </Link>

        <Link to="/?cat=Sciente" className="link">
          <h6>SCIENTE</h6>
        </Link>

        <Link to="/?cat=Technology" className="link">
          <h6>TECHNOLOGY</h6>
        </Link>

        <Link to="/?cat=Cinema" className="link">
          <h6>CINEMA</h6>
        </Link>

        <Link to="/?cat=Food" className="link">
          <h6>FOOD</h6>
        </Link>

        {authContext.currentUser && <h2>{authContext.currentUser.username}</h2>}

        {authContext.currentUser ? (
          <Link className="link" to="/" onClick={authContext.logout}>
            logout
          </Link>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}

        {authContext.currentUser && (
          <>
            <Link to="/add" className="link">
              <span>write</span>
            </Link>

            <div className="profileIMG">
              <Link
                to={`/profile/${authContext.currentUser.id}`}
                className="link"
              >
                <img
                  src={`../uploads/${authContext.currentUser.img}`}
                  alt="profileIMG"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
