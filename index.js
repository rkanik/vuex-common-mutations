const { get, put } = require('dotty')
const { isPlainObject: isObject } = require('is-plain-object');

export const mutationType = {
	SET: "SET",
	PUSH: "PUSH",
	RESET: "RESET",
	UNSHIFT: "UNSHIFT",
	CONCAT: "CONCAT",
	UPDATE: "UPDATE",
	DELETE: "DELETE",
	MERGE: "MERGE"
}

function SET(state, payload) {
	if (!isObject(payload)) {
		throw Error('Payload have to be an object')
	}
	Object
		.entries(payload)
		.forEach(([path, value]) => {
			put(state, path, value)
		})
}

function RESET(state, initialState) {
	SET(state, initialState)
}

function PUSH(state, payload) {
	if (Array.isArray(payload)) {
		let [path, ...items] = payload
		let target = get(state, path)

		if (!target || !Array.isArray(target)) {
			throw Error('Specified state path not found or property is not an array')
		}

		target.push(...items)
	}
	else if (isObject(payload)) {
		Object.entries(payload).forEach(([path, item]) => {
			let target = get(state, path)

			if (!target || !Array.isArray(target)) {
				throw Error('Specified state path not found or property is not an array')
			}

			let items = Array.isArray(item) ? item : [item]
			target.push(...items)
		})
	}
	else throw Error('Invalid payload type.')
}

function UNSHIFT(state, [path, item]) {
	let target = get(state, path)

	if (!target || !Array.isArray(target)) {
		throw Error('Specified state path not found or property is not an array')
	}

	target.unshift(item)
}

function CONCAT(state, [path, items]) {
	let target = get(state, path)

	if (!target || !Array.isArray(target)) {
		throw Error('Specified state path not found or property is not an array')
	}

	put(state, path, target.concat(items))
}

function DELETE(state, [path, key, match = 'id']) {
	let target = get(state, path)

	if (!target || !Array.isArray(target)) {
		throw Error('Specified state path not found or property is not an array')
	}

	let keys = Array.isArray(key) ? key : [key]
	put(state, path, get(state, path).filter(
		el => !keys.includes(el[match])
	))
}

function UPDATE(state, [path, data, match = 'id']) {
	let target = get(state, path)

	if (!target || !Array.isArray(target)) {
		throw Error('Specified state path not found or property is not an array')
	}

	put(state, path, get(state, path).map(el => {
		return get(el, match) === get(data, match) ? data : el
	}))
}

const mutations = { SET, PUSH, RESET, UNSHIFT, CONCAT, DELETE, UPDATE }

export const createMutations = (...types) => {
	if (!types.length) return { ...mutations }
	return Object
		.keys(mutations)
		.filter(name => types.includes(name))
		.reduce((m, a) => ({ ...m, [a]: mutations[a] }), { })
};

export const createGetters = (...getters) => {
	return getters.reduce((getters, name) => {
		if (typeof name === 'string') {
			getters[`$${name}`] = state => state[name]
		}
		if (isObject(name)) Object.entries(name).forEach(([key, path]) => {
			getters[`$${key}`] = state => get(state, path)
		})
		return getters
	}, { })
}

export const handleAction = async (apiRequestPromise, successCallback, errorCallback) => {
	let [error, response] = await apiRequestPromise
	if (!error && typeof successCallback === 'function') successCallback(response)
	if (error && typeof errorCallback === 'function') errorCallback(error)
	return [error, response]
}
