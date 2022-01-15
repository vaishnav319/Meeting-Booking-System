import React from 'react';

const Description = () => {
  return (
    <div className=''>
      <div className='flex lg:flex-row md:flex-col flex-col container-1 z-20'>
        <div className=' flex-start'>
          {/* <div
            className=' bg-blue-600 opacity-25 h-lg max-w-lg z-10'
            style={{ borderRadius: '4rem' }}
          /> */}
          <img
            className=' px-4 h-lg max-w-lg'
            style={{ borderRadius: '4rem' }}
            src='https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVhY2hpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60/'
          />
          <div></div>
        </div>
        <div>
          {' '}
          <img
            className='px-4 h-lg max-w-lg'
            style={{ borderRadius: '4rem' }}
            src='https://images.unsplash.com/photo-1600675063834-ed9f440ab0d9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHRlYWNoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          />
        </div>
        <div>
          {' '}
          <img
            className='px-4 h-lg max-w-lg'
            style={{ borderRadius: '4rem' }}
            src='https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVhY2hpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60/'
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
