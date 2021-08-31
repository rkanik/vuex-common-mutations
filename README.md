# vuex-common-mutations
It's a vuex mutations generator which we use commonly to make changes in state like set a state value, push, update, delete a item in an array, reset the whole state. Using this package you don't have to write any mutations to make changes in state it has all the neccessary mutations to update state.

## Install

```
$ npm install vuex-common-mutations
```
or with yarn
```
$ yarn vuex-common-mutations
```

## Usage

```js
import { createMutations } from 'vuex-common-mutations'

const initialState = () => ({
  loading: false,
  counter: 0,
  user: {
    name: null
  }
})

const mutations = {
  ...createMutations('SET')
  // your other mutations
}
```
```js
  commit('SET', { loading: true })
```
```js
  commit('SET', { counter: c => c + 1 })
```
```js
  commit('SET', { 'user.name': 'John Doe' })
```
or in single object
```js
  commit('SET', { 
    loading: true,
    counter: c => c + 1,
    'user.name': 'John Doe'
  })
```

## Mutations Types
Here is the list of available mutation types

`SET`       - Set or change something to the state.
`RESET`     - Reset the current state to initial state.
`PUSH`      - Push items in an array.
`UNSHIFT`   - Unshift items in an array.
`UPDATE`    - Replace an array item with specified item.
`DELETE`    - Delete an array item with specified id or any identifier.

