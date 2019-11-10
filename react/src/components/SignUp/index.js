import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import * as ROLES from '../../constants/roles';
import { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
import logo from '../../logo2.png';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const SignUpPage = () => (
  
  <div className="Landing-header">
    <Typography variant = "h2" className = "resitration">Register</Typography>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>  </div>
);

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  age: 'SelectAge',
  grade: 'SelectGrade',
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  interested: [],
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }
  onSubmit = event => {
    const { firstname, lastname, age, grade, username, email, passwordOne, interested} = this.state;
    const roles = {};

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstname, 
            lastname,
            age,
            grade,
            username,
            email,
            passwordOne,
            interested,
            roles,
          },
          { merge: true },
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {  
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
        
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeGoals = event => {
    const goals = this.state.interested;
    let index;

    // check if the check box is checked or unchecked
    if (event.target.checked) {
      // add the numerical value of the checkbox to options array
      goals.push(event.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = goals.indexOf(event.target.value)
      goals.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ goals: goals })
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
      firstname,
      lastname,
      age,
      grade,
      username,
      email,
      passwordOne,
      passwordTwo,
      interested,
      error,
    } = this.state;
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit}>
       <ul style = {{listStyle: "none"}}>
      <li>
      <Typography style = {{marginTop: '20px'}}>Full Name</Typography>
        <TextField  required variant= "outlined" label = "First Name" name="firstname" value={firstname} onChange={this.onChange} /> 
        <TextField required variant= "outlined"  label = "Last Name" name="lastname"  value={lastname} onChange={this.onChange} />
      </li>
      <li>
      <Typography  style = {{marginTop: '20px'}}>Age</Typography>
        <Select label = "age" name="age" value = {age} onChange = {this.onChange} inputProps ={{name: 'age'}}>
              <MenuItem value = {"SelectAge"}>Select Age</MenuItem>
              <MenuItem value = {"1"}>1</MenuItem>
              <MenuItem value = {"2"}>2</MenuItem>
              <MenuItem value = {"3"}>3</MenuItem>
              <MenuItem value = {"4"}>4</MenuItem>
              <MenuItem value = {"5"}>5</MenuItem>
              <MenuItem value = {"6"}>6</MenuItem>
              <MenuItem value = {"7"}>7</MenuItem>
              <MenuItem value = {"8"}>8</MenuItem>
              <MenuItem value = {"9"}>9</MenuItem>
              <MenuItem value = {"10"}>10</MenuItem>
              <MenuItem value = {"11"}>11</MenuItem>
              <MenuItem value = {"12"}>12</MenuItem>
              <MenuItem value = {"13"}>13</MenuItem>
              <MenuItem value = {"14"}>14</MenuItem>
              <MenuItem value = {"15"}>15</MenuItem>
              <MenuItem value = {"16"}>16</MenuItem>
              <MenuItem value = {"17"}>17</MenuItem>
              <MenuItem value = {"18"}>18</MenuItem>
              <MenuItem value = {"19"}>19</MenuItem>
              <MenuItem value = {"20"}>20</MenuItem>
              <MenuItem value = {"21"}>21</MenuItem>
              <MenuItem value = {"22"}>22</MenuItem>
              <MenuItem value = {"23"}>23</MenuItem>
              <MenuItem value = {"24"}>24</MenuItem>
              <MenuItem value = {"25"}>25</MenuItem>
              <MenuItem value = {"26"}>26</MenuItem>
              <MenuItem value = {"27"}>27</MenuItem>
              <MenuItem value = {"28"}>28</MenuItem>
              <MenuItem value = {"29"}>29</MenuItem>
              <MenuItem value = {"30"}>30</MenuItem>
              <MenuItem value = {"31"}>31</MenuItem>
              <MenuItem value = {"32"}>32</MenuItem>
              <MenuItem value = {"33"}>33</MenuItem>
              <MenuItem value = {"34"}>34</MenuItem>
              <MenuItem value = {"35"}>35</MenuItem>
              <MenuItem value = {"36"}>36</MenuItem>
              <MenuItem value = {"37"}>37</MenuItem>
              <MenuItem value = {"38"}>38</MenuItem>
              <MenuItem value = {"39"}>39</MenuItem>
              <MenuItem value = {"40"}>40</MenuItem>
              <MenuItem value = {"41"}>41</MenuItem>
              <MenuItem value = {"42"}>42</MenuItem>
              <MenuItem value = {"43"}>43</MenuItem>
              <MenuItem value = {"44"}>44</MenuItem>
              <MenuItem value = {"45"}>45</MenuItem>
              <MenuItem value = {"46"}>46</MenuItem>
              <MenuItem value = {"47"}>47</MenuItem>
              <MenuItem value = {"48"}>48</MenuItem>
              <MenuItem value = {"49"}>49</MenuItem>
              <MenuItem value = {"50"}>50</MenuItem>
              <MenuItem value = {"51"}>51</MenuItem>
              <MenuItem value = {"52"}>52</MenuItem>
              <MenuItem value = {"53"}>53</MenuItem>
              <MenuItem value = {"54"}>54</MenuItem>
              <MenuItem value = {"55"}>55</MenuItem>
              <MenuItem value = {"56"}>56</MenuItem>
              <MenuItem value = {"57"}>57</MenuItem>
              <MenuItem value = {"58"}>58</MenuItem>
              <MenuItem value = {"59"}>59</MenuItem>
              <MenuItem value = {"60"}>60</MenuItem>
              <MenuItem value = {"61"}>61</MenuItem>
              <MenuItem value = {"62"}>62</MenuItem>
              <MenuItem value = {"63"}>63</MenuItem>
              <MenuItem value = {"64"}>64</MenuItem>
              <MenuItem value = {"65"}>65</MenuItem>
              <MenuItem value = {"66"}>66</MenuItem>
              <MenuItem value = {"67"}>67</MenuItem>
              <MenuItem value = {"68"}>68</MenuItem>
              <MenuItem value = {"69"}>69</MenuItem>
              <MenuItem value = {"70"}>70</MenuItem>
              <MenuItem value = {"71"}>71</MenuItem>
              <MenuItem value = {"72"}>72</MenuItem>
              <MenuItem value = {"73"}>73</MenuItem>
              <MenuItem value = {"74"}>74</MenuItem>
              <MenuItem value = {"75"}>75</MenuItem>
              <MenuItem value = {"76"}>76</MenuItem>
              <MenuItem value = {"77"}>77</MenuItem>
              <MenuItem value = {"78"}>78</MenuItem>
              <MenuItem value = {"79"}>79</MenuItem>
              <MenuItem value = {"80"}>80</MenuItem>
              <MenuItem value = {"81"}>81</MenuItem>
              <MenuItem value = {"82"}>82</MenuItem>
              <MenuItem value = {"83"}>83</MenuItem>
              <MenuItem value = {"84"}>84</MenuItem>
              <MenuItem value = {"85"}>85</MenuItem>
              <MenuItem value = {"86"}>86</MenuItem>
              <MenuItem value = {"87"}>87</MenuItem>
              <MenuItem value = {"88"}>88</MenuItem>
              <MenuItem value = {"89"}>89</MenuItem>
              <MenuItem value = {"90"}>90</MenuItem>
              <MenuItem value = {"91"}>91</MenuItem>
              <MenuItem value = {"92"}>92</MenuItem>
              <MenuItem value = {"93"}>93</MenuItem>
              <MenuItem value = {"94"}>94</MenuItem>
              <MenuItem value = {"95"}>95</MenuItem>
              <MenuItem value = {"96"}>96</MenuItem>
              <MenuItem value = {"97"}>97</MenuItem>
              <MenuItem value = {"98"}>98</MenuItem>
              <MenuItem value = {"99"}>99</MenuItem>
              <MenuItem value = {"100"}>100</MenuItem>
            </Select>
      </li>
      <li>
      <Typography  style = {{marginTop: '20px'}}>Grade</Typography>
        <Select label = "grade" name="grade" value = {grade} onChange = {this.onChange} inputProps ={{name: 'grade'}}>
              <MenuItem value = {"SelectGrade"}>Select Grade</MenuItem>
              <MenuItem value = {"Kinder"}>Kindergarten</MenuItem>
              <MenuItem value = {"1st"}>1st Grade</MenuItem>
              <MenuItem value = {"2nd"}>2nd Grade</MenuItem>
              <MenuItem value = {"3rd"}>3rd Grade</MenuItem>
              <MenuItem value = {"4th"}>4th Grade</MenuItem>
              <MenuItem value = {"5th"}>5th Grade</MenuItem>
              <MenuItem value = {"6th"}>6th Grade</MenuItem>
              <MenuItem value = {"7th"}>7th Grade</MenuItem>
              <MenuItem value = {"8th"}>8th Grade</MenuItem>
              <MenuItem value = {"9th"}>9th Grade</MenuItem>
              <MenuItem value = {"10th"}>10th Grade</MenuItem>
              <MenuItem value = {"11th"}>11th Grade</MenuItem>
              <MenuItem value = {"12th"}>12th Grade</MenuItem>
              <MenuItem value = {"College"}>College</MenuItem>
              <MenuItem value = {"Post-School"}>Post-School</MenuItem>
            </Select>
      </li>
      <li>
        <Typography  style = {{marginTop: '20px'}}>Username</Typography>
        <TextField required variant= "outlined"  label = "Username" name="username" value={username} onChange={this.onChange} />
      </li>
      <li>
        <Typography style = {{marginTop: '20px'}}>Email </Typography>
        <TextField required variant= "outlined"  label = "Email" name="email" value={email} onChange={this.onChange}/>
      </li>
      <li>
        <Typography style = {{marginTop: '20px'}}>Password </Typography>
        <TextField required variant= "outlined"  label = "Password" type="password" name="passwordOne" value={passwordOne} onChange={this.onChange}/>
      </li>
      <li>
        <Typography style = {{marginTop: '20px'}}>Confirm Password </Typography>
        <TextField required variant= "outlined" label = "Confirm Password" type="password" name="passwordTwo" value={passwordTwo} onChange={this.onChange}/>
      </li>
      <li>
        <Typography  style = {{marginTop: '20px'}}>Interested Goals</Typography>
        <FormControl>
          <FormGroup>
            <FormControlLabel control= {<Checkbox value = {"Goal1"} onChange={this.onChangeGoals.bind(this)}/>} label="No Poverty"/>
            <FormControlLabel control= {<Checkbox value = {"Goal2"} onChange={this.onChangeGoals.bind(this)}/>} label="Zero Hunger"/>
            <FormControlLabel control= {<Checkbox value = {"Goal3"} onChange={this.onChangeGoals.bind(this)}/>} label="Good Health and Well-being"/>
            <FormControlLabel control= {<Checkbox value = {"Goal4"} onChange={this.onChangeGoals.bind(this)}/>} label="Quality Education"/>
            <FormControlLabel control= {<Checkbox value = {"Goal5"} onChange={this.onChangeGoals.bind(this)}/>} label="Gender Equality"/>
            <FormControlLabel control= {<Checkbox value = {"Goal6"} onChange={this.onChangeGoals.bind(this)}/>} label="Clean Water and Sanitation"/>
            <FormControlLabel control= {<Checkbox value = {"Goal7"} onChange={this.onChangeGoals.bind(this)}/>} label="Affordable and Clean Energy"/>
            <FormControlLabel control= {<Checkbox value = {"Goal8"} onChange={this.onChangeGoals.bind(this)}/>} label="Decent Work and Economic Growth"/>
            <FormControlLabel control= {<Checkbox value = {"Goal9"} onChange={this.onChangeGoals.bind(this)}/>} label="Industry, Innovation and Infrastructure"/>
            <FormControlLabel control= {<Checkbox value = {"Goal10"} onChange={this.onChangeGoals.bind(this)}/>} label="Reduced Inequality"/>
            <FormControlLabel control= {<Checkbox value = {"Goal11"} onChange={this.onChangeGoals.bind(this)}/>} label="Sustainable Cities and Communities"/>
            <FormControlLabel control= {<Checkbox value = {"Goal12"} onChange={this.onChangeGoals.bind(this)}/>} label="Responsible Comsumption and Production"/>
            <FormControlLabel control= {<Checkbox value = {"Goal13"} onChange={this.onChangeGoals.bind(this)}/>} label="Climate Action"/>
            <FormControlLabel control= {<Checkbox value = {"Goal14"} onChange={this.onChangeGoals.bind(this)}/>} label="Life Below Water"/>
            <FormControlLabel control= {<Checkbox value = {"Goal15"} onChange={this.onChangeGoals.bind(this)}/>} label="Life on Land"/>
            <FormControlLabel control= {<Checkbox value = {"Goal16"} onChange={this.onChangeGoals.bind(this)}/>} label="Peace and Justice Strong Institiutions"/>
            <FormControlLabel control= {<Checkbox value = {"Goal17"} onChange={this.onChangeGoals.bind(this)}/>} label="Partnerships to achieve the Goal"/>
          </FormGroup>
        </FormControl>
      </li>
      
        <Button variant = "contained" style = {{margin: '20px'}} className = "cancel-button" ><Link to = {ROUTES.LANDING} className = "link">Cancel</Link></Button> 

        <Button variant = "contained" style = {{margin: '20px', backgroundColor: '#60B2E5'}} disabled={isInvalid} className = "signup-button" type="submit">Register</Button>
        {error && <Typography>{error.message}</Typography>}

        </ul>

    
      </form>
    );
  }
}
const SignUpLink = () => (
  <Typography>
    Don't have an account? <Link to={ROUTES.SIGN_UP} style= {{color: "#2A2D34"}}>Sign Up</Link>
    </Typography>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };