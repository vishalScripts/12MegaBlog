import React from "react";
import { Container, Logo, LogoutBtn } from "..";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import "../../assets/Logo1"
import logo from "../../assets/Logo1.png";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500 bg-opacity-25 absolute top-0 left-0 w-full">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" src={logo} />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200  hover:underline hover:bg-blue-600 hover:bg-opacity-10  hover:font-bold rounded-xl"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
