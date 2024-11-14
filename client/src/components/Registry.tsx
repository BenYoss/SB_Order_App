import react, {useState, useEffect}from 'react';

import Toolbar from './toolbar/Toolbar';

import { createUser, sendVerificationCode, updatePassword, validateVerificationCode } from '../helpers/apiHelpers';
import Footer from './toolbar/Footer';
import Modal from './styleComponents/Modal';
import { AnimatePresence } from 'framer-motion';
import { ErrorInterface } from '../interfaces/errorInterface';
interface UserInterface {
    username: string,
    email: string,
    phone: string,
    password: string,
    repassword: string,
};


export default function Registry() {

    const [error, setError] = useState<ErrorInterface>({
        errorName: '',
        errorDescription: '',
        errorType: ''
    });

    const [userInformation, setUserInformation] = useState<UserInterface>(
        {
            "username": '',
            "email": '',
            "phone": '',
            "password": '',
            "repassword": ''
        }
    );

    const [awaitingVerify, setAwaitingVerify] = useState<boolean>(false);
    const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
    const [exited, setExited] = useState<boolean>(false);


    useEffect(() => {

        console.log(exited);
        if (exited) {
            setExited(false);
            setError({
                errorName: '',
                errorDescription: '',
                errorType: ''
            });
            setAwaitingVerify(false);
        }
    });

    const handleVerificationCode = async (code: string) => {
        
        const result = await validateVerificationCode(code);

        if (result) {
            await handleUserSubmission()
            setVerifySuccess(true);
            setTimeout(() => {
                setAwaitingVerify(false);
            }, 1000);
        }

    }

    const handleEmailVerification = async () => {
        
        type ElementType = 'username' 
        | 'email' 
        | 'phone' 
        | 'password' 
        | 'repassword'
        
        let element: ElementType;
        for (element in userInformation) {
            if (userInformation[element].length == 0) {
                setError({
                    errorName: "Registry Failed",
                    errorDescription: "Please fill in all form elements.",
                    errorType: "register"
                })
                return;
            }
        }
        await sendVerificationCode(userInformation.email);
        setAwaitingVerify(true);
    }
    
    const handleUserInformation = (_event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = _event.target;
        
        setUserInformation(
           (prevInfo: UserInterface) => {
                return {
                    ...prevInfo,
                    [id]: value,
                }
           });
    };

    const handleUserSubmission = async () => {
        
        await createUser(userInformation)
        .catch(err => console.error(err));
        await updatePassword(userInformation.username, userInformation.password)
        .catch(err => console.error(err));
        window.location.href = '/login';
    }

    /**==============================================
     * *           FORM INPUT INFORMATION
     *   
     *   username, email, phone, password, confirm, street, city, zip, country
, credit, expiry, type
     *
     *=============================================**/
    return (
        <div id="registry-container" className='page'>
            <Toolbar session={null} />
            <AnimatePresence>
                {
                    awaitingVerify && !exited ? (
                        <Modal
                        title={'Verifying Email'}
                        variant={'verification'}
                        body={{
                            header: null,
                            text: `To verify it's you, we have sent an email to ${userInformation.email}.` +
                            'Please enter the code to verify.',
                            buttonRoute: null,
                            inputRequired: true,
                            inputHandler: handleVerificationCode,
                            inputResult: verifySuccess
                        }}
                        setExited={setExited}
                        />
                    ) : null
                }
                 {
                    error.errorDescription.length && !exited ? (
                        <Modal 
                        title={error.errorName}
                        variant="urgent"
                        body={{
                            header: null,
                            text: `${error.errorDescription}`,
                            buttonRoute: null,
                            inputRequired: false,
                            inputHandler: null,
                            inputResult: false,
                        }}
                        setExited={setExited}
                        />
                    ) : null
                }
            </AnimatePresence>
            <div id="registry-window">
                <div id="registry-header">
                    <h1 className="hdr large inverse" id="registry-header-text">
                        Create an Account
                    </h1>
                </div>
                <form onSubmit={handleUserSubmission} id="registry-body">
                
                    
                    <input className="form-input" type="text" id="username" onChange={handleUserInformation} placeholder="Username"value={userInformation.username}/>
                    
                    <input className="form-input" type="text" id="email" onChange={handleUserInformation} placeholder="Email"value={userInformation.email}/>
                    
                    <input className="form-input" type="text" id="phone" onChange={handleUserInformation} placeholder="Phone Number"value={userInformation.phone}/>
                    
                    <input className="form-input" type="password" id="password" onChange={handleUserInformation} placeholder="Password"value={userInformation.password}/>
                    <input className="form-input" type="password" id="repassword" onChange={handleUserInformation} placeholder="Re-Enter Password"value={userInformation.repassword}/>
                    <button className="btn light" type="button" onClick={handleEmailVerification}>Sign Up</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
