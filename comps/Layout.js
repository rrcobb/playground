import Header from "./Header";

const styles = {
  margin: "auto",
  maxWidth: 600
};

export default props => (
  <div style={styles}>
    <Header />
    {props.children}
  </div>
);
