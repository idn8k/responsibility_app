import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const STICKY_THRESHOLD = 80;

// HOlding space in the document to prevent jumping:
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
  transition: all 0.1s ease-in;
  z-index: 99;

  // The position is based on the isSticky prop:
  position: ${(props) => (props.$isSticky ? 'fixed' : 'static')};
  top: ${(props) => (props.$isSticky ? `${STICKY_THRESHOLD}px` : '0')};
  left: 0;

  ${(props) =>
    props.$isSticky &&
    `
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.05);

  `}
`;

export default function SecondaryHeader({ children, isSticky: $isSticky }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  // Measure height on mount to set the placeholder size.
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <HeaderWrapper height={headerHeight}>
      <StyledSecondaryHeader ref={headerRef} $isSticky={$isSticky}>
        {children}
      </StyledSecondaryHeader>
    </HeaderWrapper>
  );
}
