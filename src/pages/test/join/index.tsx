import { useState } from "react";
import { Button } from "../../../components/elements/actions/buttons";
import { Link } from "../../../components/elements/actions/links";
import { Input } from "../../../components/elements/inputs/input";
import "./style.css"

const TestJoin = () => {

    const [ id, setId ] = useState<string>("");

    return (
        <div className="test_join_body width-wrap">
            <div className="test_join_head">
                Join using id
            </div>
            <div className="test_join_wrapper">
                <Input value={id} onChange={(e) => setId(e.target.value)} type="text" placeholder="Enter Test ID"/>
                <Link variant="fill" disabled={id === ""} to={`/test/${id}`}>Join</Link>
            </div>
        </div>
    )
}

export default TestJoin;