import Link from "next/link";
const linkStyle = { marginRight: 15, textDecoration: "none" };

export default () => (
  <div>
    <Link href="/"><a style={linkStyle}>Home</a></Link>
    <Link href="/about"><a style={linkStyle}>About</a></Link>
    <Link href="/assassins"><a style={linkStyle}>Assassins</a></Link>
    <Link href="/courses"><a style={linkStyle}>Courses</a></Link>
  </div>
);
