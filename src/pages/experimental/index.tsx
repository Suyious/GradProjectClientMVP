import { useState } from "react"
import { Input } from "../../components/elements/inputs/input"
import Container from "../../components/layouts/container"

const Experimental = () => {

	return (
		<Container.Flex style={{ height: "100vh"}} className="experimental width-wrap">
			<Input type="email" placeholder="hello@friend.com" label="Email" error="Give Error Bro!"/>
		</Container.Flex>
	)
}

export default Experimental
