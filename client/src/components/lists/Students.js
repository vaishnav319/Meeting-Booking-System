import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import StudentItem from './StudentItem';
import PropTypes from 'prop-types';
import { getStudentProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import Search from './Search';

const Students = ({
  getStudentProfiles,
  profile: { studentProfiles, loading },
}) => {
  useEffect(() => {
    getStudentProfiles();
    console.log(studentProfiles);
  }, [getStudentProfiles]);
  const [searchQuery, setSearchQuery] = useState();
  const filterProfiles = (studentProfiles, query) => {
    if (!query) {
      return studentProfiles;
    }

    return studentProfiles.filter((profile) => {
      const name = profile.user.name.toLowerCase();
      if (name.toLowerCase().includes(query.toLowerCase())) {
        return name.toLowerCase().includes(query.toLowerCase());
      }
    });
  };
  studentProfiles = filterProfiles(studentProfiles, searchQuery);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='flex justify-between flex-wrap'>
            <div>
              <h1 className='large text-primary'>Students</h1>
              <p className='lead'>
                <i className='fab fa-connectdevelop' /> Browse and explore about
                Students
              </p>
            </div>
            <div className=' max-h-16 my-auto'>
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
          <div className='flex flex-col md:text-center'>
            {studentProfiles.length > 0 ? (
              studentProfiles.map((profile) => (
                <StudentItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4 className='m-auto mt-10 text-3xl'>
                No Mentor Profiles found
                <br />
                <i className='far fa-frown mt-3 text-5xl'></i>
              </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Students.propTypes = {
  getStudentProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getStudentProfiles })(Students);
