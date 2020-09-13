import React, { useContext } from 'react';
import { AturSesi } from '../ceksesi/AturSesi';

function Login() {
	const { dispatch } = useContext(AturSesi);

	const handleSubmit = () => {
		const user = {
			token: Math.random().toString(36).substring(7)
		};

		localStorage.setItem('session', JSON.stringify(user));
		dispatch({
			type: 'SET_SESSION',
			payload: user
		});
    };
    
	return (
				<form onSubmit={() => handleSubmit()}>
					<br />
                    <h3> Login To Movies Editor</h3>
					<br />
					<table style={{width:"30%"}}> 
                    <tbody style={{borderRadius:"10px",padding:"10px"}}>
                        <tr>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> UserName</td>
                            <td>
                                <input
                                    type="text"
                                    label="Email"
                                    required
                                />
                            </td>
                         </tr>
                         <tr>
                             <td>
                                 Password
                             </td>
                            <td>      
                            <input
                                type="password"
                                label="Password"
                                required
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                <button type="submit">
                                    LOGIN
                                </button>
                            </td>
                        </tr>
                      </tbody>
                    </table>
				</form>
	);
}

export default Login;