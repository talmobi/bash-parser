'use strict';
const test = require('ava');
const bashParser = require('../src');
/* eslint-disable camelcase */
test('parse function declaration multiple lines', t => {
	const result = bashParser('foo () \n{\n command bar --lol;\n}');

	t.deepEqual(
		result, {
			type: 'list',
			and_ors: [{
				type: 'and_or',
				left: [{
					type: 'function',
					name: {text: 'foo'},
					body: {
						type: 'term',
						and_ors: [{
							type: 'and_or',
							left: [{
								type: 'simple_command',
								name: {text: 'command'},
								suffix: {type: 'cmd_suffix', list: [{text: 'bar'}, {text: '--lol'}]}
							}]
						}]
					}
				}]
			}]
		}
	);
});

test('parse function declaration', t => {
	const result = bashParser('foo	(){ command bar --lol;}');

	t.deepEqual(
		result, {
			type: 'list',
			and_ors: [{
				type: 'and_or',
				left: [{
					type: 'function',
					name: {text: 'foo'},
					body: {
						type: 'term',
						and_ors: [{
							type: 'and_or',
							left: [{
								type: 'simple_command',
								name: {text: 'command'},
								suffix: {type: 'cmd_suffix', list: [{text: 'bar'}, {text: '--lol'}]}
							}]
						}]
					}
				}]
			}]
		}
	);
});
