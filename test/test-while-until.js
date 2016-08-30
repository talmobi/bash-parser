'use strict';
const test = require('ava');
const bashParser = require('../src');
/* eslint-disable camelcase */
test('parse while', t => {
	const result = bashParser('while true; do sleep 1; done');
	// console.log(inspect(result, {depth:null}))
	t.deepEqual(
		result, {
			type: 'complete_command',
			commands: [{
				type: 'while',
				clause: {
					type: 'compound_list',
					commands: [{
						type: 'simple_command',
						name: {type: 'word', text: 'true'}
					}]
				},
				do: {
					type: 'compound_list',
					commands: [{
						type: 'simple_command',
						name: {type: 'word', text: 'sleep'},
						suffix: [{type: 'word', text: '1'}]
					}]
				}
			}]
		}
	);
});

test('parse until', t => {
	const result = bashParser('until true; do sleep 1; done');
 //	console.log(inspect(result, {depth:null}))
	t.deepEqual(
		result, {
			type: 'complete_command',
			commands: [{
				type: 'until',
				clause: {
					type: 'compound_list',
					commands: [{
						type: 'simple_command',
						name: {type: 'word', text: 'true'}
					}]
				},
				do: {
					type: 'compound_list',
					commands: [{
						type: 'simple_command',
						name: {type: 'word', text: 'sleep'},
						suffix: [{type: 'word', text: '1'}]
					}]
				}
			}]
		}
	);
});
