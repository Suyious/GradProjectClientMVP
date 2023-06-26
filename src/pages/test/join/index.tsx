import { Button } from "../../../components/elements/actions/buttons";
import { Input } from "../../../components/elements/inputs/input";
import "./style.css"

const TestJoin = () => {
    return (
        <div className="test_join_body width-wrap">
            <div className="test_join_head">
                Join using id
            </div>
            <div className="test_join_wrapper">
                <Input type="text" placeholder="Enter Test ID"/>
                <Button>Join</Button>
            </div>
        </div>
    )
}

export default TestJoin;