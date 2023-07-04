import { useEffect, useState } from "react"
import CreateTestForm from "../../../components/modules/createtest";
import { Question } from "../../../types/question";
import AddQuestionsPanel from "../../../components/modules/createtest/addquestions";
import Navigation from "../../../components/layouts/navigation";

export interface Test {
    name: string, 
    description: string,
    starts_at: string,
    duration: string,
	questions: Question[],
}

type RenderPageProps = {
	pageNumber: number;
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const RenderPage = ({ pageNumber, setPageNumber }: RenderPageProps) => {

    const [ currentTest, setCurrenttest ] = useState<Test | {}>({}); 

	switch(pageNumber) {
		case 0:
			return (<CreateTestForm state={currentTest} setState={setCurrenttest} setPage={setPageNumber}/>)
		default:
			return (<AddQuestionsPanel test={currentTest} setTest={setCurrenttest} setPage={setPageNumber} page={pageNumber}/>)
	}
}

const TestCreate = () => {
	
	const [ currentPage, setCurrentPage ] = useState<number>(0);

	useEffect(() => {
		// For alerting when leaving page
		window.onbeforeunload = (e) => {
			e.preventDefault();
			if (e) {
				e.returnValue = '';
			}
			return '';
		};
		return () => {
			window.onbeforeunload = null;
		}
	}, [])
	
	return (
		<div className="test-create" style={{ paddingTop: "5em"}}>
			<Navigation variant="fixed" disableHome/>
			<RenderPage pageNumber={currentPage} setPageNumber={setCurrentPage}/>
		</div>
	)
}

export default TestCreate
