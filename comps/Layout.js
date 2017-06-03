import Header from "./Header";

const styles = {};

export default props => (
  <div style={styles}>
    <Header />
    {props.children}
  </div>
);
