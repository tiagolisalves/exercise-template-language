const parseDictionaryTemplateLiterals = require('./parseDictionaryTemplateLiterals')

test('returns only string and number values', () => {
  const dictionary = {
    param1: 'Hello World',
    param2: 2,
    param3: undefined,
    param4: [1],
    param5: { foo: 'bar' },
  }
  expect(parseDictionaryTemplateLiterals(dictionary, {}))
    .toEqual({
      param1: 'Hello World',
      param2: 2,
    })
})


test('parses a string from shallow data', () => {
  const dictionary = {
    welcome: 'Hello {{ user }}!',
    error: 'Something went wrong: {{ error }}',
  }

  const data = {
    user: 'Thiago',
    error: 'your session expired',
  }

  expect(parseDictionaryTemplateLiterals(dictionary, data))
    .toEqual({
      welcome: 'Hello Thiago!',
      error: 'Something went wrong: your session expired',
    })
})

test('parses strings with inconsistent spaces', () => {
  const dictionary = {
    welcome: 'Hello {{user}}!',
    error: 'Something went wrong: {{   error }}',
  }

  const data = {
    user: 'Thiago',
    error: 'your session expired',
  }

  expect(parseDictionaryTemplateLiterals(dictionary, data))
    .toEqual({
      welcome: 'Hello Thiago!',
      error: 'Something went wrong: your session expired',
    })
})


test('parses multiple strings from shallow data', () => {
  const dictionary = {
    welcome: 'Hello {{ firstName }} {{ lastName }}!',
  }

  const data = {
    firstName: 'Thiago',
    lastName: 'Murakami',
  }

  expect(parseDictionaryTemplateLiterals(dictionary, data))
    .toEqual({
      welcome: 'Hello Thiago Murakami!',
    })
})

test('parses a string from deep data', () => {
  const dictionary = {
    welcome: 'Hello {{ user.firstName }} {{ user.lastName }}!',
  }

  const data = {
    user: {
      firstName: 'Thiago',
      lastName: 'Murakami',
    },
  }

  expect(parseDictionaryTemplateLiterals(dictionary, data))
    .toEqual({
      welcome: 'Hello Thiago Murakami!',
    })
})

test('parses an array from deep data', () => {
  const dictionary = {
    welcome: 'Read now: {{ user.posts[0].title }}!',
    interest: 'Something that might interest you: {{ cart.items[0].tags[0] }}',
  }

  const data = {
    user: {
      posts: [
        { title: 'Desining an API with GraphQL' }
      ]
    },
    cart: {
      items: [
        {
          name: 'Air Fryer',
          tags: [ 'sale' ],
        }
      ]
    }
  }

  expect(parseDictionaryTemplateLiterals(dictionary, data))
    .toEqual({
      welcome: 'Read now: Desining an API with GraphQL!',
      interest: 'Something that might interest you: sale',
    })
})

test('returns empty if non existing', () => {
  const dictionary = {
    welcome: 'Hello {{ user.firstName }} {{ user.lastName }}',
  }

  const data = {
    user: {
      firstName: 'Thiago',
    },
  }

  expect(parseDictionaryTemplateLiterals(dictionary, data))
    .toEqual({
      welcome: 'Hello Thiago ',
    })
})
