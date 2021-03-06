import React from 'react';
import Layout from '../comps/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const CourseLink = props => (
  <li>
    <Link
      as={`/c/${props.course_id}`}
      href={`/course?course_id=${props.course_id}`}
    >
      <a>{props.course_id}: {props.name}</a>
    </Link>
  </li>
);

const Courses = props => {
  return (
    <Layout>
      <p>Some UMD Courses</p>
      <div>
        {(props.courses || [])
          .map(course => <CourseLink key={course.course_id} {...course} />)}
      </div>
    </Layout>
  );
};

Courses.getInitialProps = async function() {
  const res = await fetch('https://api.umd.io/v0/courses');
  const courses = await res.json();

  return {
    courses,
  };
};

export default Courses;
