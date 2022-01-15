import { Tab } from '@headlessui/react';
import Register from '../auth/Register';
import RegisterMentor from '../auth/RegisterMentor';
import { useParams } from 'react-router-dom';

export default function MyTabs() {
  var { type } = useParams();
  console.log(type);
  return (
    <div className='mx-auto '>
      <Tab.Group>
        <Tab.List>
          <Tab className='p-1 border-b-2 border-black'>Signup as a Student</Tab>
          <Tab className='p-1 border-b-2 border-black'> Signup as a Mentor</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Register />
          </Tab.Panel>
          <Tab.Panel>
            <RegisterMentor />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
