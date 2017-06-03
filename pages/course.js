import Layout from "../comps/Layout";
import fetch from "isomorphic-unfetch";

const Content = props => {
  const { course } = props;
  const { course_id, name, description, ...rest } = course;
  return (
    <div>
      <h1>{course_id}</h1>
      <div>{name}</div>
      <div>{description}</div>
      <div className="rest">{JSON.stringify(rest)}</div>
      <style jsx>
        {`
  .rest {
    text-decoration: none;
  }

  .rest:hover {
    opacity: 0.6;
    color: red;
  }
`}
      </style>
    </div>
  );
};

const Page = props => (
  <Layout>
    <Content course={props.course} />
  </Layout>
);

Page.getInitialProps = async function(context) {
  const { course_id } = context.query;
  console.log("fetching", course_id);
  const res = await fetch(`http://api.umd.io/v0/courses/${course_id}`);
  const course = await res.json();

  console.log("course", course);
  return {
    course,
  };
};

export default Page;
