import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

const STICKY_THRESHOLD = 80;

const HeaderWrapper = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
  width: 100%;
  margin-bottom: 12px;
`;

const StyledSecondaryHeader = styled.h2`
  background-color: #fff;
  color: var(--primary-color);
  text-align: center;
  width: 100%;
  padding: 12px 7px;

  transition: all 0.3s ease-in-out;
  z-index: 99;

  ${(props) =>
    props.isSticky &&
    `
    background-color: rgba(255, 255, 255, 0.95);
    position: fixed;
    top: ${STICKY_THRESHOLD}px;
    left: 0;
    right: 0;
    // box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.1);

  `}
`;

export default function SecondaryHeader({ children }) {
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const sentinelRef = useRef(null);
  const headerRef = useRef(null);

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
    <HeaderWrapper ref={sentinelRef} height={headerHeight}>
      <StyledSecondaryHeader ref={headerRef} isSticky={isSticky}>
        {children}
      </StyledSecondaryHeader>
    </HeaderWrapper>
  );
}
