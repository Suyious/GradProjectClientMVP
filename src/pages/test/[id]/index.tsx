import "./style.css"
import { useNavigate, useParams } from "react-router-dom"
import { useGetTestAllRegistrationsQuery, useGetTestByIdQuery, useRegisterForTestMutation } from "../../../app/services/api/mocktestApi";
import Container from "../../../components/layouts/container";
import TestIcon from "../../../assets/icons/testicon";
import { DateToMomentsAgo } from "../../../utils/moments";
import { MockTest } from "../../../types/mocktest";
import { Button } from "../../../components/elements/actions/buttons";
import { useGetAllRegistrationsQuery } from "../../../app/services/api/registrationApi";
import { useGetUserQuery } from "../../../app/services/api/authApi";
import { CountDown } from "../../../components/modules/countdown";
import { endsAt } from "../../../utils/endTest";
import DateTime from "../../../components/modules/datetime";
import Duration from "../../../components/modules/duration";
import { Link } from "../../../components/elements/actions/links";
import { NotFound } from "../../404";

const TestDetail = () => {

    const { id } = useParams();
	const { data: user, isLoading: isLoadingUser } = useGetUserQuery()
    const { data: test, error, isLoading: isTestLoading } = useGetTestByIdQuery(id || "");
	const [ register, { isLoading: isRegistering }] = useRegisterForTestMutation();
	const { data: registrations, isLoading: isLoadingRegistrations } = useGetAllRegistrationsQuery({ 
		user: user? user.id.toString() : "",
		test: id || "",
	})
	const { data: testResults, isLoading: isTestResultsLoading } = useGetTestAllRegistrationsQuery(id || "");

	const navigate = useNavigate();

	async function handleRegister() {
		if(id){
			await register(Number.parseInt(id))
				.unwrap() .then(() => {
                    navigate("/");
                }).catch(error => {
                    if (error) {
                        if (error.error) console.log({ "detail": error.error.split(": ")[1] })
                        else if (error.data) console.log(error.data)
                        else console.log({ "detail": JSON.stringify(error) })
                    }
                })
		}
	}

	const TestDetailCard = ({ test }: { test?: MockTest}) => {
		return (
			<Container.Card className="test-detail-container" variant="fill-shadow" style={{ maxWidth: "600px"}}>
				<div className="test-detail-left-top">
					<section className="upcoming-test-subtitle">
						<p className="upcoming-test-author">{test && test.author ? test.author.first_name + " " + test.author.last_name : <span>Unspecified</span>}</p>
						<p className="upcoming-test-created">{test ? DateToMomentsAgo(new Date(test.created_at)) : <span>Unspecified</span>}</p>
					</section>
					<header className="upcoming-test-title">
						<TestIcon/>
						<h2>{test ? test.name : <span>Untitled Test</span>}</h2>
					</header>
					<p className="upcoming-test-description">
						{test ? test.description : <span>No Description</span>}
					</p>
				</div>
				<div className="test-detail-left-bottom">
					<div className="test-detail-left-bottom-column test-detail-start-date">
						<div className="test-detail-bottom-col-head">starting</div>
						<div className="test-detail-bottom-col-box">{test? <DateTime datetime={test.starts_at}/> : "Undefined"}</div>
					</div>
					<div className="test-detail-left-bottom-column test-detail-duration">
						<div className="test-detail-bottom-col-head">online for</div>
						<div className="test-detail-bottom-col-box">{ test? <Duration duration={test.duration} /> : "Undefined"}</div>
					</div>
				</div>
			</Container.Card>
		)
	}

	const RegisterCard = () => {
		return (
			<div className="test-detail-register">
				<div className="test-detail-register-head">starts in</div>
				<div className="test-detail-countdown">
					{!isTestLoading && <CountDown to={test ? endsAt(test.data) : undefined} />}
				</div>
				<Button onClick={handleRegister} disabled={isRegistering || isLoadingRegistrations || registrations === undefined}>
					{ isLoadingRegistrations || isLoadingUser ? "Checking Registrations...": 
						registrations ? 
							registrations.length > 0 && user ?
								"Registered":
								isRegistering ?
									"Registering...":
									"Register Now":
							"Checking Registrations"
					}
				</Button>	
			</div>
		)
	}

	const PlayCard = () => {
		return (
			<div className="test-detail-play">
				<div className="test-detail-play-head">now online</div>
				<div className="test-detail-play-subtitle">The Test is Now Online.</div>
				<Link variant="fill" to={`/play/test/${id}`}>Play Now</Link>
			</div>
		)
	}

	const ResultCard = () => {

		return (
			<div className="test-detail-results">
				<div className="test-detail-results-top">
					<div className="test-detail-results-head">Your Score</div>
					{ isLoadingRegistrations || isLoadingUser ? "Looking for Registrations." :
						registrations ? 
							registrations.length > 0 ?
								( <div className="test-detail-results-panel">
										You scored a total of {registrations[0].score}.
									</div> ):
								(<div className="test-detail-results-panel">
									Seems like you didn't take this test.
								</div>):
							"Looking for Registrations."	
					}
				</div>
				<div className="test-detail-results-bottom">
					<div className="test-detail-results-head">test results</div>
					{ !isTestResultsLoading && testResults && (
						<div className="test-detail-results-table">
							<div className="test-detail-results-row head">
								<div className="test-detail-results-col rank">Rank</div>
								<div className="test-detail-results-col user">Name</div>
								<div className="test-detail-results-col score">Score</div>
							</div>
							{ testResults.map((result, i) => (
								<div key={result.id} className="test-detail-results-row">
									<div className="test-detail-results-col rank">{i + 1}</div>
									<div className="test-detail-results-col user">{result.user.first_name} {result.user.last_name}</div>
									<div className="test-detail-results-col score">{result.score}</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		)
	}

    return (
        <div className="test-detail flat-width-wrap">
			{ !isTestLoading && test ? (
				<>
					<div className="test-detail-left">
						<div className="test-detail-left-top">
							<TestDetailCard test={test.data}/>
						</div>
					</div>
					<div className="test-detail-right">
						{ test.data.isTestAvailable && <RegisterCard/>}
						{ test.data.isTestOnline && <PlayCard/>}
						{ test.data.isTestOffline && <ResultCard/>}
					</div>
				</>
			): (
				<NotFound/>
			)}
        </div>
    )
}

export default TestDetail