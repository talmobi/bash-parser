'use strict';
const test = require('ava');
// const json = require('json5');
// const {diff} = require('rus-diff');
const bashParser = require('../src');
/* eslint-disable camelcase */
test('parse if elif else', t => {
	const cmd = `if true; then
	echo 1;
elif false; then
	echo 3;
else
	echo 2;
fi
`;
	const result = bashParser(cmd, {insertLOC: true});

	// console.log(json.stringify(result.and_ors[0].left[0], null, '\t').replace(/"/g, '\''));
	const expected = {
		type: 'if',
		clause: {
			type: 'term',
			and_ors: [
				{
					type: 'and_or',
					left: [
						{
							type: 'simple_command',
							name: {
								text: 'true',
								loc: {
									startLine: 0,
									startColumn: 3,
									endLine: 0,
									endColumn: 6
								}
							},
							loc: {
								startLine: 0,
								startColumn: 3,
								endLine: 0,
								endColumn: 6
							}
						}
					],
					loc: {
						startLine: 0,
						startColumn: 3,
						endLine: 0,
						endColumn: 6
					}
				}
			],
			loc: {
				startLine: 0,
				startColumn: 3,
				endLine: 0,
				endColumn: 6
			}
		},
		then: {
			type: 'term',
			and_ors: [
				{
					type: 'and_or',
					left: [
						{
							type: 'simple_command',
							name: {
								text: 'echo',
								loc: {
									startLine: 1,
									startColumn: 1,
									endLine: 1,
									endColumn: 4
								}
							},
							loc: {
								startLine: 1,
								startColumn: 1,
								endLine: 1,
								endColumn: 6
							},
							suffix: {
								type: 'cmd_suffix',
								list: [
									{
										text: '1',
										loc: {
											startLine: 1,
											startColumn: 6,
											endLine: 1,
											endColumn: 6
										}
									}
								]
							}
						}
					],
					loc: {
						startLine: 1,
						startColumn: 1,
						endLine: 1,
						endColumn: 6
					}
				}
			],
			loc: {
				startLine: 1,
				startColumn: 1,
				endLine: 1,
				endColumn: 6
			}
		},
		else: {
			type: 'if',
			clause: {
				type: 'term',
				and_ors: [
					{
						type: 'and_or',
						left: [
							{
								type: 'simple_command',
								name: {
									text: 'false',
									loc: {
										startLine: 2,
										startColumn: 5,
										endLine: 2,
										endColumn: 9
									}
								},
								loc: {
									startLine: 2,
									startColumn: 5,
									endLine: 2,
									endColumn: 9
								}
							}
						],
						loc: {
							startLine: 2,
							startColumn: 5,
							endLine: 2,
							endColumn: 9
						}
					}
				],
				loc: {
					startLine: 2,
					startColumn: 5,
					endLine: 2,
					endColumn: 9
				}
			},
			then: {
				type: 'term',
				and_ors: [
					{
						type: 'and_or',
						left: [
							{
								type: 'simple_command',
								name: {
									text: 'echo',
									loc: {
										startLine: 3,
										startColumn: 1,
										endLine: 3,
										endColumn: 4
									}
								},
								loc: {
									startLine: 3,
									startColumn: 1,
									endLine: 3,
									endColumn: 6
								},
								suffix: {
									type: 'cmd_suffix',
									list: [
										{
											text: '3',
											loc: {
												startLine: 3,
												startColumn: 6,
												endLine: 3,
												endColumn: 6
											}
										}
									]
								}
							}
						],
						loc: {
							startLine: 3,
							startColumn: 1,
							endLine: 3,
							endColumn: 6
						}
					}
				],
				loc: {
					startLine: 3,
					startColumn: 1,
					endLine: 3,
					endColumn: 6
				}
			},
			else: {
				type: 'term',
				and_ors: [
					{
						type: 'and_or',
						left: [
							{
								type: 'simple_command',
								name: {
									text: 'echo',
									loc: {
										startLine: 5,
										startColumn: 1,
										endLine: 5,
										endColumn: 4
									}
								},
								loc: {
									startLine: 5,
									startColumn: 1,
									endLine: 5,
									endColumn: 6
								},
								suffix: {
									type: 'cmd_suffix',
									list: [
										{
											text: '2',
											loc: {
												startLine: 5,
												startColumn: 6,
												endLine: 5,
												endColumn: 6
											}
										}
									]
								}
							}
						],
						loc: {
							startLine: 5,
							startColumn: 1,
							endLine: 5,
							endColumn: 6
						}
					}
				],
				loc: {
					startLine: 4,
					startColumn: 0,
					endLine: 5,
					endColumn: 6
				}
			},
			loc: {
				startLine: 2,
				startColumn: 0,
				endLine: 5,
				endColumn: 6
			}
		},
		loc: {
			startLine: 0,
			startColumn: 0,
			endLine: 6,
			endColumn: 1
		}
	};
	// console.log(diff(result.and_ors[0].left[0], expected));

	t.deepEqual(result.and_ors[0].left[0], expected);
});