import Link from "next/link";
const linkStyle = { textDecoration: "none" };

export default () => (
  <div>
    <nav>
        <a href="https://rob.co.bb" style={linkStyle}>
          Blog Home
        </a>
      <Link href="/">
        <a style={linkStyle}>Playground Index</a>
      </Link>
      <Link href="/assassins">
        <a style={linkStyle}>Assassins</a>
      </Link>
      <Link href="/courses">
        <a style={linkStyle}>Courses</a>
      </Link>
    </nav>
    <style jsx>{`
      h3 {
        font-family: "Lucida Grande", "Verdana", "Arial", "Sans-Serif";
        margin: 0;
        padding: 0;
      }
      nav {
        display: flex;
        max-width: 600px;
        justify-content: space-between;
        margin: auto;
      }

      div {
        width: 100%;
        border-bottom: 1px solid black;
      }
    `}</style>
  </div>
);
