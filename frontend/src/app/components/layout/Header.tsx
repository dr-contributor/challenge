import React from "react";
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-title">
        <Link href="/">
          <h1>ARCHIMED</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/investments">Investments</Link>
          </li>
          <li>
            <Link href="/bill">Bills</Link>
          </li>
          <li>
            <Link href="/invoices">Capital Calls</Link>
          </li>
          <li>
            <Link href="/payment-details">Payment Details</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
