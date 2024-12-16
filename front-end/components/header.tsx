import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-black-50 text-decoration-none">
        Golden Hands
      </a>
      <nav className="nav justify-content-center">
        <Link href="/courses" className="nav-link px-4 fs-5 text-black">
          Courses
        </Link>
        <Link href="/users" className="nav-link px-4 fs-5 text-black">
          {" "}
          User
        </Link>
        <Link href="/saved" className="nav-link px-4 fs-5 text-black">
          {" "}
          Saved Courses
        </Link>
      </nav>
    </header>
  );
};

export default Header;
