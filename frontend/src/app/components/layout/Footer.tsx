import React from "react";
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Link href="/">
          <h2>Archimed <span>Challenge</span></h2>
        </Link>
      </div>
      <div className="footer-secondary">
        © 2023 Daniel Rosato. Powered by CSS, ReactJS, NextJS and Typescript.
        <a href="https://github.com/" target="_blank">
          Site's source code
        </a>
        <br />
      </div>
    </footer>
  );
};

export default Footer;
