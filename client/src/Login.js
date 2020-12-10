import React, { useState } from "react";
import IO from './IO'


const Login = (props) => {
	const [userName, setUsername] = useState('')

	console.log(props.roomId)
	return(
	<div>
		<h1>Welcome</h1>
        <span>Username: </span><input onChange={e => setUsername(e.target.value)} type="text" id="username"/>
        <button id="login" onClick={() => IO.login(userName, props.roomId)}>{props.roomId ? "Join Group" : "Create Group"}</button>
	</div>
	)

}

export default Login