import React, {useEffect, useState} from 'react';

const RewardPunishment = ({ isCorrect }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000); // Hide the emoji after 3 seconds (3000 milliseconds)

    return () => clearTimeout(timeout); // Clean up the timeout on component unmount or re-render
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return visible ? (
    <>
      {isCorrect ? (
        <>
          <div className="indicator-item indicator-middle indicator-center text-8xl">
            <span className='animate-ping flex flex-row-reverse text-success flex-wrap'>👍 Nooice!</span>
          </div>
        </>
      ) : (
        <>
          <div className="indicator-item indicator-middle indicator-center text-8xl">
            <span className='animate-ping flex flex-row-reverse text-error'>👎 Oops!</span>
          </div>
        </>
      )}
    </>
  ) : null;
};

export default RewardPunishment;
