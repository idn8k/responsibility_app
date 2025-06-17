// import { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const StyledSecondaryHeader = styled.h2`
//   position: ${(props) => (props.isSticky ? 'fixed' : 'static')};
//   transition: top 0.3s;

//   top: ${(props) => (props.isSticky ? '80px' : '100px')};
//   background-color: #fff;
//   color: var(--primary-color);
//   margin: 0px 0 32px 0;
//   width: ${(props) => (props.isSticky ? '100%' : '86%')};
//   padding: 6px 0;
//   box-shadow: inset 0px -4px 0px -3px rgba(0, 0, 0, 0.1);

//   z-index: 99;
// `;

// export default function SecondaryHeader({ children }) {
//   const [isSticky, setIsSticky] = useState(false);

//   const handleScroll = () => {
//     const headerElement = document.querySelector('h2').getBoundingClientRect().top;
//     console.log(headerElement);
//     if (headerElement <= 80 && !isSticky) {
//       setIsSticky(true);
//     } else if (headerElement > 80 && isSticky) {
//       setIsSticky(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return <StyledSecondaryHeader isSticky={isSticky}>{children}</StyledSecondaryHeader>;
// }

// components/SecondaryHeader.js

import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

const STICKY_THRESHOLD = 80;

const HeaderWrapper = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
`;

const StyledSecondaryHeader = styled.h2`
  background-color: #fff;
  color: var(--primary-color);
  padding: 12px 7%;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  margin-bottom: 20px;
  text-align: center;

  width: 100%;

  z-index: 99;

  // FIX:
  ${(props) =>
    props.isSticky &&
    `
    position: fixed;
    width:100%;
    top: ${STICKY_THRESHOLD}px;

      left: 0;
      right: 0;

      text-align:center;
  `}
`;

export default function SecondaryHeader({ children }) {
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // This ref now points to the WRAPPER (our sentinel)
  const sentinelRef = useRef(null);

  // We need a separate ref for the actual header to measure its height
  const headerRef = useRef(null);

  // On mount, measure the true height of the header content
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (sentinelRef.current) {
      const rect = sentinelRef.current.getBoundingClientRect();
      const isCurrentlySticky = rect.top <= STICKY_THRESHOLD;

      if (isCurrentlySticky !== isSticky) {
        setIsSticky(isCurrentlySticky);
      }
    }
  }, [isSticky]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    // The wrapper holds the space and is the element we track.
    <HeaderWrapper ref={sentinelRef} height={headerHeight}>
      <StyledSecondaryHeader ref={headerRef} isSticky={isSticky}>
        {children}
      </StyledSecondaryHeader>
    </HeaderWrapper>
  );
}
