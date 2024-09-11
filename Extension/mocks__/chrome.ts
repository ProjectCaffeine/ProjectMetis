//@ts-nocheck

global.chrome = {
	runtime: {
		onInstalled: {
			addListener: jest.fn(),
		},
		onMessage: {
			addListener: jest.fn(),
		},
		onStartup: {
			addListener: jest.fn(),
		},
		sendMessage: jest.fn(),
		onActivated: {
			addListener: jest.fn(),
		},
	},
	storage: {
		sync: {
			get: jest.fn(),
			set: jest.fn(),
		}
	},
	tabs: {
		onActivated: {
			addListener: jest.fn()
		},
		onUpdated: {
			addListener: jest.fn()
		}
	}
}
