import logo from '../images/logo.png';
import React, {useState, Component} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({signUp}) => {

    const[firstname, setFirstname] = useState()
    const[lastname, setLastname] = useState()
    const[username, setUsername] = useState();
    const[email, setEmail] = useState();
    const[password, setPassword] = useState(); 
    const [checked, setChecked] = useState();

    async function signupUser(credentials){
        return fetch('http://localhost:8000/api/signup/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
        .catch(err => console.log(err))
    }
    
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handleSignup = async e => {
        e.preventDefault();
        if (username === undefined){
          alert("Please input a valid username!");
        }
        else if (email === undefined){
            alert("Please input a valid email!");
        }
        else if(!validRegex.test(email)){
            alert("email is not in the correct format!");

        }
        else if (password.length < 8){
            alert("Please make sure your password length is more than 8 characters!");
        }
        //checking if password is only digits or only letters
        else if(/^\d+$/.test(password) || /^[a-zA-Z]+$/.test(password)){        
            alert("Please make sure password contains letters AND numbers")
        }
        else if (checked === undefined){
            alert("Please read and accept the GDPR policy!");
        }
        else {
            
            const newItem = {
                firstname,
                lastname,
                username,
                email,
                password
            }

            const res = await signupUser(newItem);
            let response = JSON.stringify(res);
            if(response.includes("ERROR")){
                alert("Username "+JSON.parse(response).username+" already exists, please try logging in with that username or create a new account");
            }
            else{
                alert("Sign Up Successful! You will now be directed to the Sign In Page");
                window.location.reload(false);
                window.location.replace("http://localhost:3000/")
            }
        }
      }    


    return (
        <>
        <img src = {logo} className = "rightBigLogo"></img>
        <div className = "signUpForm">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
                <input type = "first name" placeholder="First Name (Optional)" onChange={e => setFirstname(e.target.value)}/>
                <input type = "last name" placeholder="Last Name (Optional)" onChange={e => setLastname(e.target.value)}/>
                <input type = "text" placeholder="Username (Display Name)" onChange={e => setUsername(e.target.value)}/>
                <input type = "email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <input type = "password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <input className = "loginButton" type='submit' value = "SIGN UP"/>
                <br /><br /><br />
                <div className = "scrollable">
                Venture Privacy Policy
    <br />This privacy policy together with the application terms and conditions will explain the personal data we collect from you and how we process it when you use Venture.
    <br />What data do we collect and store from you? 
    <br />Personal identification Information : The information you give us may include your first name, last name, age, gender, and any other demographic data.
    <br />Profile data : Ιnformation is given when filling forms on the App, when you download / register in our app, provide feedback and survey responses. It also includes your username,password and your preferences. 
    <br />Contact Information : may include billing address, email address and telephone number.
    <br />Device Information : What type of mobile device you use, a unique device identifier, mobile network information, internet protocol (IP) address, browser type and version and your mobile operating system.
    <br />Location information : We use GPS technology to collect location data to display the location tracking feature of the app. These include marked locations, current locations, travel destinations and previous locations.
    <br />Usage Data : Ιnformation about how you use our App and services.
    <br />Marketing and Communications Data : Your preferences in receiving marketing for us and our third parties and your communication preferences.
    <br />How do we collect your data?
    <br />You directly provide Venture with most of the data we collect. We collect and process data when you:
    <br />Direct interactions : You may provide us with your Personal Identification, Profile,Contact, Device, Location Information Data by filling in forms or contacting us. This includes personal data when you install/ uninstall, login/register with Venture, request marketing and accessibility preferences and provide feedback.
    <br />Automated technologies : As you interact with Venture, we may automatically collect Device Data, by using server logs and similar technologies. 
    <br />Using our location-enabled Services : They require your Location information data for the feature to work, and if you wish to use this, you will be asked to consent to your data being used for this purpose.
    <br />Venture may also receive your data indirectly from third parties or public sources: 
    <br />Technical Data from analytics providers and advertising networks.
    <br />Identity and Contact Data from publicly available sources and data brokers.
    <br />Purposes for using your data (what will we use your data for)
    <br />Venture will only use your personal data when the law allows us to. We will process your data for the following reasons : 
    <br />To register you as a new customer.
    <br />To manage our relationship with you which will include notifying you about changes to our terms or privacy policy, and asking for feedback.
    <br />To administer and protect our business and website for issues including but not limited to data analysis, testing and system maintenance,
    <br />To deliver relevant website content and advertisements to you.
    <br />To use data analytics to improve our website, products and services, customer experience and marketing.
    <br />To make suggestions and recommendations about services that may be of interest to you.
    <br />Storing your data
    <br />The data that we collect from you will be stored at a destination within the European Economic Area (EEA). It will also be processed by staff operating inside the EEA who work for us or for one of our suppliers. In addition, your data is accessible by support personnel at vApp, our data processor, who are the authors of Venture. By submitting your personal data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy. Venture will only retain your personal data for as long as necessary to fulfil the purposes we collected it for. To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.
    <br />Details of our retention periods are as follows:
    <br />Personal, profile, contact, marketing data and Device and Usage data: . When you provide us your consent, we will retain those records for marketing purposes for 4 years or until such time as you choose to opt out of the receipt of our marketing material. 
    <br />Location information data: We will use this information to enable our Location Tracking functionality, at which point it will then be destroyed unless you provide us with your specific to retain your details on record to use on future trips.
    <br />Marketing
    <br />Venture provides you with choices regarding personal data uses, around marketing and advertising.
    <br />Promotional offers : Venture may use your data  to send you information about products and services of ours that we think you might like, as well as those of our partner companies. You will receive marketing communications from us if you have requested information, provided feedback and in case you have not opted out of receiving that marketing.
    <br />Third-party marketing : We require your opt-in consent before we share your data with any third party company.
    <br />You can always opt out of receiving marketing messages by us at any time by logging into the App, and checking or unchecking relevant boxes to adjust your marketing preferences.You have the right at any time to stop Venture from contacting you for marketing purposes or giving your data to other members of the Venture Group.
    <br />What are your data protection rights?
    <br />The right to access – You have the right to request Venture for copies of your personal data. We may charge you a small fee for this service.
    <br />The right to rectification – You have the right to request that Venture correct any information you believe is inaccurate. You also have the right to request Venture to complete the information you believe is incomplete.
    <br />The right to erasure – You have the right to request that Venture erase your personal data, under certain conditions.
    <br />The right to restrict processing – You have the right to request that Venture restrict the processing of your personal data, under certain conditions.
    <br />The right to object to processing – You have the right to object to Venture processing of your personal data, under certain conditions.
    <br />The right to data portability – You have the right to request that Venture transfer the data that we have collected to another organisation, or directly to you, under certain conditions.
    <br />Cookie policy 
    <br />We do not use any cookies.
    <br />Contact details
    <br />If you have any questions about Venture’s privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us. Our full details are : 
    <br />Full name of legal entity : Venture, Inc.
    <br />Name or title of DPM : Maria Christogeorgi, Chief Technology Officer
    <br />Email address : mariachristogeorgi.venture@gmail.com
    <br />Phone number : +44 (0) 7934266547
    <br />Postal address :  Venture App Offices, Edgbaston , Birmingham , B15 2TT
                </div>
                <p>By using our website you agree to the GDPR policy </p>
                <input type = "checkbox" id = "check" onChange={e => setChecked(e.target.value)}/>
        </form>
        {/* <div className='signUpForm'> */}
            <p>Back to <NavLink className = "orangeLink" to = "/">Sign In!</NavLink></p>
        {/* </div> */}
        </div>
        
        </>
    )
}

export default SignUp;