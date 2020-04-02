// Styled components for message board component and children
import styled from 'styled-components';
import theme from '../../Styles/theme';

export const Board = styled.section`
    position: relative;
    padding-top: 30px;
    width: 400px;
    min-width: 400px;
    max-width: 600px;
    .mobile-container{
        h1{
            margin-bottom: 30px;
            text-align: center;
            font-family: ${theme.font};
            font-size: 20px;
        }
        h2{
            font-family: ${theme.font};
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 20px;
            text-align: center;
        }
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
    ${theme.breakpoints.tablet}{
        max-width: none;
        min-width: none;
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
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