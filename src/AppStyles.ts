import { css } from '@emotion/react';

export const appStyles = () => css`
    /** scroll bar **/
    
      *::-webkit-scrollbar {
        width: 10px;
      }
      /* Track */
      *::-webkit-scrollbar-track {
        background: #f1f1f1;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
        border-radius: 100px;
      }
      
      /* Handle */
      *::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 100px;
        height: 100px;
      }
      
      /* Handle on hover */
      *::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
`;