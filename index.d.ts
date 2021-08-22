type Mutations = {
	SET(state: object, payload: any): void,
	PUSH(state: object, [path, item]: [string, any]): void,
	RESET(state: object, payload: any): void,
	UNSHIFT(state: object, [path, item]: [string, any]): void,
	CONCAT(state: object, [path, items]: [string, any[]]): void,
	UPDATE(state: object, [path, data, match]: [string, any, string]): void,
	DELETE(state: object, [path, key, match]: [string, any, string]): void,
}

export type mutationType = {
	SET: string,
	PUSH: string,
	RESET: string,
	UNSHIFT: string,
	CONCAT: string,
	UPDATE: string,
	DELETE: string,
	MERGE: string,
}

/**
Create mutations object with common mutations like setState, resetState, pushToArray

@example
```
const state = { loading: false, user: { name: null } }
const mutations = createMutations('SET')
const actions = {
- - -fetchUser({commit}){
- - - - -commit('SET', { loading: true })
- - - - -// API call here
- - - - -commit('SET', { 'user.name': 'John doe', loading: false })
- - -}
}

```
*/
export function createMutations(...types: ['SET' | 'PUSH' | 'UPDATE' | 'UNSHIFT' | 'DELETE' | 'CONCAT' | 'MERGE' | 'RESET'][]): Partial<Mutations>;