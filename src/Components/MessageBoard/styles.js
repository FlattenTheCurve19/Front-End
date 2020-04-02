// Styled components for message board component and children
import styled from 'styled-components';
import {Paper} from '@material-ui/core';
import theme from '../../Styles/theme';

export const Board = styled(Paper)`
    position: relative;
    padding-top: 30px;
    width: 400px;
    min-width: 400px;
    max-width: 600px;
    transition: .5s top;
    h1{
        margin-bottom: 30px;
        text-align: center;
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
    }
    h2{
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
    }
    h4{
        font-family: ${theme.font};
        font-weight: bold;
        margin-bottom: 10px;
    }
    p{
        font-family: ${theme.font};
    }
    .spinner{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .error{
        text-align: center;
    }
    .card-container{
        height: calc(100vh - 380px);
        overflow: scroll;
    }

    @media all and (max-width: 500px){
        position: fixed;
        top: ${props => props.toggled ? '0' : '100vh'};
        background: white;
        z-index: 1;
        width: 100%;
        height: 100vh;
    }
`;

export const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    margin: 20px 0;
    margin-left: 20px;
    margin-right: 10px;
    cursor: pointer;
    &:hover{
        transform: scale(1.01);
    }
    .container{
        display: flex;
        align-items: center;
        margin: 0;
        width: 100%;
        img{
            width: 80px;
            height: 80px;
            min-width: 80px;
            min-height: 80px;
            border-radius: 50%;
        }
        .content-container{
            margin-left: 10px;
        }
    }
    
`;

export const ToggleButton = styled(Paper)`
    z-index: 2;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;

    @media all and (min-width: 500px){
        display: none;
    }
`;

export const Form = styled.div`
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 20px;
    margin-top: 70px;
    height: 76px; 
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        .btn-container{
            display: flex;
            justify-content: flex-end;
            button{
                font-family: 'Raleway', sans-serif;
                font-size: 18px;
                width: 50%;
                height: 30px;
                margin: 10px 0;
                border: none;
                border-radius: 5px;
                background-color: #44cdcd;
                color: white;
                cursor: pointer;
                &:hover{
                    transform: scale(1.05);
                }
            }
        }
    }
    ${theme.breakpoints.tablet}{

    }
    
`;