import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Transition } from '@headlessui/react';
import { getRandomColor, createImageFromInitials } from '../../utils/ProfilPic';

const Navbar = ({
  auth: {
    isAuthenticated,
    loading,
    user: { _id, name, isMentor, avatar },
  },
  logout,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let imgSrc = '';
  console.log(createImageFromInitials(50, name, 'sandybrown'));
  var today = new Date();
  var time = today.getHours();
  console.log(avatar);
  const authMobileLinks = (
    <div className='ml-10 flex justify-evenly items-baseline '>
      <div className='flex flex-col lg:flex-row md:flex-row  '>
        <Link className=' text-white px-4 lg:py-0 py-4' to='/mentors'>
          <span>Mentors</span>
        </Link>

        {isMentor && (
          <Link className='text-white px-4 lg:py-0 py-4' to='/students'>
            <span>Students</span>
          </Link>
        )}

        <Link className='text-white px-4 lg:py-0 py-4' to='/meetings'>
          <span>Meetings</span>
        </Link>

        <Link className='text-white px-4 lg:py-0 py-4' to='/dashboard'>
          <span>Dashboard</span>
        </Link>

        <Link
          to={`/mentor-profile/${_id}`}
          className='text-white px-4 lg:py-0 py-4'
        >
          View Profile
        </Link>
        <a onClick={logout} className='text-white px-4 lg:py-0 py-4'>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
  const authLinks = (
    <div className='ml-10 flex justify-evenly items-baseline '>
      <div className='flex flex-col lg:flex-row md:flex-row  '>
        <Link className=' text-white px-4 lg:py-0 py-4' to='/mentors'>
          <span>Mentors</span>
        </Link>

        {isMentor && (
          <Link className='text-white px-4 lg:py-0 py-4' to='/students'>
            <span>Students</span>
          </Link>
        )}

        <Link className='text-white px-4 lg:py-0 py-4' to='/meetings'>
          <span>Meetings</span>
        </Link>

        <Link className='text-white px-4 lg:py-0 py-4' to='/dashboard'>
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );

  const user = (
    <div>
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className='cursor-pointer flex flex-row'
      >
        <img
          className='rounded-full mr-3'
          style={{ width: '2.5rem' }}
          src={
            avatar ? avatar : createImageFromInitials(50, name, 'sandybrown')
          }
        />
        <button className='text-white '>
          {time < 12
            ? `Good Morning ${name}`
            : time >= 12 && time < 16
            ? `Good Afternoon ${name}`
            : `Good Evening ${name}`}
        </button>
      </div>
      {isDropdownOpen && (
        <div className='flex flex-col bg-red-200'>
          <Link
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            to={isMentor ? `/mentor-profile/${_id}` : `/student-profile/${_id}`}
            className='cursor-pointer absolute top-16  shadow-lg p-1  w-48 bg-white z-30 flex-col  border-2 border-gray-300 rounded'
          >
            View Profile
          </Link>
          <a
            onClick={logout}
            className='cursor-pointer absolute top-32 shadow-lg p-1  w-48 bg-white z-30 flex-col  border-2 border-gray-300 rounded'
          >
            <span>Logout</span>
          </a>
        </div>
      )}
    </div>
  );

  const guestLinks = (
    <div className='ml-10 flex items-baseline space-x-4'>
      <Link className='text-white px-2 lg:py-0 py-4' to='/register'>
        Register
      </Link>

      <Link className='text-white px-2 lg:py-0 py-4' to='/login'>
        Login
      </Link>
    </div>
  );
  return (
    <div>
      <nav className='bg-gray-900 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex justify-between items-center'>
              <div className='flex-shrink-0'>
                <Link
                  to='/'
                  className=' text-xl text-gray-200 hover:text-gray-400'
                >
                  <i className='fas fa-code px-2'></i>
                  <span className='text-gray-200 hover:text-gray-400'>
                    Acment
                  </span>
                </Link>
              </div>
              <div className='hidden lg:block flex flex-row justify-between'>
                <div>{isAuthenticated ? authLinks : ''}</div>
              </div>
            </div>
            <div className='hidden lg:block'>
              {isAuthenticated ? user : guestLinks}
            </div>
            <div className='flex lg:hidden'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type='button'
                className='bg-gray-900 inline-flex items-center justify-center p-1 rounded-md text-white hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                {!isOpen ? (
                  <i class='fas fa-bars'></i>
                ) : (
                  <i class='fas fa-times'></i>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          {(ref) => (
            <div className='lg:hidden' id='mobile-menu'>
              <div ref={ref} className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                {isAuthenticated ? authMobileLinks : guestLinks}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateProps, { logout })(Navbar);
