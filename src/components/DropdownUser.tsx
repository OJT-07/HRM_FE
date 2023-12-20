import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import UserOne from '../images/user/user-01.png';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });


  return (
    <div className='relative'>
      <Link to='/profile' ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className='flex items-center gap-4'>
        <span className='hidden text-right lg:block'>
          <span className='block text-sm font-medium text-black dark:text-white'>Tech Tribe</span>
          <span className='block text-xs'>Human Resources</span>
        </span>

        <div className='h-12 w-12 overflow-hidden rounded-full'>
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt='User'
            className='w-full h-full object-cover rounded-full'
          />
        </div>
      </Link>
    </div>
  );
};

export default DropdownUser;
