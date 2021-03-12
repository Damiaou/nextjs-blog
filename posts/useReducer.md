---
title: "UseReducer pattern for people who still don't get it."
date: '2020-03-12'
---

# UseReducer pattern for people who still don't get it.

All right,

I've never wrote anything but technical documentation and this is an attempt to write a blog post about a technical subject so I hope I won't lost track of my goal :

Getting a proper **mental model** for the useReducer pattern in React Hooks, described in many tutorials and videos on React function components.

For now, this concept is like a black box to my brain, I can make it work by reproducing examples but the underlying logic stays away from me and it's frustrating and probably not efficient.

At first when I saw the state reducer pattern with useReducer I was mislead and thought : "This is a great to place to _A) update my local state_ _B) fetch or post data_ and maintain local state up to date".

```jsx
// This is a reducer for task app
const taskReducer = (tasks, { type, payload }) => {
	switch (type) {
		case 'ADD': {
			let task = useQuery('POST', 'task', {
				label: payload.label,
				repeat: payload.repeat,
				home_hash: payload.hash,
			});
			return [...tasks, task];
		}
		case 'SET': {
			let tasks = useQuery('GET', 'task');
			return tasks;
		}
		default: {
			console.info(`Action not handled : ${type}`);
		}
	}
};
```

My first try was not successful since **this is not** the right tool for the b. part. My code was becoming a mess, nothing seems to work and I stumbled upon [this response](https://stackoverflow.com/a/53146965).

My mental model was wrong from the beginning: useReducer pattern was not made for maintaining both local and update db stored data, only the first.

With this new mental model it was easy to go back, remove API calls from my reducer then update my local state with my dispatcher after querying db.

```jsx
export default function useQuery(type, endpoint, dataToSend = {}) {
	const [data, setData] = useState({});
	const [error, setError] = useState(null);
	const url = `https://myapi.com/${endpoint}`;
	axios({
		method: type,
		url: url,
		data: dataToSend,
	})
		.then((response) => {
			setData(response.data);
		})
		.catch((err) => {
			setError(err);
		});
	return { data, error };
}
```

This means I have to query my db elsewhere, wich is good for separation of concern and reuse. In my current project i've made a customhook for this job, it uses axios.

Hope this can help a React hook beginner as I am !
