import React from "react";
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-title">
        <Link href="/">
          <h1>Archimed's Capital Bill</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/investments">Investments</Link>
          </li>
          <li>
            <Link href="/bills">Bills</Link>
          </li>
          <li>
            <Link href="/invoices">Capital Bills</Link>
          </li>
          <li>
            <Link href="/users">Investors</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
