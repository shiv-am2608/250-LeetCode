import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";

export default function About({ resetData, exportData, importData }) {
	const inputFile = useRef(null)
	let history = useHistory();
	const [importSpinnerState, setImportSpinnerState] = useState(false)
	const [exportSpinnerState, setExportSpinnerState] = useState(false)
	// About component takes resetData() from App <Component> to trigger DB data reset
	function handleChange(e) {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = e => {
			const JSONData = JSON.parse(e.target.result)
			importData(JSONData, () => {
				setImportSpinnerState(false)
				history.push('/')
			})
		};
	}
	return (
		<>
			<div className="container-custom" >
				<Fade duration={500}>
					<div className="container my-5">
						<Alert variant="success" style={{backgroundColor: "#f2af72"}}>
							<Alert.Heading className="text-center" >About</Alert.Heading>
							<hr />
							<h4 className="text-center">
								250 DSA Cracker helps you build your confidence in solving any coding <br /> related question and helps you prepare for
								your placements{" "}
								<span role="img" aria-label="student">
									👨🏻‍🎓
								</span>
							</h4>
						</Alert>
					</div>
					<div className="container my-5">
						<h2 className="text-center">
							250DSA is your personal web-based progress tracker based on <br></br>
							<i>
								<a
									href="https://docs.google.com/spreadsheets/d/1-wKcV99KtO91dXdPkwmXGTdtyxAfk1mbPXQg81R9sFE/edit#gid=0"
									target="_blank"
									rel="noopener noreferrer"
								>
									DSA Cracker Sheet
								</a>
							</i>{" "}
							by{" "}
							<b>
								<a href="https://www.linkedin.com/in/mohammad-f-bb4886157/" target="_blank" rel="noopener noreferrer">
									Lead Coding by Fraz
								</a>
							</b>{" "}
							<span role="img" aria-label="join-hands">
								🙏🏻
							</span>
						</h2>
						<h4 className="text-center my-5">
							Original Project Link - {" "}
							<a href="https://github.com/AsishRaju/450-DSA" target="_blank" rel="noopener noreferrer">
								Github
							</a>{" "}
						</h4>
						<h4 className="text-center my-5">
							Project Modified by{" "}
							<a href="https://www.linkedin.com/in/shivam2608/" target="_blank" rel="noopener noreferrer">
								Shivam
							</a>{" "}
							<span role="img" aria-label="code-men">
								👨🏻‍💻
							</span>
						</h4>
						<h5 className="text-center">
							<Badge
								variant="danger"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									if (window.confirm("Are you sure you want to reset the progress !")) {
										setExportSpinnerState(true)
										resetData();
									}
								}}
							>
								Reset Progress
								<Spinner animation="border" variant="light" size="sm" style={exportSpinnerState ? {} : { display: 'none' }} />
							</Badge>
							{' '}
							<Badge
								variant="warning"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									setExportSpinnerState(true)
									exportData(() => {
										setExportSpinnerState(false)
									});
								}}
							>
								Export Progress
							</Badge>
							{' '}
							<Badge
								variant="primary"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									setImportSpinnerState(true)
									inputFile.current.click();
								}}
							>
								Import Progress{' '}
								<Spinner animation="border" variant="light" size="sm" style={importSpinnerState ? {} : { display: 'none' }} />
							</Badge>
						</h5>
						<h3 className="text-center my-5">
							<Badge>
								For the{" "}
								<span role="img" aria-label="orange-hearth">
									🧡
								</span>{" "}
								to code{" "}
								<span role="img" aria-label="victory">
									✌🏻
								</span>
							</Badge>{" "}
						</h3>
						<input type='file' id='file' ref={inputFile} style={{ display: 'none' }} accept=".json" onChange={handleChange} />
					</div>
				</Fade>
			</div>
		</>
	);
}
