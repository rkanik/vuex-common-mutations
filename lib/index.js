const deepGet = (input, path) => {
	let i
	path = path.split('.');
	for (i = 0; i < path.length; i++)
		input = input[path[i]];
	return input
}

const deepSet = (input, path, value) => {
	let i
	path = path.split('.');
	for (i = 0; i < path.length - 1; i++)
		input = input[path[i]];
	input[path[i]] = value;
}

const mutations = {
	PUSH: (state, [path, item]) => { deepGet(state, path).push(item) },
	UNSHIFT: (state, [path, item]) => { deepGet(state, path).unshift(item) },
	RESET: (state, initialState) => mutations.SET(state, initialState),
	CONCAT: (state, [path, items]) => {
		let arr = deepGet(state, path).concat(items)
		deepSet(state, path, arr)
	},
	SET: (state, payload) => {
		Object.entries(payload).forEach(
			([key, value]) => (state[key] = value)
		)
	},
	DELETE: (state, [path, key, match = 'id']) => {
		let keys = Array.isArray(key) ? key : [key]
		deepSet(state, path, deepGet(state, path).filter(
			el => !keys.includes(el[match])
		))
	},
	UPDATE: (state, [path, data, match = 'id']) => {
		deepSet(state, path, deepGet(state, path).map(el => {
			return el[match] === data[match] ? data : el
		}))
	}
}

/**
 *
 * @param  {...'SET'|'RESET'|'PUSH'|'CONCAT'|'UNSHIFT'|'UPDATE'|'DELETE'} names
 * @returns {} Returns with mutations
 */
const createMutations = (...names) => {
	if (!names.length) return { ...mutations }
	return Object
		.keys(mutations)
		.filter(name => names.includes(name))
		.reduce((m, a) => ({ ...m, [a]: mutations[a] }), {})
}

export { createMutations }