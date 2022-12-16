import { useState, useEffect } from "react";
import Loading from "./Loading";
import Profile from "./Profile";

// const singleUser = `https://api.github.com/users/DhananjayRakshe`
// const repos = `https://api.github.com/users/DhananjayRakshe/repos?per_page=5`
// https://api.github.com/users/DhananjayRakshe/repos?page=1&per_page=10&sort=updated

function App() {
	const [items, setItems] = useState([]);
	// By default user is DhananjayRakshe
	const [userName, setUserName] = useState("DhananjayRakshe");
	const [repoName, setRepoName] = useState("");

	const fetchRepos = async () => {
		const res = await fetch(
			`https://api.github.com/users/${userName}/repos?page=1&per_page=9&sort=updated`
		);
		const data = await res.json();
		setItems(data);
	};

	useEffect(() => {
		fetchRepos();
	}, [userName]);

	const handleReset = () => {
		fetchRepos();
		setUserName("");
		setRepoName("");
	};

	const getGithubData = async (
		propUserName = "DhananjayRakshe",
		propRepoName = ""
	) => {
		console.log({ propUserName: propUserName });
		console.log({ propRepoName: propRepoName });

		const res = await fetch(
			`https://api.github.com/users/${propUserName}/repos?q=${propRepoName}`
		);
		const data = await res.json();
		setItems(data);
		console.log(items);
	};

	const handelUserName = async (e) => {
		e.preventDefault();
		setUserName(e.target.value);
		// Call API
		getGithubData(userName, repoName);
	};
	const handelRepoName = async (e) => {
		e.preventDefault();
		setRepoName(e.target.value);
		// Call API
		getGithubData(userName, repoName);
	};

	return (
		<>
			<div className="pt-10 flex justify-center">
				<h1 className="mb-10 font-bold text-2xl">
					Viewing {userName}'s Repositories
				</h1>
			</div>
			{/* Form for search user */}
			<div className="flex justify-center mb-5" style={{ gap: "10px" }}>
				<section
					className="flex justify-center"
					style={{
						display: "flex",
						flexDirection: "row",
						alignContent: "center",
						alignItems: "center",
						width: "80%",
						gap: "30px",
					}}
				>
					<input
						type="text"
						className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						id="UserNameField"
						placeholder="Enter Github username"
						value={userName}
						defaultValue=""
						onChange={handelUserName}
					/>
					<input
						type="text"
						className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						id="RepoNameField"
						placeholder="Search Repo by name"
						value={repoName}
						defaultValue=""
						onInput={handelRepoName}
					/>
				</section>
				<button className=" mb-2 xl:w-96 text-base mt-2  bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded">
					Search
				</button>
				<button
					onClick={handleReset}
					className=" mb-2 xl:w-96 text-base mt-2  bg-red-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
				>
					Reset
				</button>
			</div>

			{items.length === 0 ? (
				<Loading />
			) : items === [] ? (
				<Loading />
			) : userName === "" ? (
				<div className="font-bold text-3xl flex justify-center">
					<h1 className="mb-10 font-bold text-2xl">Enter User Name First...</h1>
				</div>
			) : items.length > 0 ? (
				<div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 pb-20">
					{items.map((item) => (
						<Profile key={item.id} searchString={repoName} {...item} />
					))}
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}

export default App;
