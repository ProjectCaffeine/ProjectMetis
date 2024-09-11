import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
	setupFiles: ["./mocks__/chrome.ts"],
	testMatch: [ "**/tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
	testEnvironment: "jsdom",
	transform: {}
	//transform: {
	//	"^.+.ts$": ["ts-jest", {}],
	//},
}

export default config
//module.exports = {
//	setupFiles: ['./tests/service-worker.tests.js']
//}
