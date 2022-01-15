import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { bookMeet } from '../../actions/meeting';
import { connect } from 'react-redux';
import { getRandomColor, createImageFromInitials } from '../../utils/ProfilPic';

const MentorItem = ({
  bookMeet,
  profile: {
    user: { _id, name, subject, avatar },
    location,
    timeSlots,
    bookedSlots,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({
    time: '',
  });
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const clickHandler = (e) => {
    setSelectedSlot({ time: e.target.value });
    console.log(selectedSlot);
  };
  return (
    <div className='transition duration-700 ease-in-out hover:shadow-2xl rounded-2xl m-10 p-5 mx-auto items-center'>
      <div className='p-4'>
        <div className=''>
          <div className='p-1'>
            <img
              className='w-full h-full rounded-2xl object-center object-cover ml-5'
              style={{ width: '10rem' }}
              src={
                avatar
                  ? avatar
                  : createImageFromInitials(250, name, 'sandybrown')
              }
            />
          </div>
          <div>
            <h2>Name: {name}</h2>
            <p className='my-1'>
              Location: {location && <span>{location}</span>}
            </p>
            <p className='my-1'>Subject: {subject && <span>{subject}</span>}</p>
          </div>

          <div className='flex lg:flex-row md:flex-row flex-col mt-8'>
            <div className='mt-3 mr-2 ml-10 md:ml-0 mb-4'>
              <Link
                to={`/mentor-profile/${_id}`}
                className='p-1  rounded-tr-3xl rounded-bl-3xl bg-purple-800 text-white font-semibold'
              >
                View Profile
              </Link>
            </div>
            <button
              onClick={openModal}
              className='p-1 rounded-tr-3xl rounded-bl-3xl bg-gray-800 text-white font-semibold'
            >
              Book Meet
            </button>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as='div'
                className='fixed inset-0 z-10 overflow-y-auto'
                onClose={closeModal}
              >
                <div className='min-h-screen px-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Dialog.Overlay className='fixed inset-0' />
                  </Transition.Child>

                  <span
                    className='inline-block h-screen align-middle'
                    aria-hidden='true'
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <div className='inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                      >
                        Time slots for mentor {name}
                      </Dialog.Title>
                      <form
                        onSubmit={(e) => {
                          console.log(_id, selectedSlot);
                          bookMeet(_id, selectedSlot);
                        }}
                      >
                        <div className='mt-2'>
                          {timeSlots.length === 0 ? (
                            <p>No time Slots available</p>
                          ) : (
                            ''
                          )}
                          {timeSlots.map((times) => (
                            <button
                              type='reset'
                              onClick={(e) => clickHandler(e)}
                              value={times.time}
                              key={times._id}
                              className=' mr-3 mb-2 text-center bg-gray-300 focus:bg-gray-500 focus:text-white p-1 cursor-pointer hover:bg-gray-500 hover:text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            >
                              {times.time}
                            </button>
                          ))}
                        </div>
                        <div className='mt-4'>
                          {timeSlots.length === 0 ? (
                            ''
                          ) : (
                            <button
                              type='submit'
                              className='p-1 text-purple-100 bg-gray-800  '
                              onClick={closeModal}
                            >
                              {selectedSlot
                                ? 'Confirm Booking'
                                : 'Select a slot'}
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
};

MentorItem.propTypes = {
  bookMeet: PropTypes.func.isRequired,
};

export default connect(null, { bookMeet })(MentorItem);
