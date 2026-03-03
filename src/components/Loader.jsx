import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loadingspinner">
        <div id="square1" />
        <div id="square2" />
        <div id="square3" />
        <div id="square4" />
        <div id="square5" />
      </div>
      <p className="loading-text">Preparing Archive</p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .loading-text {
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    color: #444;
    margin-top: 20px;
  }

  .loadingspinner {
    --square: 24px;
    --offset: 30px;
    --duration: 2.4s;
    --delay: 0.2s;
    --timing-function: cubic-bezier(0.76, 0, 0.24, 1);
    width: calc( 3 * var(--offset) + var(--square));
    height: calc( 2 * var(--offset) + var(--square));
    position: relative;
  }

  .loadingspinner div {
    display: inline-block;
    background: #f97316; /* Tailwinds Orange-500 */
    border-radius: 4px;
    width: var(--square);
    height: var(--square);
    position: absolute;
  }
  
  /* ... (Rest of the keyframes remain same as your original, just ensure the color and ease-in-out is smooth) */

  .loadingspinner #square1 {
    left: calc( 0 * var(--offset) );
    top: calc( 0 * var(--offset) );
    animation: square1 var(--duration) var(--delay) var(--timing-function) infinite;
  }
  .loadingspinner #square2 {
    left: calc( 0 * var(--offset) );
    top: calc( 1 * var(--offset) );
    animation: square2 var(--duration) var(--delay) var(--timing-function) infinite;
  }
  .loadingspinner #square3 {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
    animation: square3 var(--duration) var(--delay) var(--timing-function) infinite;
  }
  .loadingspinner #square4 {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
    animation: square4 var(--duration) var(--delay) var(--timing-function) infinite;
  }
  .loadingspinner #square5 {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
    animation: square5 var(--duration) var(--delay) var(--timing-function) infinite;
  }

  @keyframes square1 { 0% { left:0; top:0; } 8.33% { left:0; top:var(--offset); } 100% { left:0; top:var(--offset); } }
  @keyframes square2 { 0% { left:0; top:var(--offset); } 8.33% { left:0; top:calc(2*var(--offset)); } 16.67% { left:var(--offset); top:calc(2*var(--offset)); } 25% { left:var(--offset); top:var(--offset); } 83.33% { left:var(--offset); top:var(--offset); } 91.67% { left:var(--offset); top:0; } 100% { left:0; top:0; } }
  @keyframes square3 { 0%,100% { left:var(--offset); top:var(--offset); } 16.67% { left:var(--offset); top:var(--offset); } 25% { left:var(--offset); top:0; } 33.33% { left:calc(2*var(--offset)); top:0; } 41.67% { left:calc(2*var(--offset)); top:var(--offset); } 66.67% { left:calc(2*var(--offset)); top:var(--offset); } 75% { left:calc(2*var(--offset)); top:calc(2*var(--offset)); } 83.33% { left:var(--offset); top:calc(2*var(--offset)); } 91.67% { left:var(--offset); top:var(--offset); } }
  @keyframes square4 { 0% { left:calc(2*var(--offset)); top:var(--offset); } 33.33% { left:calc(2*var(--offset)); top:var(--offset); } 41.67% { left:calc(2*var(--offset)); top:calc(2*var(--offset)); } 50% { left:calc(3*var(--offset)); top:calc(2*var(--offset)); } 58.33% { left:calc(3*var(--offset)); top:var(--offset); } 100% { left:calc(3*var(--offset)); top:var(--offset); } }
  @keyframes square5 { 0% { left:calc(3*var(--offset)); top:var(--offset); } 50% { left:calc(3*var(--offset)); top:var(--offset); } 58.33% { left:calc(3*var(--offset)); top:0; } 66.67% { left:calc(2*var(--offset)); top:0; } 75% { left:calc(2*var(--offset)); top:var(--offset); } 100% { left:calc(2*var(--offset)); top:var(--offset); } }
`;

export default Loader;