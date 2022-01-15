import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getStudentProfileById } from '../../actions/profile';
import Moment from 'react-moment';
import { getRandomColor, createImageFromInitials } from '../../utils/ProfilPic';

const StudentProfile = ({
  getStudentProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getStudentProfileById(match.params.id);
  }, [getStudentProfileById]);
  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='mb-5 p-1'>
            <Link to='/students' className='p-1 bg-gray-200'>
              <i class='fas fa-chevron-left'></i> Back To Student Profiles
            </Link>
          </div>
          <div className=''>
            <div className='bg-gray-800 text-white p-2 grid md:grid-cols-3 lg:grid-cols-3 gap-10'>
              <div className=''>
                <img
                  className='rounded-full sm:max-w-48'
                  src={createImageFromInitials(
                    150,
                    auth.user.name,
                    'sandybrown'
                  )}
                />
              </div>
              <div className='sm:mt-5 mx-auto my-auto '>
                <div className=' sm:mb-5 col-span-2 text-xl'>
                  <h1 className='p-1 text-4xl font-bold'>
                    {profile.user.name}
                  </h1>
                  <p className='p-1 '>{auth.user.email}</p>
                  <p className='p-1'>
                    {profile.location ? <span>{profile.location}</span> : null}
                  </p>
                </div>
              </div>
              <div className='relative'>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link
                      to='/edit-profile'
                      className='absolute text-white text-2xl right-0'
                    >
                      <i class='far fa-edit'></i>
                    </Link>
                  )}
              </div>
            </div>
            {/*about */}
            <div className=' bg-gray-200 p-2'>
              <div className='p-2'>
                <div className='flex flex-col items-center justify-evenly'>
                  {profile.bio && (
                    <Fragment>
                      <h2 className='text-gray-800'>
                        {profile.user.name.trim().split(' ')[0]}'s Bio
                      </h2>
                      <p>{profile.bio}</p>
                    </Fragment>
                  )}
                </div>
                <div className='line' />
              </div>
              <div className='flex flex-row justify-evenly'>
                <h2 className='text-gray-800 my-auto font-bold text-2xl'>
                  Skill Set
                </h2>
                <div className=''>
                  {profile.skills.map((skill, index) => (
                    <div key={index} className='p-1'>
                      <i className='fas fa-check' /> {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className='line' />

              <div className='flex flex-row justify-evenly'>
                <h2 className='text-gray-800 my-auto font-bold text-2xl'>
                  Hobbies Set
                </h2>
                <div className=''>
                  {profile.hobbies.map((hobbie, index) => (
                    <div key={index} className='p-1'>
                      <i className='fas fa-check' /> {hobbie}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='bg-white p-2'>
              <h2 className='text-gray-800'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <div>
                      <h3 className='font-semibold'>{education.school}</h3>
                      <p>
                        <Moment format='YYYY-MM-DD'>{education.from}</Moment> -{' '}
                        {!education.to ? (
                          'Now'
                        ) : (
                          <Moment format='YYYY-MM-DD'>{education.to}</Moment>
                        )}
                      </p>
                      <p>
                        <strong>Degree: </strong> {education.Degree}
                      </p>
                      <p>
                        <strong>Field of Study: </strong>{' '}
                        {education.fieldOfStudy}
                      </p>
                      <p>
                        <strong>Description: </strong> {education.description}
                      </p>
                      <div className='line' />
                    </div>
                  ))}
                </Fragment>
              ) : (
                <h4>No Education credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

StudentProfile.propTypes = {
  getStudentProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getStudentProfileById })(
  StudentProfile
);
