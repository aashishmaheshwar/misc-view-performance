import { css } from '@emotion/react';

export const measurementsContainerStyles = () => css`

    .measurements-container {
        flex-direction: row;
    }

    .measurements-detail-container {
        overflow-y: scroll;
        margin-top: 10px;
    }
    
    @media only screen and (max-width: 550px) {
        .measurements-container {
            flex-direction: column;
            margin-top: 0;

            & > .chakra-stack {
                padding-top: 10px;
                margin: auto; 
            }
        }
    }

    
    @media only screen and (min-width: 550px) {
        .measurements-detail-container {
            height: 55vh;
        }
    }

    @media only screen and (max-width: 550px) {
        .measurements-detail-container {
            height: 40vh;
        }
    }

`;